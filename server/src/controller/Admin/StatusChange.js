const Job = require("../../models/Employer/postjob")
const Candidate = require("../../models/Candidate/candidate");
const jobApplication = require('../../models/Candidate/applyjob')
const employer = require('../../models/Employer/register');
const Admin = require('../../models/Admin/Auth')


exports.changePosition = async (req, res) => {
    const empid = req.params.id;
    // console.log(req.body);
    try {
        const company = await employer.findByIdAndUpdate(
            { _id: empid },
            {
                $set: {
                    status: req.body.status,
                    reason : req.body.reason
                },
            },
            { new: true }
        )

        if (company) {
            return res.status(200).json({
                code: 200,
                message: "Company Profile status changed",
                status: company.status
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "something wrong"
        })
    }
}

exports.getPostionStatus = async (req, res) => {
    try {
        const response = await employer.findById(req.params.id);
        if (response) {
            return res.status(200).json({
                data: response,
                message: "postion status checked",
                status: response.status
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}