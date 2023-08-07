const jobApplication = require('../../models/Candidate/applyjob')
const Job = require('../../models/Employer/postjob')

exports.searchjobs = async (req, res) => {
  // console.log(req.body);
  const  {title, country}  = req.body;
  try {
    let data;

    const check = await Job.find({expiry_date: { $gt: new Date() }})
    if(check){

    if (!title && !country) {
      data = await Job.find({ expiry_date: { $gt: new Date() } });
    } else if (!title && country) {
     data = await Job.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: req.body.country,
            path: {
              wildcard: "*"
            }
          }
        }
      }])
    } else if (title && !country) {
       data = await Job.aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: req.body.title,
              path: {
                wildcard: "*"
              }
            }
            
          }
        }])
       
      }else if(title && country){  
         data = await Job.aggregate([
          // {
          //   $search: {
          //     index: "default",
          //     text: {
          //       query:  `${req.body.title} ${req.body.country}`,
          //       path: {
          //         wildcard: "*"
          //       }
          //     }
          //   }
          // }
          [
            {
              $search: {
                index: "default",
                text: {
                  query: "<query>",
                  path: {
                    wildcard: "*"
                  }
                }
              }
            }
          ]
        ])
         }}
          return res.status(200).json({
            data,
            message:"jobs category title and  location found",
            status:"success"
    })
  } catch (error) {
    console.log(error.message);
  }
}

exports.checkAppliedJobs= async(req, res) => {
 try{
  const {candidate_id, job_id} = req.body;
  const AppliedJob = await jobApplication.findOne({candidate_id , job_id}).lean()
  const appliedJob1 = !!AppliedJob;
  return res.status(201).json({
    data: {appliedJob: appliedJob1},
message:"We have already done this job",
status: "success"
  })
 }catch(err){
  console.log(err.message);
 }
 }

 // return jobs;
    // }
    //  else if (title && !country) {
    //   console.log("2");

    //   const jobs = await Job.aggregate([
    //     {
    //       $search: {
    //         index: "Search-text",
    //         text: {
    //           query: req.body.title,
    //           path: {
    //             wildcard: "*"
    //           }
    //         }
            
    //       }
    //     }])
    //     console.log(jobs);
    // }else if(title && country){
    //   console.log("3");

    //   const jobs = await Job.aggregate([
    //     {
    //       $search: {
    //         index: "Search-text",
    //         text: {
    //           query: req.body.country,
    //           query: req.body.title,
    //           path: {
    //             wildcard: "*"
    //           }
    //         }
    //       }
    //     }])
    // }else{
    //   console.log("4");

    //   const jobs = await Job.aggregate([
    //     {
    //       $search: {
    //         index: "Search-text",
    //         // text: {
    //         //   query: req.body.country,
    //         //   query: req.body.title,
    //         //   path: {
    //         //     wildcard: "*"
    //         //   }
    //         // }
    //       }
    //     }])
    // }
    // console.log("5", jobs);

    // // const candidateId = req.user.id;
    // // console.log(candidateId);

    // // let jobs;
    // // if (name && state && city) {
    // //   jobs = await Job.find({
    // //     name: { $regex: new RegExp(name, "i") },
    // //     state: { $regex: new RegExp(state, "i") },
    // //     city: { $regex: new RegExp(city, "i") },
    // //     expiry_date: { $gt: new Date() },
    // //   });
    // //   console.log("1",jobs);

    // // } else if (name && state) {
    // //   jobs = await Job.find({
    // //     name: { $regex: new RegExp(name, "i") },
    // //     state: { $regex: new RegExp(state, "i") },
    // //     expiry_date: { $gt: new Date() },
    // //   });
    // //   console.log("2",jobs);

    // // } else if (name && city) {
    // //   jobs = await Job.find({
    // //     name: { $regex: new RegExp(name, "i") },
    // //     city: { $regex: new RegExp(city, "i") },
    // //     expiry_date: { $gt: new Date() },
    // //   });
    // //   console.log("3",jobs);

    // // } else if (state && city) {
    // //   jobs = await Job.find({
    // //     state: { $regex: new RegExp(state, "i") },
    // //     city: { $regex: new RegExp(city, "i") },
    // //     expiry_date: { $gt: new Date() },
    // //   });
    // //   console.log("4",jobs);

    // // } else {
    // //   jobs = await Job.find({ expiry_date: { $gt: new Date() } });
    // // }

    // // console.log("5",jobs);

    // // // if (candidateId) {
    // //   jobs = jobs.map(async(job) => {
    // //     const appliedJob = await jobApplication.findOne({
    // //       jobId: job.id,
    // //       candidateId: candidateId,
    // //     });
    // //     job.isApplied = !!appliedJob;
    // //     return job;
    // //   });
    // // }