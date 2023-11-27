const mongoose = require("mongoose");
const { Schema } = mongoose;

const time = () => {
  const d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const visitorSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  business: {
    type: String,
    required: true,
  },
  arrived: {
    type: String,
    default: time,
  },
});

const Visitor = mongoose.model("visitors", visitorSchema);
module.exports = Visitor;
