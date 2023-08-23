const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    sub: {
      type: String
    },
    industry: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    // hash_password: {
    //   type: String,
    // },
    authorized_person: {
      type: String,
      trim: true
    },
    authorized_mobile: {
      type: String,
      trim: true,
    },
    state: {
      type: String,

    },
    city: {
      type: String,

    },
    pincode: {
      type: String,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: "Pending"
    },
    reason:{
      type : String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employer', employerSchema);