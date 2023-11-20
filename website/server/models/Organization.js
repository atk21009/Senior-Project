const mongoose = require("mongoose");
const { Schema } = mongoose;

const organizationSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  teir: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  admin: [
    {
      type: String,
      required: true,
    },
  ],
  hr: [
    {
      type: String,
      required: true,
    },
  ],
  payPeriod: {
    type: Date,
    required: true,
  },
});

const Org = mongoose.model("organization", organizationSchema);
module.exports = Org;
