const Organization = require("../models/Organization");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const Papa = require("papaparse");
const fileUpload = require("express-fileupload");

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
        hourlyRate: emp[10],
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
  // view employees
  app.get("/api/view-employees", async (req, res) => {
    const { token } = req.query;

    if (!token) {
      res.status(203);
      res.send("All fields are required");
    } else {
      const employees = await Employee.find(
        { company: token },
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
  // delete employee
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
  if (ssn || ssn !== "") {
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
