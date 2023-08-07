const Job = require("../../models/Employer/postjob")
const Candidate = require("../../models/Candidate/candidate");
const jobApplication = require('../../models/Candidate/applyjob')
const employer = require('../../models/Employer/register');
const Admin = require('../../models/Admin/Auth')

exports.AllCount = async (req, res) => {
    try {

        const AllJobsCount = await Job.find();
        const AllCandidatesCount = await Candidate.find();
        const AllAppliedJobs = await jobApplication.find();
        const AllEmployer = await employer.find();

        return res.status(200).json({
            data: {
                alljobsCount: AllJobsCount.length,
                allcandidatesCount: AllCandidatesCount.length,
                allappliedjobsCount: AllAppliedJobs.length,
                empcount: AllEmployer.length,
            },
            message: "All count found",
            status: "success"
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.getAdminProfile = async (req, res) => {
    try {
        const profile = await Admin.findById(req.params.id);
        // console.log(profile);
        return res.status(200).json({
            data: [profile],
            message: "admin details found",
            status: "success"
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.getlastSixJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .sort({ created_at: -1 })
            .limit(6)
            // .populate('company_id', 'name logo website country state city')
            // .populate('category', 'name')
            // .populate('state', 'name')
            // .populate('city', 'name')
            // .populate('degree_level', 'level')
            .lean();


        const modifiedJobs = jobs.map(job => {
            job.id = job._id;
            delete job._id;
            return job;
        });

        return res.status(200).json({
            status: 'success',
            message: 'last six job',
            data: modifiedJobs,

        });
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            data: null,
        });
    }
}


exports.getJobDetails = async (req, res) => {
    try {
        const jobdetails = await Job.findById(req.params.id);
        return res.status(200).json({
            data:{job:[jobdetails]},
            message: "Job details found",
            status: "success"
        })
        

    } catch (error) {
        console.log(error.message);
    }
}

exports.getLastSixCompanies = async(req , res) =>{
    try{
        const getCompanies = await employer.find()
        .sort({ created_at: -1 })
        .limit(6)
        .lean();


    const companies = getCompanies.map(employer => {
        employer.id = employer._id;
        delete employer._id;
        return employer;
    });

    return res.status(200).json({
        status: 'success',
        message: 'last six companies',
        data: companies,

    });
    }catch(error){
        console.log(error.message);
    }
}

exports.getCompanyDetails = async(req, res) =>{
    try{
        const companyDetails = await employer.findById(req.params.id);
        return res.status(200).json({
            data:[companyDetails],
            message: "Company details found",
            status: "success"
        })
    }catch(error){
        console.log(error.message);
    }
}