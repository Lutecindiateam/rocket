const Job = require("../../models/Employer/postjob")
const jobApplication = require('../../models/Candidate/applyjob')
const employer = require('../../models/Employer/register');
const Admin = require('../../models/Admin/Auth')
const { DateTime } = require('luxon');
const dropdown = require("../../models/Employer/dropdownlist");
const candidate = require("../../models/Candidate/candidate");

exports.blockCompany = async (req, res) => {
    try {
        const empid = req.params.id
        const block = await employer.findByIdAndUpdate(
            { _id: empid },
            {
                $set: {
                    deleted: req.body.action
                }
            },
            { new: true }
        )
        if (block) {
            return res.status(200).json({
                data: block.deleted,
                message: "block status changed",
                status: "success"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.getCompanyblockstatus = async (req, res) => {
    try {
        const response = await employer.findById(req.params.id)
        if (response) {
            return res.status(200).json({
                data: response.deleted,
                message: "status check successfully",
                status: "success"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.changeCandidateBlockStatus = async(req , res) =>{
    try{
        const id = req.params.id
        const block = await candidate.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    deleted: req.body.action
                }
            },
            { new: true }
        )
        if (block) {
            return res.status(200).json({
                data: block.deleted,
                message: "block status changed",
                status: "success"
            })
        }

    }catch(error){
        console.log(error.message);
    }
}
exports.getCandidateblockstatus = async (req, res) => {
    try {
        const response = await candidate.findById(req.params.id)
        if (response) {
            return res.status(200).json({
                data: response.deleted,
                message: "status check successfully",
                status: "success"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.changeJobBlockStatus = async(req , res) =>{
    try{
        const id = req.params.id
        const block = await Job.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    deleted: req.body.action
                }
            },
            { new: true }
        )
        if (block) {
            return res.status(200).json({
                data: block.deleted,
                message: "block status changed",
                status: "success"
            })
        }

    }catch(error){
        console.log(error.message);
    }
}

exports.getJobblockstatus = async (req, res) => {
    try {
        const response = await Job.findById(req.params.id)
        if (response) {
            return res.status(200).json({
                data: response.deleted,
                message: "status check successfully",
                status: "success"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}
