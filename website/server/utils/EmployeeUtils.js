const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

////////////////////////////////////////////////////////////////////////////
// Validate
////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////
// Validate Date
////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////
// Create User Password
////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////
// Parse HR
////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////
// Currency
////////////////////////////////////////////////////////////////////////////
function isCurrency(value) {
  let val = value.slice(1);
  var floatRegex = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;
  if (!floatRegex.test(val)) return false;

  val = parseFloat(val);
  if (isNaN(val)) return false;
  return true;
}

module.exports = { validate, validDate, createUserPass, HrParse, isCurrency };
