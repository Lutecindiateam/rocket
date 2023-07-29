
const mongoose = require("mongoose")


const applySchema = new mongoose.Schema(
{
   candidate_id:{
        type: String,
        required: true
    },
    job_id:{
        type:String,
        required: true
    }


},
{timestamps: true}
)
module.exports = mongoose.model('jobApplication', applySchema)