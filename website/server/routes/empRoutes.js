const Organization = require("../models/Organization");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const Papa = require("papaparse");
const fileUpload = require("express-fileupload");
const cron = require("cron");
const { NextDateString } = require("../services/DateString");

module.exports = (app) => {
  app.use(fileUpload());

  // create employee
  app.post("/api/create-emp", async (req, res) => {
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

    if (!firstname || !lastname || !email || !empNum) {
      res.status(400);
      res.send("All mandatory fields are required");
    } else {
      const empExist = await Employee.findOne({
        company: OrgToken,
        employeeNumber: empNum,
      });
      if (empExist) {
        res.status(400);
        res.send("Employee already exists");
      } else {
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

          if (employee) {
            employee.save();
            res.status(200);
            res.send("Employee Created");
          } else {
            res.send(400);
            res.send("Error in employee creation");
          }
        }
      }
    }
  });
  // create employees
  app.post("/api/create-employees", async (req, res) => {
    const { OrgToken } = req.body;
    const data = req.files.file;
    const file = data.data.toString("utf8");
    const parsed = Papa.parse(file, { skipEmptyLines: true }).data.slice(1);

    let errors = [];
    const employees = parsed.map(async (emp) => {
      let hourlyRate = null;
      if (emp[10] === "" || !emp[10]) {
        hourlyRate = "$0";
      } else {
        hourlyRate = emp[10];
      }

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
      const [hashedSSN, hashedPassword] = await createUserPass(emp[6]);
      empValues.password = hashedPassword;
      empValues.ssn = hashedSSN;
      return empValues;
    });

    await Promise.all(employees).then(async (res) => {
      const errEmpNum = errors.map((e) => {
        return e.employeeNumber;
      });
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
    if (errors.length > 0) {
      res.status(206);
      res.send(errors);
    } else {
      res.status(201);
      res.send("All Employees inserted");
    }
  });
  // view employee
  app.get("/api/view-employee", async (req, res) => {
    const { OrgToken, employeeNumber } = req.query;

    if (!OrgToken || !employeeNumber) {
      res.status(400);
      res.send("Employee Number and Organization required");
    } else {
      const emp = await Employee.findOne(
        { company: OrgToken, employeeNumber },
        { ssn: 0 }
      );

      if (emp) {
        res.status(200);
        res.send(emp);
      } else {
        res.status(404);
        res.send("No Employee Found");
      }
    }
  });
  // view employees
  app.get("/api/view-employees", async (req, res) => {
    const { OrgToken } = req.query;

    if (!OrgToken) {
      res.status(203);
      res.send("All fields are required");
    } else {
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
      if (employees) {
        res.status(200);
        res.send(employees);
      } else {
        res.status(204);
        res.send("No Employees Found");
      }
    }
  });
  // update employee
  app.post("/api/update-employee", async (req, res) => {
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
    if (!employeeNumber || !OrgToken) {
      res.status(406);
      res.send("All values are required");
    } else {
      const validateDate = validDate(birthDate);
      const currency = isCurrency(hourlyRate);

      if (validateDate && currency) {
        const emp = await Employee.findOneAndUpdate(
          { employeeNumber },
          { email, phonenumber, hourlyRate, position, address, birthDate }
        );

        res.status(200);
        res.send("Employee Updated");
      } else {
        res.status(406);
        res.send("Incorrect format of currency or birthdate");
      }
    }
  });
  // delete employee
  app.post("/api/delete-employee", async (req, res) => {
    const { employeeNumber, company } = req.body;
    if (!employeeNumber || !company) {
      res.status(400);
      res.send("Employee number and organization required");
    } else {
      const emp = await Employee.findOne(
        { employeeNumber, company },
        { _id: 1 }
      );
      if (emp) {
        await Employee.findByIdAndDelete(emp._id);
        res.status(200);
        res.send("Employee deleted");
      } else {
        res.status(404);
        res.send("Employee not found");
      }
    }
  });
  // Clock In Out
  app.post("/api/clock-in-out", async (req, res) => {
    const { OrgToken, employeeNumber, password } = req.body;

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
    if (Emp) {
      if (Emp.clockStatus === "false") {
        const clockStatus = Date.now();
        await Employee.updateOne(
          { company: OrgToken, employeeNumber },
          { $set: { clockStatus } }
        );
        res.status(200);
        res.send("Employee Clocked In");
      } else {
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
          const hrs = value.hours;
          const val = hrs.split(" ");
          const strHr = val[0].replace("hr", "");
          const strMin = val[1].replace("min", "");
          const valHr = parseInt(strHr);
          const valMin = parseInt(strMin);

          totalHoursWorked[0] += valHr;
          totalHoursWorked[1] += valMin;
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
      }
    } else {
      res.status(404);
      res.send("Employee Not Found");
    }
  });
};

async function validate(OrgToken, empValues) {
  const validNums = /\d{3}-\d{2}-\d{4}/;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let errors = [];

  const flag =
    !empValues.firstname ||
    !empValues.lastname ||
    !empValues.email ||
    !empValues.employeeNumber ||
    empValues.firstname === "" ||
    empValues.lastname === "" ||
    empValues.email === "" ||
    empValues.employeeNumber === "";

  if (flag) {
    return ["First name, last name, email, and employee number are required"];
  } else {
    const empNum_exists = await Employee.findOne({
      company: OrgToken,
      employeeNumber: empValues.employeeNumber,
    });
    const email_exists = await Employee.findOne({
      company: OrgToken,
      email: empValues.email,
    });

    errors = Promise.all([empNum_exists, email_exists])
      .then(() => {
        e = [];
        if (empNum_exists || email_exists) {
          e.push("Employee already exists");
        }
        if (empValues.ssn && empValues.ssn !== "") {
          if (!validNums.test(empValues.ssn)) {
            e.push("Invalid SSN");
          }
        }

        if (!re.test(empValues.email)) {
          e.push("Invalid Email");
        }

        if (empValues.phonenumber) {
          if (!empValues.phonenumber.length === 10) {
            e.push("Invalid Phone Number");
          }
        }
        if (empValues.birthDate && empValues.birthDate !== "") {
          const valDate = validDate(empValues.birthDate);
          if (valDate[0] === false) {
            e.push("Invalid birth date: " + valDate[1]);
          }
        }
        if (empValues.hireDate && empValues.hireDate !== "") {
          const valDate = validDate(empValues.hireDate);
          if (valDate[0] === false) {
            e.push("Invalid hire date: " + valDate[1]);
          }
        }
      })
      .then(() => {
        return e;
      });

    return errors;
  }
}
function validDate(date) {
  // Regex
  const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dateFormat.test(date)) {
    return [false, "Invalid Date Format"];
  }
  // Date Parts
  const dateParts = date.split("/");
  const day = parseInt(dateParts[1]);
  const month = parseInt(dateParts[0]);
  const year = parseInt(dateParts[2]);
  // Year
  const currentDate = new Date();
  const maxYear = currentDate.getFullYear;
  if (year < 1000 || year > maxYear) {
    return [false, "Invalid Year"];
  }
  // Month
  if (month < 1 || month > 12) {
    return [false, "Invalid Month"];
  }
  // Day
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // If leap year
  const leap = year % 400 == 0 || (year % 100 != 0 && year % 4 == 0);
  if (leap) {
    monthLength[1] = 29;
  }
  if (day < 0 || day > monthLength[month - 1]) {
    return [false, "Invalid Day"];
  }
  return true;
}
async function createUserPass(ssn) {
  if (ssn && ssn !== "") {
    const hashedSSN = await bcrypt.hash(ssn, 10);
    const pw = ssn.split("-")[2];
    const hashedPassword = await bcrypt.hash(pw, 10);
    return [hashedSSN, hashedPassword];
  } else {
    const hashedSSN = "null";
    const pw = Math.floor(10000 + Math.random() * 90000);
    const hashedPassword = await bcrypt.hash(pw.toString(), 10);
    return [hashedSSN, hashedPassword];
  }
}
function HrParse(currWeekDay, Emp) {
  const prevHours = currWeekDay.split(" ");

  const strHr = prevHours[0].replace("hr", "");
  const strMin = prevHours[1].replace("min", "");

  const currTime = Date.now() - Emp.clockStatus;

  const prevHr = parseInt(strHr);
  const prevMin = parseInt(strMin);

  let diffHr = Math.floor(currTime / (60 * 60 * 1000)) + prevHr;
  let diffMin = Math.round(currTime / (60 * 1000)) + prevMin;

  if (diffMin >= 60) {
    diffMin -= 60;
    diffHr += 1;
  }

  return [diffHr, diffMin];
}

const resetHrWorked = new cron.CronJob(
  "0 0 * * Sun",
  async function () {
    const dt = cron.sendAt("0 0 * * Sun");
    console.log(`The Job will run at: ${dt.toFormat("LLL/dd/yyyy - HH:mm")}`);

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
function isCurrency(value) {
  let val = value.slice(1);
  var floatRegex = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;
  if (!floatRegex.test(val)) return false;

  val = parseFloat(val);
  if (isNaN(val)) return false;
  return true;
}
