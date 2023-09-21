const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const formSchema = new mongoose.Schema(
  {
    suggestion: {
      type: Array
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('suggestion', formSchema);