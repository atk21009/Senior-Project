const mongoose = require("mongoose");
const { Schema } = mongoose;

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
});

const Visitor = mongoose.model("visitors", visitorSchema);
module.exports = Visitor;
