const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const formSchema = new mongoose.Schema(
  {
    category: {
      type: Array
    },
    educationLevel: {
      type: Array,
    },
    educationOptions: {
      type: Array,
    },
    notice_period: {
      type: Array
    },
      expiry_date:{
        type: Array
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('dropdown', formSchema);