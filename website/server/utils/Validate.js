// Library Imports
const bcrypt = require("bcrypt");

// Regular Expressions
const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const pass_regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const pnum_regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

////////////////////////////////////////////////////////////////////////////
// Password Hashing
//
// Inputs
//    password, callback function
////////////////////////////////////////////////////////////////////////////
function hashPassword(password, callback) {
  // Gen Salt
  bcrypt.genSalt(10, (err, salt) => {
    // If error generating salt
    if (err) {
      return callback(err, null);
    }

    // Hash password
    bcrypt.hash(password, salt, (err, hash) => {
      // If error hashing password
      if (err) {
        return callback(err, null);
      }

      callback(null, hash);
    });
  });
}

////////////////////////////////////////////////////////////////////////////
// Validate Register Inputs
//
// Inputs
//    Values - {fname, lname, email, pnum, password, confirmPass}
////////////////////////////////////////////////////////////////////////////
function validateRegister(values) {
  const { email, pnum, password, confirmPass } = values;

  const result = [];

  // Case invalid email
  if (!email_regex.exec(email)) {
    result.push(["email", "Invalid email"]);
  }

  // Case invalid phone number
  if (!pnum_regex.exec(pnum) && !pnum === "") {
    result.push(["pNum", "Invalid phone number"]);
  }

  // Case invalid password
  if (!pass_regex.exec(password)) {
    result.push([
      "password",
      "Password must contain 1 capital letter, 1 number, and 1 special character",
    ]);
  }

  // Case confirm pass matches pass
  if (!(password === confirmPass)) {
    result.push(["confirmPassword", "Passwords do not match"]);
  }

  // If errors
  if (result.length > 0) {
    return [false, result];
  }
  // If no errors
  return [true];
}

////////////////////////////////////////////////////////////////////////////
// Validate Login Inputs
//
// Inputs
//    Values - {email, password}
////////////////////////////////////////////////////////////////////////////
function validateLogin(values) {
  const { email } = values;

  const result = [];

  // Invalid Email Format
  if (!email_regex.exec(email)) {
    result.push(["email", "Invalid Email"]);
  }

  // If errors return false and errors
  if (result.length > 0) {
    return [false, result];
  }

  // If no errors return true
  return [true];
}

module.exports = { hashPassword, validateRegister, validateLogin };
