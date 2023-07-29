const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: 3,
      max: 20,
      required : true
    },
    sub:{
      type: String
    },
      industry:{
       type: String,
       trim: true
      },
      address:{
        type: String
      },
       website:{
        type: String,
       },
       email: {
        type: String,
        trim: true,
        lowercase: true
      },
      
      hash_password: {
        type: String,
      },
      authorized_person:{
        type: String
      },
    authorized_mobile: {
      type: String,
    },
   state: {
      type: Object,
      
    },
    city: {
      type: Object,

    },
    deleted: {
      type: Boolean,
      default: false
    }
      },
  { timestamps: true }
);

 module.exports= mongoose.model('Employer', employerSchema);