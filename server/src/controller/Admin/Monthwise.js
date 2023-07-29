const Job = require("../../models/Employer/postjob")
const Candidate = require("../../models/Candidate/candidate");
const jobApplication = require('../../models/Candidate/applyjob')
const employer = require('../../models/Employer/register');
const Admin = require('../../models/Admin/Auth')
const { DateTime } = require('luxon');


exports.MonthWiseCount = async (req, res) => {
try {
    const curMonth = DateTime.now().setZone('Asia/Kolkata').month;
  
    const startMonth = DateTime.now().set({ month: curMonth }).minus({ months: 12 }).startOf('month');
    const endMonth = DateTime.now().set({ month: curMonth - 1 }).endOf('month');
  
    const raw = await Job.find({
      createdAt: { $gte: startMonth.toJSDate(), $lte: endMonth.toJSDate() }
    }).select('createdAt');
  
    const data = raw.map(job => DateTime.fromJSDate(job.createdAt).toFormat('LLL-yyyy'));
  
    const monthRange = [];
    let currentMonth = startMonth;
    while (currentMonth <= endMonth) {
      monthRange.push(currentMonth.toFormat('LLL-yyyy'));
      currentMonth = currentMonth.plus({ months: 1 });
    }
  
    const dataValues = monthRange.reduce((acc, month) => {
      acc[month] = [0];
      return acc;
    }, {});
  
    data.forEach(month => {
      dataValues[month][0] += 1;
    });
  
    // Create the response object with all months as separate objects
    const response = {};
    for (const month of monthRange) {
      response[month] = dataValues[month];
    }
    return res.json({
      status: 'success',
      message: 'month and year wise data',
      data: response
    });
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

exports.MonthWiseCountAppliedJobs = async(req , res) => {
    try{
        const curMonth = DateTime.now().setZone('Asia/Kolkata').month;
  
        const startMonth = DateTime.now().set({ month: curMonth }).minus({ months: 12 }).startOf('month');
        const endMonth = DateTime.now().set({ month: curMonth - 1 }).endOf('month');
      
        const raw = await jobApplication.find({
          createdAt: { $gte: startMonth.toJSDate(), $lte: endMonth.toJSDate() }
        }).select('createdAt');
      
        const data = raw.map(job => DateTime.fromJSDate(job.createdAt).toFormat('LLL-yyyy'));
      
        const monthRange = [];
        let currentMonth = startMonth;
        while (currentMonth <= endMonth) {
          monthRange.push(currentMonth.toFormat('LLL-yyyy'));
          currentMonth = currentMonth.plus({ months: 1 });
        }
      
        const dataValues = monthRange.reduce((acc, month) => {
          acc[month] = [0];
          return acc;
        }, {});
      
        data.forEach(month => {
          dataValues[month][0] += 1;
        });
      
        // Create the response object with all months as separate objects
        const response = {};
        for (const month of monthRange) {
          response[month] = dataValues[month];
        }
        return res.json({
          status: 'success',
          message: 'month and year wise data',
          data: response
        });
    }catch(error){
        console.log(error.message);
    }
}