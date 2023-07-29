const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },
    category: {
        type: String,
        trim: true,
        required: [true, 'Category is required'],
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    salary_from: {
        type: String,
        trim: true,
    },
    salary_to: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    state_name: {
        type: String,
    },
    city_name: {
        type: String,
    },
    position: {
        type: String,
    },
    gender:{
        type: Number
    },
    expiry_date:{
        type: Date
    },
    experience:{
        type: Number
    },
    degree_level:{
        type: String
    },
    functional_area:{
        type:String
    },
    vacancy:{
        type: Number
    },
    // state:{
    //     type: Object,
    //     required: true
    // },
    // city:{
    //     type: Object,
    //     required:true
    // },
    company_id:{
        type: String,
        required: true
    },
    desired_description:{
        type: String
    },
    pincode:{
        type : String
    },
    remote:{
        type: String
    },
    company_name:{
        type: String
    },
    position_status : {
        type: String
    },
    // status:{
    //     type: String
    // }

}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema);
