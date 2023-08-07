const express= require('express');
const { AdminLogin, AdminSignup } = require('../controller/Admin/Auth');
const { AllCount, getAdminProfile, getlastSixJobs, getJobDetails, getLastSixCompanies, getCompanyDetails } = require('../controller/Admin/Alljobs');
const { getAllCandidates, getCandidateDetails, getAllJobs, getAllCompanies, getCompaniyWise } = require('../controller/Admin/Allusers');
const { MonthWiseCount, MonthWiseCountAppliedJobs } = require('../controller/Admin/Monthwise');
const { getIndutries, getEducation, getCourse, getNoticePeriod, getExpiry } = require('../controller/Admin/Options');
const { changePosition, getPostionStatus } = require('../controller/Admin/StatusChange');
const router =express.Router();


// router.post('/admin/signup' ,AdminSignup);
router.post('/admin/login', AdminLogin);
router.get('/Allcount', AllCount);
router.get('/admin/simple/:id', getAdminProfile);
router.get('/admin/lastsixJobs', getlastSixJobs);
router.get('/admin/getjobDetail/:id', getJobDetails);
router.get('/admin/lastsixEmployees', getLastSixCompanies);
router.get('/admin/getCompanyDetail/:id',getCompanyDetails);
router.get('/admin/getAllCandidates', getAllCandidates);
router.get('/admin/getAlljob', getAllJobs);
router.get('/admin/getAllCompanyDetail', getAllCompanies)
router.get('/admin/getCandidateDetail/:id', getCandidateDetails);
router.get('/admin/companywisetopjob', getCompaniyWise)
router.get('/admin/monthlyJobCount', MonthWiseCount)
router.get('/admin/monthlyappliedJobCount', MonthWiseCountAppliedJobs)
router.get('/admin/getcareer_levels', getIndutries)
router.get('/admin/getDegreeLevel', getEducation)
router.get('/admin/getFunctionalArea', getCourse)
router.get('/admin/getIndustry', getExpiry)
router.patch('/admin/editPartiCularPosition/:id', changePosition)
router.get('/admin/editPosition/:id', getPostionStatus )

module.exports= router;
