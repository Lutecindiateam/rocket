const candidate = require("../../models/Candidate/candidate");
const Job = require('../../models/Employer/postjob')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jobApplication = require('../../models/Candidate/applyjob')
const jwkToPem = require('jwk-to-pem');
const fetch = require('node-fetch');

const pems = {};

class AuthMiddleware {
  constructor() {
    this.poolRegion = 'ap-south-1';
    this.userPoolId = 'ap-south-1_k1WG6VJy5';
    this.setUp();
  }

  verifyToken(req, resp, next) {
    const { token } = req.body;
    if (!token) return resp.status(401).end();

    let decodedJwt = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
      resp.status(401).end();
      return;
    }
    // console.log(decodedJwt);
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    console.log(pem);
    if (!pem) {
      resp.status(401).end();
      return;
    }
    jwt.verify(token, pem, function (err, payload) {
      if (err) {
        resp.status(401).end();
        return;
      } else {
        next();
      }
    });
  }

  async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw 'request not successful';
      }
      const data = await response.json();
      const { keys } = data;
      for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };
        const pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
      // console.log('got PEMS');
    } catch (error) {
      console.log(error);
      console.log('Error! Unable to download JWKs');
    }
  }
}
const authMiddleware = new AuthMiddleware();


exports.getLoginDetails = async (req, res) => {
  try {
    const info = await candidate.findById(req.params.id).lean()

    if (!info) {
      return res.status(404).json({
        code: '404',
        data: null,
        message: 'Job details not found',
        status: 'error',
      });
    }

    info.id = info._id;
    delete info._id;

    return res.status(200).json({
      code: 200,
      data: info,
      message: "Candidate details found",
      status: "success"
    })
  } catch (error) {
    console.log(error.message);
  }
}


exports.updateCandidateProfile = async (req, res) => {
  const userId = req.params.id
  // console.log(userId);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    const {
      first_name,
      last_name,
      marital_status,
      languages,
      career_level,
      industry,
      address,
      profile_title,
      profile_in_brief,
      current_organization,
      current_ctc,
      birth_date,
      total_experience,
      gender,
      email,
      password,
      phone,
      state,
      city,
      skills,
      notice_period,
      course,
      pincode,
      education
    } = req.body;
    // console.log("req.body ::",req.body);
    const Candidate = await candidate.findOneAndUpdate(
      // console.log("candidate",candidate),
      { _id: userId },
      {
        $set: {
          first_name: first_name || candidate.first_name,
          last_name: last_name || candidate.last_name,
          notice_period: notice_period || candidate.notice_period,
          state: state.name || candidate.state.name,
          city: city.name || candidate.city.name,
          skills: skills || candidate.skills,
          gender: gender ?? candidate.gender,
          birth_date: birth_date || candidate.birth_date,
          marital_status: marital_status ?? candidate.marital_status,
          email: email || candidate.email,
          languages: languages || candidate.languages,
          password: password || candidate.password,
          phone: phone || candidate.phone,
          total_experience: total_experience || candidate.total_experience,
          career_level: career_level || candidate.career_level,
          industry: industry || candidate.industry,
          address: address || candidate.address,
          profile_title: profile_title || candidate.profile_title,
          profile_in_brief: profile_in_brief || candidate.profile_in_brief,
          current_organization: current_organization || candidate.current_organization,
          current_ctc: current_ctc || candidate.current_ctc,
          total_experience: total_experience || candidate.total_experience,
          course: course || candidate.course,
          education: education || candidate.education,
          pincode: pincode || candidate.pincode,
          status: true
        },
      },
      { new: true }
    )
    if (!Candidate) {
      return res.status(404)({ error: "Candidate Not Found" })
    }

    return res.status(200).json({
      code: 200,
      message: "Candidate Profile Detail updated!!",
      status: "success"
    })

  } catch (error) {
    console.log(error.message);

  }
}


exports.getAllJob = async (req, res) => {
  const { page, page_size } = req.query;

  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(page_size) || 10;
  const skipCount = 0;
  // const skipCount = (pageNumber - 1) * pageSize + 6;

  try {
    const totalJobs = await Job.countDocuments();
    const lastPage = Math.ceil(totalJobs / pageSize);
    // const lastPage = Math.ceil((totalJobs - 6) / pageSize);

    const jobs = await Job.find()
      .skip(skipCount)
      .limit(pageSize)
      .exec();

    if (jobs) {
      const modifiedJobs = jobs.map((job) => {
        return {
          company_name: job.company_name,
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
          website : job.website,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          __v: job.__v,
        };
      });
      const response = {
        data: modifiedJobs,
        meta: {
          current_page: pageNumber,
          last_page: lastPage
        }
      };
      res.json(response);
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// exports.applyForJob = async (req, res) => {

//   const JobID = req.params.id;
//   const authHeader = req.headers.authorization;

//   try {
//     if (authHeader && authHeader.startsWith('Bearer ')) {
//       const token = authHeader.substring(7);
//       // console.log(token);
//       if (token) {
//         try {
//           const user = authMiddleware.verifyToken(token)
//           console.log("user",user);
//           req.user = user;
//           const Candidate = user.id
//           console.log(Candidate);
//           // console.log(Candidate);
//           const apply = await jobApplication.find({ candidate_id: Candidate, job_id: JobID });
//           // console.log(apply);
//           if (apply.length > 0) {
//             return res.status(400).json({
//               status: 'error',
//               message: 'Already applied for the job',
//             });
//           }

//           const newJob = new jobApplication({
//             candidate_id: req.user.id,
//             job_id: JobID,
//           });
//           await newJob.save();

//           return res.status(200).json({
//             status: 'success',
//             message: 'Job application successful',
//           });
//         } catch (error) {
//           console.error('Error verifying token:', error);
//           return res.status(403).json({
//             status: 'error',
//             message: 'Failed to authenticate token',
//           });
//         }
//       } else {
//         return res.status(401).json({
//           status: 'error',
//           message: 'Missing token',
//         });
//       }
//     }
//   } catch (error) {
//     console.error('Error applying for job:', error);
//     return res.status(500).json({
//       status: 'error',
//       message: 'Internal server error',
//     });
//   }
// };
exports.applyForJob = async (req, res) => {
  const JobID = req.params.id;
  const authHeader = req.headers.authorization;
  // console.log(pems);
  try {
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      if (token) {
        try {
          const user = jwt.decode(token, pems, { algorithms: ['RS256'] });
          // console.log("user", user);
          req.user = user;
          const Candidate = user.sub;
          // console.log(Candidate);
          const finduser = await candidate.findOne({ sub: Candidate })
          if (finduser) {
            const apply = await jobApplication.find({ candidate_id: finduser._id, job_id: JobID });
            // console.log(apply);
            if (apply.length > 0) {
              return res.status(400).json({
                status: 'error',
                message: 'Already applied for the job',
              });
            }

            const newJob = new jobApplication({
              candidate_id: finduser.id,
              job_id: JobID,
            });
            await newJob.save();

            return res.status(200).json({
              status: 'success',
              message: 'Job application successful',
            });
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          return res.status(403).json({
            status: 'error',
            message: 'Failed to authenticate token',
          });
        }
      } else {
        return res.status(401).json({
          status: 'error',
          message: 'Missing token',
        });
      }
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    console.error('Error applying for job:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};


exports.getAppliedJobs = async (req, res) => {
  try {
    const CandidateID = req.params.id;
    const user = await jobApplication.find({ candidate_id: CandidateID });

    if (user) {
      const jobs = [];
      const jobPromises = user.map((item) => {
        const jobId = item.job_id;
        return Job.findById(jobId).exec();
      });

      Promise.all(jobPromises)
        .then((jobResults) => {
          jobs.push(...jobResults);

          // const modifiedJobs = jobs.map((job) => {
          //   const { _id, ...rest } = job._doc;
          //   return { id: _id, ...rest };
          // });

          return res.status(200).json({
            code: 200,
            data: { jobs: jobs },
            message: "Jobs found",
            status: "success",
          });
        })
        .catch((error) => {
          console.log(error.message);
          return res.status(500).json({
            code: 500,
            message: "Internal server error",
            status: "error",
          });
        });
    } else {
      return res.status(404).json({
        code: 404,
        message: "No user found",
        status: "error",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
      status: "error",
    });
  }

}