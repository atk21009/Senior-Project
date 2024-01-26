const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateString } = require("../utils/DateString");

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
    type: Array,
    default: [
      {
        date: DateString,
        monday: { hours: "0hr 0min", pay: "$0" },
        tuesday: { hours: "0hr 0min", pay: "$0" },
        wednesday: { hours: "0hr 0min", pay: "$0" },
        thursday: { hours: "0hr 0min", pay: "$0" },
        friday: { hours: "0hr 0min", pay: "$0" },
        saturday: { hours: "0hr 0min", pay: "$0" },
        sunday: { hours: "0hr 0min", pay: "$0" },
      },
    ],
  },
  hoursPayPeriod: {
    type: String,
    default: "0hr 0min",
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
