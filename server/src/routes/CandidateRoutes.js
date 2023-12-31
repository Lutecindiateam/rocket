const express= require('express');
const { CandidateRegister, CandidateLogin, saveResumeUrl, saveLogoUrl } = require('../controller/Candidate/register');
const { getLoginDetails, getAllJob, updateCandidateProfile, applyForJob, getAppliedJobs } = require('../controller/Candidate/profile');
const { requireSignin } = require('../common-middleware');
const { searchjobs, checkAppliedJobs, getSuggestions, saveSuggestions } = require('../controller/Candidate/search');
const router =express.Router();


//Temporary Update
// router.post('/candidate/register' ,CandidateRegister);
router.post('/candidate/login' ,CandidateLogin);
router.get('/candidate/:id', getLoginDetails)
router.get('/job', getAllJob)
router.patch('/candidate/:id', updateCandidateProfile)
router.post('/job/:id/apply', requireSignin, applyForJob)
router.get('/candidate/:id/jobs', getAppliedJobs)
router.post('/job/search', searchjobs)
router.post('/job/checkbookmarksorappliedjob', checkAppliedJobs)
router.patch('/candidate/pdfdetails/:id', saveResumeUrl)
router.post('/suggestions/save',saveSuggestions)
router.patch('/candidate/logurl/:id', saveLogoUrl)
router.get('/suggestions', getSuggestions)
module.exports= router;
  

