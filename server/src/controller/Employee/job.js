const Job = require('../../models/Employer/postjob')
const jobApplication = require('../../models/Candidate/applyjob');
const { validationResult } = require('express-validator');
const candidate = require('../../models/Candidate/candidate');
const currentDate = new Date();
const currentDateWithoutTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
exports.PostJob = async (req, res) => {
    const numberOfDays = req.body.expiry_date;
    const targetDate = new Date(currentDate.getTime() + (numberOfDays * 24 * 60 * 60 * 1000));

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = targetDate.getDate();
    const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

    try {
        const job = await Job.create({
            company_name: req.body.company_name,
            title: req.body.title,
            description: req.body.description,
            // state: req.body.state,
            // city: req.body.city,
            city_name: req.body.city.name,
            state_name: req.body.state.name,
            position: req.body.position,
            experience: req.body.experience,
            company_id: req.body.company_id,
            category: req.body.category,
            gender: req.body.gender,
            expiry_date: formattedDate,
            salary_from: req.body.salary_from,
            salary_to: req.body.salary_to,
            degree_level: req.body.degree_level,
            vacancy: req.body.vacancy,
            desired_description: req.body.desired_description,
            pincode: req.body.pincode,
            remote: req.body.remote,
            status: req.body.status,
            functional_area: req.body.status,
            website: req.body.website
        });
        res.status(201).json({
            status: "success",
            job
        })
    } catch (error) {
        console.log(error.message);
    }
}


exports.GetJobList = async (req, res) => {
    // console.log(req.params)
    const JobId = req.params.id;
    try {
        const jobs = await Job.find({ company_id: JobId ,expiry_date: { $gte: currentDateWithoutTime } });
        // console.log(jobs);
        if (jobs) {
            const modifiedJobs = jobs.map((job) => {
                return {
                    id: job._id,
                    title: job.title,
                    category: job.category,
                    description: job.description,
                    salary_from: job.salary_from,
                    salary_to: job.salary_to,
                    state_name: job.state_name,
                    city_name: job.city_name,
                    position: job.position,
                    gender: job.gender,
                    expiry_date: job.expiry_date,
                    experience: job.experience,
                    degree_level: job.degree_level,
                    vacancy: job.vacancy,
                    state: job.state,
                    city: job.city,
                    company_id: job.company_id,
                    website:job.website,
                    createdAt: job.createdAt,
                    updatedAt: job.updatedAt,
                    deleted: job.deleted,
                    __v: job.__v,
                };
            });

            return res.status(200).json({
                code: 200,
                status: "success",
                message: "Jobs found",
                data: { jobs: modifiedJobs },
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.getRecentlyAddedJobs = async (req, res) => {
    // console.log(req.body)
    try {
        const jobs = await Job.find()
            .sort({ created_at: -1 })
            .limit(6)
            .lean();


        const modifiedJobs = jobs.map(job => {
            job.id = job._id;
            delete job._id;
            return job;
        });

        return res.status(200).json({
            status: 'success',
            message: 'Recently Added Job details found',
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
};

exports.getJobDetails = async (req, res) => {
    try {
        // console.log(req.params);
        const JobId = req.params.job_id
        // console.log(JobId);
        // if (req.params.job_id.match(/^[0-9a-fA-F]{24}$/)) {
        const details = await Job.findById(JobId).lean()

        if (!details) {
            return res.status(404).json({
                code: '404',
                data: null,
                message: 'Job details not found',
                status: 'error',
            });
        }

        return res.status(200).json({
            code: "200",
            data: { job: [details], jobs: [details] },
            message: "Job details found",
            status: "success"
        })

    } catch (error) {
        console.log(error.message)
    }
}


exports.getCandidateForJob = async (req, res) => {
    const job_id = req.params.id
    try {

        // Retrieve candidate information for the given job_id
        const Jobs = await jobApplication.find({ job_id })
            .sort({ created_at: -1 })

        const candidates = Jobs.map(async (item) => {

            const Candprofile = await candidate.findById(item.candidate_id).exec();
            return Candprofile;
        })
        const jobs = await Promise.all(candidates);
        // Prepare the response object
        const response = {
            status: 'success',
            code: 200,
            message: 'Jobs found',
            data: { jobs },
        };
        res.status(response.code).json(response);
    } catch (error) {

        const response = {
            status: 'error',
            code: 500,
            message: 'An error occurred',
            error: error.message,
        };

        res.status(response.code).json(response);
    }
}

exports.editjob = async (req, res) => {
    try {
        const JobId = req.params.id
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
        }
        const {
            company_id,
            title,
            category,
            gender,
            expiry_date,
            salary_from,
            salary_to,
            degree_level,
            position,
            experience,
            description,
            vacancy,
            position_status
        } = req.body

        const jobs = await Job.findOneAndUpdate(
            { _id: JobId },
            {
                $set: {
                    company_id: company_id || Job.company_id,
                    title: title || Job.title,
                    category: category || Job.category,
                    gender: gender || Job.gender,
                    expiry_date: expiry_date || Job.expiry_date,
                    salary_from: salary_from || Job.salary_from,
                    salary_to: salary_to || Job.salary_to,
                    degree_level: degree_level || Job.degree_level,
                    position: position || Job.position,
                    experience: experience || Job.experience,
                    description: description || Job.description,
                    vacancy: vacancy || Job.vacancy,
                    position_status: position_status || job.position_status
                },
            },
            { new: true }
        )

        if (jobs) {
            return res.status(200).json({
                code: 200,
                message: "job Profile Detail updated!!",
                status: "success"
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}