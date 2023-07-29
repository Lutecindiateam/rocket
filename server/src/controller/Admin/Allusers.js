const Job = require("../../models/Employer/postjob")
const Candidate = require("../../models/Candidate/candidate");
const jobApplication = require('../../models/Candidate/applyjob')
const employer = require('../../models/Employer/register');
const Admin = require('../../models/Admin/Auth')


exports.getAllCandidates = async(req , res) => {
        const { page, page_size } = req.query;


        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(page_size) || 10;
        // const skipCount = (pageNumber - 1) * pageSize + 6;
      
        try {
          const totalCandidate = await Candidate.countDocuments();
          const lastPage = Math.ceil(totalCandidate / pageSize);
      
          const Candidates = await Candidate.find()
            // .skip(skipCount)
            .limit(pageSize)
            .exec();
     
        //   if (Candidates) {
        //     const modifiedCandidate = Candidates.map((job) => {
        //       return {
        //         course: Candidates.course,
        //         id: Candidates._id,
        //         title: Candidates.title,
        //         category: Candidates.category,
        //         description: Candidates.description,
        //         salary_from: Candidates.salary_from,
        //         salary_to: Candidates.salary_to,
        //         state_name: Candidates.state_name,
        //         city_name: Candidates.city_name,
        //         position: Candidates.position,
        //         gender: Candidates.gender,
        //         expiry_date: Candidates.expiry_date,
        //         experience: Candidates.experience,
        //         degree_level: Candidates.degree_level,
        //         vacancy: Candidates.vacancy,
        //         state: Candidates.state,
        //         city: Candidates.city,
        //         company_id: Candidates.company_id,
        //         createdAt: Candidates.createdAt,
        //         updatedAt: Candidates.updatedAt,
        //         __v: Candidates.__v,
        //       };
        //     });
            const response = {
              data: Candidates,
              meta: {
                current_page: pageNumber,
                last_page: lastPage
              }
            };
            return res.status(200).json(response);
        //   }
      
         
    }catch(error){
        console.log(error.message);
    }
}

exports.getCandidateDetails = async(req, res) =>{
    try{

        const candidatedetails = await Candidate.findById(req.params.id);
        return res.status(200).json({
            data:[candidatedetails],
            message: "Candidate details found",
            status: "success"
        })
    }catch(error){
        console.log(error.message);
    }
}

exports.getAllJobs = async(req , res) => {
    const { page, page_size } = req.query;


    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(page_size) || 10;
  
    try {
      const totalJobs = await Job.countDocuments();
      const lastPage = Math.ceil((totalJobs - 6) / pageSize);
  
      const Jobs = await Job.find()
        .limit(pageSize)
        .exec();
 
        const response = {
          data: Jobs,
          meta: {
            current_page: pageNumber,
            last_page: lastPage
          }
        };
        return res.status(200).json(response);
    //   }
  
     
}catch(error){
    console.log(error.message);
}
}


exports.getAllCompanies = async(req , res) => {
    const { page, page_size } = req.query;


    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(page_size) || 10;
  
    try {
      const totalConpanies = await employer.countDocuments();
      const lastPage = Math.ceil(totalConpanies/ pageSize);
  
      const Conpanies = await employer.find()
        .limit(pageSize)
        .exec();
 
        const response = {
          data: Conpanies,
          meta: {
            current_page: pageNumber,
            last_page: lastPage
          }
        };
        return res.status(200).json(response);
    //   }
  
     
}catch(error){
    console.log(error.message);
}
}


exports.getCompaniyWise = async(req , res) => {
  try {
    const jobs = await Job.aggregate([
      {
        $group: {
          _id: { company_id: '$company_id', name: '$company_name' },
          total_companywisejob: { $sum: 1 }
        }
      },
      { $sort: { total_companywisejob: -1 } },
      { $limit: 5 }
    ]);

    const formattedJobs = jobs.map(job => ({
      company_id: job._id.company_id,
      name: job._id.name,
      total_companywisejob: job.total_companywisejob
    }));

    return res.json({
      status: 'success',
      message: 'company wise top five jobs',
      data: formattedJobs
    });
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}