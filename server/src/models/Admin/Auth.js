const mongoose = require("mongoose")


const AdminSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required:true
        },
        sub:{
            type: String,
            required:true
        },
        name:{
            type: String,
            required:true
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model('Admin', AdminSchema)