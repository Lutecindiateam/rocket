const express= require('express');
const { EmployerRegister, EmployerLogin } = require('../controller/Employee/auth');
const { PostJob , GetJobList ,getRecentlyAddedJobs, getJobDetails, editjob, getCandidateForJob} = require('../controller/Employee/job');
const { getEmployerProfile, updateEmployerprofile, empGetCandidate } = require('../controller/Employee/profile');
const { createCategoryDropdownList, getAllformdetails, createEducationalDropdownList, createCourseDropdownList } = require('../controller/Employee/dropdowndata');
const router =express.Router();


//Temporary Update
// router.post('/employer/register',EmployerRegister);
router.post('/employer/login',EmployerLogin);
router.post('/employer/postjob', PostJob)
router.get('/employer/:id/jobs', GetJobList)
router.get('/job/Recentlyadded-jobs', getRecentlyAddedJobs)
router.get('/job/:job_id', getJobDetails)
router.get('/employer/:id', getEmployerProfile)
router.patch('/employer/:id' , updateEmployerprofile)
router.get('/job/getCandidateParticular-Job/:id', getCandidateForJob)
router.patch('/job/:id', editjob)
router.post('/job/lastweekadded-jobs' , createCategoryDropdownList)
router.post('/job/form-fields', getAllformdetails)
router.post('/create/education', createEducationalDropdownList)
router.post('/create/course', createCourseDropdownList)
router.get('/candidate/simple/:id', empGetCandidate)

module.exports= router;

