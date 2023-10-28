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
          empNum: empNum || "null",
          office: office || "null",
          position: position || "null",
          hourlyRate: hourlyRate || "null",
          hireDate: hireDate || "null",
        };
        console.log(empValues);
        if (validate(empValues)) {
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
    const parsed = Papa.parse(file).data;

    let errors = [];
    parsed.forEach((emp) => {
      if (emp.length === 10) {
        const empValues = {
          firstname: emp[0],
          lastname: emp[1],
          email: emp[2],
          phonenumber: emp[3],
          address: emp[4],
          ssn: emp[5],
          office: emp[6],
          position: emp[7],
          hourlyRate: emp[8],
          birthDate: emp[9],
        };
        console.log("Employee", emp);
        console.log("OrgToken", OrgToken);
        const val = validate(empValues);
        if (val[0] === false) {
          errors.push([empValues.firstname, empValues.lastname, val[1]]);
        }
      }
    });
    console.log(errors);
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

function validate(empValues) {
  const validNums = /\d{3}-\d{2}-\d{4}/;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (empValues.ssn) {
    if (!validNums.test(empValues.ssn)) {
      return [false, "Invalid SSN"];
    }
  }
  if (empValues.email) {
    if (!re.test(empValues.email)) {
      return [false, "Invalid Email"];
    }
  }
  if (empValues.phonenumber) {
    if (!empValues.phonenumber.length === 10) {
      return [false, "Invalid Phone Number"];
    }
  }
  if (empValues.birthDate) {
    const valDate = validDate(empValues.birthDate);
    if (!valDate[0]) {
      return valDate[1];
    }
  }
  if (empValues.hireDate) {
    const valDate = validDate(empValues.hireDate);
    if (!valDate[0]) {
      return valDate[1];
    }
  }
  return true;
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
  if (month < 1 || month < 12) {
    return [false, "Invalid Month"];
  }
  // Day
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // If leap year
  const leap = year % 400 == 0 || (year % 100 != 0 && year % 4 == 0);
  if (leap) {
    monthLength[1] = 29;
  }
  if (day > 0 && day < monthLength[month - 1]) {
    return [false, "Invalid Day"];
  }
  return true;
}
async function createUserPass(ssn) {
  console.log(ssn);
  if (ssn) {
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
