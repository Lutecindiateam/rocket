const Job = require("../../models/Employer/postjob")
const Candidate = require("../../models/Candidate/candidate");
const jobApplication = require('../../models/Candidate/applyjob')
const employer = require('../../models/Employer/register');
const Admin = require('../../models/Admin/Auth')
const { DateTime } = require('luxon');
const dropdown = require("../../models/Employer/dropdownlist");


exports.getIndutries = async (req, res) => {
    try {
        const { page, page_size } = req.query;

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(page_size) || 10;

        const totalConpanies = await dropdown.find({})
        const categoires = totalConpanies[0].category.length;
        const lastPage = Math.ceil((categoires - 6) / pageSize);
        //   console.log(totalConpanies);
        const firstDocument = await dropdown.findOne({},
            { category: { $slice: [(pageNumber - 1) * pageSize, pageSize] } });


        const response = {
            data: firstDocument.category,
            meta: {
                current_page: pageNumber,
                last_page: lastPage
            }
        };
        return res.status(200).json(response);
        //   }
    } catch (error) {
        console.log(error.message);
    }
}

exports.getEducation = async (req, res) => {
    try {
        const { page, page_size } = req.query;

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(page_size) || 10;

        const totalEducation = await dropdown.find({})
      
        const education = totalEducation[1].educationLevel.length;
        const lastPage = Math.ceil(education / pageSize);

        const secondDocument = await dropdown.findOne({}, { educationLevel: { $slice: [(pageNumber - 1) * pageSize, pageSize] } })
        .skip(1)
        .exec();

        const response = {
            data: secondDocument.educationLevel,
            meta: {
                current_page: pageNumber,
                last_page: lastPage
            }
        };
        return res.status(200).json(response);  
      } catch (error) {
        console.log(error.message);
    }
}

exports.getCourse = async(req , res) => {
    try{
        const { page, page_size } = req.query;

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(page_size) || 10;

        const totalCourse = await dropdown.find({})
      
        const course = totalCourse[2].educationOptions.length;
        const lastPage = Math.ceil(course / pageSize);

        const thirdDocument = await dropdown.findOne({}, { educationOptions: { $slice: [(pageNumber - 1) * pageSize, pageSize] } })
        .skip(2)
        .exec();

        const response = {
            data: thirdDocument.educationOptions,
            meta: {
                current_page: pageNumber,
                last_page: lastPage
            }
        };
        return res.status(200).json(response);  
}catch(error){
        console.log(error.message);
    }
}

exports.getExpiry = async ( req , res) =>{
    try{
        const { page, page_size } = req.query;

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(page_size) || 10;

        const totalExpiry = await dropdown.find({})
      
        const expiry = totalExpiry[4].expiry_date.length;
        const lastPage = Math.ceil(expiry / pageSize);

        const fifthDocument = await dropdown.findOne({}, { expiry_date: { $slice: [(pageNumber - 1) * pageSize, pageSize] } })
        .skip(4)
        .exec();

        const response = {
            data: fifthDocument.expiry_date,
            meta: {
                current_page: pageNumber,
                last_page: lastPage
            }
        };
        return res.status(200).json(response); 
    }catch(error){
        console.log(error.message);
    }
}