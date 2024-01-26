// Module Imports
const Papa = require("papaparse");
const fileUpload = require("express-fileupload");
const cron = require("cron");

// Component Imports
const { NextDateString } = require("../utils/DateString");
const {
  validDate,
  validate,
  createUserPass,
  HrParse,
  isCurrency,
} = require("../utils/EmployeeUtils");
const Employee = require("../models/Employee");

module.exports = (app) => {
  app.use(fileUpload());

  ////////////////////////////////////////////////////////////////////////////
  // create employee
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/create-emp", async (req, res) => {
    // Data
    const { OrgToken } = req.body;
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      address,
      birthDate,
      ssn,
      empNum,
      office,
      position,
      hourlyRate,
      hireDate,
    } = req.body.data;

    // Validate required data
    if (!firstname || !lastname || !email || !empNum) {
      res.status(400);
      res.send("All mandatory fields are required");
      return;
    }

    // Ensure employee doesn't exist
    const empExist = await Employee.findOne({
      company: OrgToken,
      employeeNumber: empNum,
    });
    if (empExist) {
      res.status(400);
      res.send("Employee already exists");
      return;
    }

    // Construct data
    const empValues = {
      firstname: firstname || "null",
      lastname: lastname || "null",
      email: email || "null",
      phonenumber: phonenumber || "null",
      address: address || "null",
      birthDate: birthDate || "null",
      ssn: ssn || "null",
      employeeNumber: empNum || "null",
      office: office || "null",
      position: position || "null",
      hourlyRate: hourlyRate || "null",
      hireDate: hireDate || "null",
    };

    // Validate
    const errors = await validate(OrgToken, empValues);
    if (errors.length > 0) {
      const [hashedSSN, hashedPassword] = await createUserPass(ssn);

      const employee = new Employee({
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        birthDate,
        ssn: hashedSSN,
        employeeNumber: empNum,
        password: hashedPassword,
        company: OrgToken,
        office,
        position,
        hourlyRate,
        hireDate,
      });

      // If error creating employee
      if (!employee) {
        res.send(400);
        res.send("Error in employee creation");
        return;
      }

      // No errors
      employee.save();
      res.status(200);
      res.send("Employee Created");
    }
  });

  ////////////////////////////////////////////////////////////////////////////
  // create employees
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/create-employees", async (req, res) => {
    // Parameters
    const { OrgToken } = req.body;
    const data = req.files.file;
    const file = data.data.toString("utf8");
    const parsed = Papa.parse(file, { skipEmptyLines: true }).data.slice(1);

    // Loop through employee data
    let errors = [];
    const employees = parsed.map(async (emp) => {
      // Init hourly rate
      let hourlyRate = null;
      if (emp[10] === "" || !emp[10]) {
        hourlyRate = "$0";
      } else {
        hourlyRate = emp[10];
      }

      // Employee Values
      const empValues = {
        firstname: emp[0],
        lastname: emp[1],
        email: emp[2],
        phonenumber: emp[3],
        address: emp[4],
        birthDate: emp[5],
        ssn: null,
        employeeNumber: emp[7],
        password: null,
        company: OrgToken,
        office: emp[8],
        position: emp[9],
        hourlyRate,
        hireDate: emp[11],
      };

      // Validate correct data
      await validate(OrgToken, empValues).then((res) => {
        if (res.length > 0) {
          errors.push({
            firstname: empValues.firstname,
            lastname: empValues.lastname,
            employeeNumber: empValues.employeeNumber,
            error: res,
          });
          return res;
        }
      });

      // Create hashed password
      const [hashedSSN, hashedPassword] = await createUserPass(emp[6]);
      empValues.password = hashedPassword;
      empValues.ssn = hashedSSN;

      // Return values
      return empValues;
    });

    // Create employees
    await Promise.all(employees).then(async (res) => {
      // Error handling
      const errEmpNum = errors.map((e) => {
        return e.employeeNumber;
      });

      // Filter out all employees with errors
      const filterEmp = res
        .map((e) => {
          const empNum = e.employeeNumber;
          if (!errEmpNum.includes(empNum)) {
            return e;
          }
        })
        .filter((item) => item);
      await Employee.insertMany(filterEmp);
    });

    // If errors
    if (errors.length > 0) {
      res.status(206);
      res.send(errors);
      return;
    }

    // No errors
    res.status(201);
    res.send("All Employees inserted");
  });

  ////////////////////////////////////////////////////////////////////////////
  // view employee
  ////////////////////////////////////////////////////////////////////////////
  app.get("/api/view-employee", async (req, res) => {
    const { OrgToken, employeeNumber } = req.query;

    // Validate Parameters
    if (!OrgToken || !employeeNumber) {
      res.status(400);
      res.send("Employee Number and Organization required");
      return;
    }

    // Get employee data
    const emp = await Employee.findOne(
      { company: OrgToken, employeeNumber },
      { ssn: 0 }
    );

    // If no employee found
    if (!emp) {
      res.status(404);
      res.send("No Employee Found");
      return;
    }

    // Employee Found
    res.status(200);
    res.send(emp);
  });

  ////////////////////////////////////////////////////////////////////////////
  // view employees
  ////////////////////////////////////////////////////////////////////////////
  app.get("/api/view-employees", async (req, res) => {
    const { OrgToken } = req.query;

    // Check organization token
    if (!OrgToken) {
      res.status(203);
      res.send("All fields are required");
      return;
    }

    // Find employees of organization
    const employees = await Employee.find(
      { company: OrgToken },
      {
        _id: 0,
        ssn: 0,
        company: 0,
        address: 0,
        hourlyRate: 0,
        birthDate: 0,
        password: 0,
      }
    );

    // If employees found
    if (employees) {
      res.status(200);
      res.send(employees);
      return;
    }

    // No employees found
    res.status(204);
    res.send("No Employees Found");
  });

  ////////////////////////////////////////////////////////////////////////////
  // update employee
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/update-employee", async (req, res) => {
    // Parameters
    const {
      email,
      phonenumber,
      hourlyRate,
      position,
      address,
      birthDate,
      employeeNumber,
      OrgToken,
    } = req.body;

    // Validate required data
    if (!employeeNumber || !OrgToken) {
      res.status(406);
      res.send("All values are required");
      return;
    }

    // Validate Data
    const validateDate = validDate(birthDate);
    const currency = isCurrency(hourlyRate);

    // Validate date and currency is not null
    if (validateDate && currency) {
      const emp = await Employee.findOneAndUpdate(
        { employeeNumber },
        { email, phonenumber, hourlyRate, position, address, birthDate }
      );

      res.status(200);
      res.send("Employee Updated");
      return;
    }

    // Invalid format
    res.status(406);
    res.send("Incorrect format of currency or birthdate");
  });

  ////////////////////////////////////////////////////////////////////////////
  // delete employee
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/delete-employee", async (req, res) => {
    const { employeeNumber, company } = req.body;

    // Validate employee num and company is not null
    if (!employeeNumber || !company) {
      res.status(400);
      res.send("Employee number and organization required");
      return;
    }

    // Find employee
    const emp = await Employee.findOne({ employeeNumber, company }, { _id: 1 });

    // Validate Employee found
    if (!emp) {
      res.status(404);
      res.send("Employee not found");
      return;
    }

    // Find and delete employee
    await Employee.findByIdAndDelete(emp._id);
    res.status(200);
    res.send("Employee deleted");
  });

  ////////////////////////////////////////////////////////////////////////////
  // Clock In Out
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/clock-in-out", async (req, res) => {
    const { OrgToken, employeeNumber, password } = req.body;

    // Find Employee
    const Emp = await Employee.findOne(
      { company: OrgToken, employeeNumber },
      {
        employeeNumber: 1,
        company: 1,
        hourlyRate: 1,
        hoursWorked: 1,
        hoursPayPeriod: 1,
        clockStatus: 1,
      }
    );

    // If employee found
    if (!Emp) {
      res.status(404);
      res.send("Employee Not Found");
      return;
    }

    if (Emp.clockStatus === "false") {
      const clockStatus = Date.now();
      await Employee.updateOne(
        { company: OrgToken, employeeNumber },
        { $set: { clockStatus } }
      );
      res.status(200);
      res.send("Employee Clocked In");
      return;
    }

    // Get current day
    const weekday = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const d = new Date();
    let day = weekday[d.getDay()];

    // Get most recent pay period
    let currWeek = Emp.hoursWorked[Emp.hoursWorked.length - 1];

    // Get the current day create string
    const currWeekDay = currWeek[day].hours;

    const hoursWorkedStr = HrParse(currWeekDay, Emp);
    const dayHrWorked = `${hoursWorkedStr[0]}hr ${hoursWorkedStr[1]}min`;

    let payRate = Emp.hourlyRate.slice(1);
    payRate = parseFloat(payRate);
    const payTotal =
      payRate * hoursWorkedStr[0] + payRate * (hoursWorkedStr[1] / 60);

    const pay = `$${payTotal}`;

    // Assign day to the work hours and append to the current week
    currWeek[day] = { hours: dayHrWorked, pay };
    const hoursWorked = (Emp.hoursWorked[Emp.hoursWorked.length - 1] =
      currWeek);

    // Get the sum of all the hours
    let totalHoursWorked = [0, 0];
    for (const [key, value] of Object.entries(currWeek)) {
      if (key !== "date") {
        const hrs = value.hours;
        const val = hrs.split(" ");
        const strHr = val[0].replace("hr", "");
        const strMin = val[1].replace("min", "");
        const valHr = parseInt(strHr);
        const valMin = parseInt(strMin);

        totalHoursWorked[0] += valHr;
        totalHoursWorked[1] += valMin;
      }
    }

    // Format total hours string
    const hoursPayPeriod = `${totalHoursWorked[0]}hr ${totalHoursWorked[1]}min`;

    // Update database data
    const clockStatus = "false";
    await Employee.updateOne(
      { company: OrgToken, employeeNumber },
      { $set: { clockStatus, hoursWorked, hoursPayPeriod } }
    );
    res.status(200);
    res.send("Employee Clocked Out");
  });
};

new cron.CronJob(
  "0 0 * * Sun",
  async function () {
    const dt = cron.sendAt("0 0 * * Sun");

    await updateOrgs();
  },
  null,
  true
);

async function updateOrgs() {
  await Employee.updateMany(
    {},
    {
      $push: {
        hoursWorked: {
          date: NextDateString,
          monday: { hours: "0hr 0min", pay: "$0" },
          tuesday: { hours: "0hr 0min", pay: "$0" },
          wednesday: { hours: "0hr 0min", pay: "$0" },
          thursday: { hours: "0hr 0min", pay: "$0" },
          friday: { hours: "0hr 0min", pay: "$0" },
          saturday: { hours: "0hr 0min", pay: "$0" },
          sunday: { hours: "0hr 0min", pay: "$0" },
        },
      },
      hoursPayPeriod: "0hr 0min",
    }
  );
}
