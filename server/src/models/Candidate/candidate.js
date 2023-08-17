const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const candidateSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    marital_status: {
      type: Number
    },
    sub: {
      type: String
    },
    career_level: {
      type: String
    },
    industry: {
      type: String
    },
    // course: {
    //   type: String
    // },
    education: {
      type: Object
    },
    pincode: {
      type: String
    },
    token: {
      type: String
    },
    address: {
      type: String
    },
    birth_date: {
      type: String
    },

    profile_title: {
      type: String,
      
    },
    profile_in_brief: {
      type: String,
     
    },
    current_organization: {
      type: String,
      
    },
    current_ctc: {
      type: Number,
     
    },
    total_experience: {
      type: Number,
      
    },
    gender: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },
    phone: {
      type: Number,
     
    },
    state: {
      type: String,
     
    },
    city: {
      type: String,
    },
    notice_period : {
      type: String
    },
    skills:{
      type: String
    },
    deleted: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    },
    resumeurl:{
      type:String,
    },
    logourl:{
      tye:String
    }
  },
  { timestamps: true }
);


// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password= bcrypt.hashSync(password, 10)
// });


module.exports = mongoose.model('Candidate', candidateSchema);