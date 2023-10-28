const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  birthDate: {
    type: String,
    default: "",
  },
  ssn: {
    type: String,
    default: "",
  },
  employeeNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  office: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "",
  },
  hourlyRate: {
    type: String,
    default: "$0",
  },
  hoursWorked: {
    type: String,
    default: 0,
  },
  hireDate: {
    type: String,
    default: "",
  },
  clockStatus: {
    type: String,
    default: false,
  },
});

const Employee = mongoose.model("employees", employeeSchema);
module.exports = Employee;
