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
  },
  phonenumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  soc: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  office: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: String,
    required: true,
  },
  hoursWorked: {
    type: String,
    required: true,
  },
  hireDate: {
    type: String,
    required: true,
  },
  clockStatus: {
    type: String,
    default: false,
  },
});

const Employee = mongoose.model("employees", employeeSchema);
module.exports = Employee;
