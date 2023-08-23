import Footer from "../Components/footer";
import Header from "../Components/header";
import React, { useEffect, useState } from "react";
import ManageAccount from "./manageAccount";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestEmpLogin,
  requestFormField,
  requestEditJob,
  requestJobDetails,
} from "../Redux/actions";
import WOW from "wowjs";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";

function EditJob(props) {
  const params = useParams();
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
    localStorage.removeItem("link");
  }, []);

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  const [data, setData] = useState({});
  const [selectedskill, setselectedskill] = useState([]);
  const [SalaryPeriod, setSalaryPeriod] = useState([]);
  const [career_levels, setcareer_levels] = useState([]);
  const [categories, setcategories] = useState([]);
  const [currencies, setcurrencies] = useState([]);
  const [degree_levels, setdegree_levels] = useState([]);
  const [functional_areas, setfunctional_areas] = useState([]);
  const [job_shifts, setjob_shifts] = useState([]);
  const [skills, setskills] = useState([]);
  const [tags, settags] = useState([]);
  const [types, settypes] = useState([]);
  // const [position, setposition] = useState([]);

  const [errorTitle, seterrorTitle] = useState("");
  const [errorType, seterrorType] = useState("");
  const [errorCategory, seterrorCategory] = useState("");
  const [errorGender, seterrorGender] = useState("");
  const [errorExpiry, seterrorExpiry] = useState("");
  const [errorFrom, seterrorFrom] = useState("");
  const [errorTo, seterrorTo] = useState("");
  const [errorCurrency, seterrorCurrency] = useState("");
  const [errorPeriod, seterrorPeriod] = useState("");
  const [errorCareer, seterrorCareer] = useState("");
  const [errorShift, seterrorShift] = useState("");
  const [errorDegree, seterrorDegree] = useState("");
  const [errorFunctional, seterrorFunctional] = useState("");
  // const [errorPosition, seterrorPosition] = useState("");
  const [errorDesc, seterrorDesc] = useState("");
  const [errorName, seterrorName] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorVacancy, seterrorVacancy] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
        props.requestJobDetails({
          id: params.id,
        });
        props.requestFormField({
          token: empLoginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/postJob");
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", "/postJob");
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let jobDetailsData = props.candidate.jobDetailsData;

    if (jobDetailsData !== undefined) {
      if (jobDetailsData?.data?.status == "success") {
        setData(jobDetailsData.data.data.job[0]);
      }
    }
  }, [props.candidate.jobDetailsData]);

  useEffect(() => {
    let formfieldData = props.employee.formfieldData;
    if (formfieldData !== undefined) {
      if (formfieldData?.data?.status === "success") {
        setcategories(formfieldData.data.data.categories[0].category);
        // setSalaryPeriod(formfieldData.data.data.SalaryPeriod);
        // setcareer_levels(formfieldData.data.data.career_levels);
        // setcurrencies(formfieldData.data.data.currencies);
        // setdegree_levels(formfieldData.data.data.degree_levels);
        // setfunctional_areas(formfieldData.data.data.functional_areas);
        // setjob_shifts(formfieldData.data.data.job_shifts);
        // setskills(formfieldData.data.data.skills);
        // settags(formfieldData.data.data.tags);
        // settypes(formfieldData.data.data.types);
        // setposition(formfieldData.data.data.position);
      }
    }
  }, [props.employee.formfieldData]);
// console.log(categories);
  function onChangeData(e) {
    if (e.target.type === 'radio') {
      setData((data) => ({
        ...data,
        [e.target.name]: parseInt(e.target.value),
      }));
    } else {
      setData((data) => ({
        ...data,
        [e.target.name]: e.target.value,
      }));
    }
  }

  function onChangeSkill(e) {
    selectedskill.push(e.target.value);
  }

  function validateTitle() {
    let formIsValid = false;
    if (!data["title"]) {
      formIsValid = false;
      seterrorTitle("*Enter job title.");
    } else if (typeof data["title"] === "undefined") {
      formIsValid = false;
      seterrorTitle("*Enter job title.");
    } else {
      formIsValid = true;
      seterrorTitle("");
    }
    return formIsValid;
  }
  function validateType() {
    let formIsValid = false;
    if (data["type"] === "0") {
      formIsValid = false;
      seterrorType("*Select job type.");
    } else if (typeof data["type"] === "undefined") {
      formIsValid = false;
      seterrorType("*Select job type.");
    } else {
      formIsValid = true;
      seterrorType("");
    }
    return formIsValid;
  }
  function validateCategory() {
    let formIsValid = false;
    if (data["category"] === "0") {
      formIsValid = false;
      seterrorCategory("*Select job category.");
    } else if (typeof data["category"] === "undefined") {
      formIsValid = false;
      seterrorCategory("*Select job category.");
    } else {
      formIsValid = true;
      seterrorCategory("");
    }
    return formIsValid;
  }
  function validateGender() {
    let formIsValid = false;
    if (typeof data["gender"] === "undefined") {
      formIsValid = false;
      seterrorGender("*Select gender for job.");
    } else {
      formIsValid = true;
      seterrorGender("");
    }
    return formIsValid;
  }
  function validateExpiry() {
    let formIsValid = false;
    var Today = new Date();
    if (data["expiry_date"] !== null) {
      if (new Date(data["expiry_date"]).getTime() <= Today.getTime()) {
        formIsValid = false;
        seterrorExpiry("*Please select proper date.");
      } else {
        formIsValid = true;
        seterrorExpiry("");
      }
    } else {
      formIsValid = true;
      seterrorExpiry("");
    }
    return formIsValid;
  }
  function validateFrom() {
    let formIsValid = false;
    if (data["salary_from"] === undefined) {
      formIsValid = false;
      seterrorFrom("*Enter minimum salary.");
    } else if (data["salary_from"] <= 0) {
      formIsValid = false;
      seterrorFrom("*Minimum salary shold be more than 0.");
    } else {
      formIsValid = true;
      seterrorFrom("");
    }
    return formIsValid;
  }
  function validateTo() {
    let formIsValid = false;
    if (data["salary_to"] === undefined) {
      formIsValid = false;
      seterrorTo("*Enter maximum salary.");
    } else if (data["salary_to"] <= data["salary_from"]) {
      formIsValid = false;
      seterrorTo("*Maximum salary shold be more than Minimum salary.");
    } else {
      formIsValid = true;
      seterrorTo("");
    }
    return formIsValid;
  }
  function validateCurrency() {
    let formIsValid = false;
    if (data["currency"] === "0") {
      formIsValid = false;
      seterrorCurrency("*Select salary currency.");
    } else if (typeof data["currency"] === "undefined") {
      formIsValid = false;
      seterrorCurrency("*Select salary currency.");
    } else {
      formIsValid = true;
      seterrorCurrency("");
    }
    return formIsValid;
  }
  function validatePeriod() {
    let formIsValid = false;
    if (data["salary_period"] === "0") {
      formIsValid = false;
      seterrorPeriod("*Select salary period.");
    } else if (typeof data["salary_period"] === "undefined") {
      formIsValid = false;
      seterrorPeriod("*Select salary period.");
    } else {
      formIsValid = true;
      seterrorPeriod("");
    }
    return formIsValid;
  }
  function validateCareer() {
    let formIsValid = false;
    if (data["career_level"] === "0") {
      formIsValid = false;
      seterrorCareer("*Select career level.");
    } else if (typeof data["career_level"] === "undefined") {
      formIsValid = false;
      seterrorCareer("*Select career level.");
    } else {
      formIsValid = true;
      seterrorCareer("");
    }
    return formIsValid;
  }
  function validateShift() {
    let formIsValid = false;
    if (data["shift"] === "0") {
      formIsValid = false;
      seterrorShift("*Select job shift.");
    } else if (typeof data["shift"] === "undefined") {
      formIsValid = false;
      seterrorShift("*Select job shift.");
    } else {
      formIsValid = true;
      seterrorShift("");
    }
    return formIsValid;
  }
  function validateDegree() {
    let formIsValid = false;
    if (data["degree_level"] === "0") {
      formIsValid = false;
      seterrorDegree("*Select degree level.");
    } else if (typeof data["degree_level"] === "undefined") {
      formIsValid = false;
      seterrorDegree("*Select degree level.");
    } else {
      formIsValid = true;
      seterrorDegree("");
    }
    return formIsValid;
  }
  function validateFunctional() {
    let formIsValid = false;
    if (data["functional_area"] === "0") {
      formIsValid = false;
      seterrorFunctional("*Select functional area.");
    } else if (typeof data["functional_area"] === "undefined") {
      formIsValid = false;
      seterrorFunctional("*Select functional area.");
    } else {
      formIsValid = true;
      seterrorFunctional("");
    }
    return formIsValid;
  }
  // function validatePosition() {
  //   let formIsValid = false;
  //   // if (data["position"] === "un") {
  //   //   formIsValid = false;
  //   //   seterrorPosition("*Select job position.");
  //   // } else
  //    if (typeof data["position"] === "undefined") {
  //     formIsValid = false;
  //     seterrorPosition("*Select job position.");
  //   } else {
  //     formIsValid = true;
  //     seterrorPosition("");
  //   }
  //   return formIsValid;
  // }
  function validateDesc() {
    let formIsValid = false;
    if (!data["description"]) {
      formIsValid = false;
      seterrorDesc("*Enter job description.");
    } else if (typeof data["description"] === "undefined") {
      formIsValid = false;
      seterrorDesc("*Enter job description.");
    } else {
      formIsValid = true;
      seterrorDesc("");
    }
    return formIsValid;
  }
  function validateName() {
    let formIsValid = false;
    if (!data["Recruiter_name"]) {
      formIsValid = false;
      seterrorName("*Enter recruiter name.");
    } else if (typeof data["Recruiter_name"] !== "undefined") {
      if (!data["Recruiter_name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterrorName("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterrorName("");
      }
    }
    return formIsValid;
  }
  function validateEmail() {
    let formIsValid = false;
    if (!data["Recruiter_email"]) {
      formIsValid = false;
      seterrorEmail("*Enter recruiter E-mail ID.");
    } else if (typeof data["Recruiter_email"] !== "undefined") {
      if (
        !data["Recruiter_email"].match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        )
      ) {
        formIsValid = false;
        seterrorEmail("*Please enter valid E-mail ID.");
      } else {
        formIsValid = true;
        seterrorEmail("");
      }
    }
    return formIsValid;
  }
  function validateVacancy() {
    let formIsValid = false;
    if (data["vacancy"] === undefined) {
      formIsValid = false;
      seterrorVacancy("*Enter job vacancy.");
    } else if (data["vacancy"] <= 0) {
      formIsValid = false;
      seterrorVacancy("*Vacancy shold be more than 0.");
    } else {
      formIsValid = true;
      seterrorVacancy("");
    }
    return formIsValid;
  }
  function validateForm() {
    let Title = validateTitle();
    // let Type = validateType();
    let Category = validateCategory();
    let Gender = validateGender();
    let Expiry = validateExpiry();
    let From = validateFrom();
    let To = validateTo();
    // let Currency = validateCurrency();
    // let Period = validatePeriod();
    // let Career = validateCareer();
    // let Shift = validateShift();
    let Degree = validateDegree();
    // let Functional = validateFunctional();
    // let Position = validatePosition();
    let Desc = validateDesc();
    // let Name = validateName();
    // let Email = validateEmail();
    let Vacancy = validateVacancy();
    let valid = Title && Category && Gender && Expiry && From && To && Degree && Desc && Vacancy;
    return valid;
  }


  const submitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      props.requestEditJob({
        token: emp.token,
        id: params.id,
        data: {
          company_id: emp.id,
          title: data.title,
          gender: data.gender,
          expiry_date: data.expiry_date,
          salary_from: data.salary_from,
          salary_to: data.salary_to,
          position_status:data.position_status,
          degree_level: data.degree_level,
          experience: data.experience,
          description: data.description,
          vacancy: data.vacancy,
          category: data.category,

          // type: data.type,
          // skill: selectedskill,         
          // currency: data.currency,
          // salary_period: data.salary_period,
          // career_level: data.career_level,
          // shift: data.shift,         
          // functional_area: data.functional_area,
          // position: data.position,         
          // Recruiter_name: data.Recruiter_name,
          // Recruiter_email: data.Recruiter_email,
        },
      });
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if (errorTitle) {
        document.getElementById("title").focus();
      } else if (errorVacancy) {
        document.getElementById("vacancy").focus();
      }
      // else if(errorType){
      //   document.getElementById("type").focus();
      // }
      else if (errorCategory) {
        document.getElementById("category").focus();
      } else if (errorGender) {
        document.getElementById("genderMale").focus();
      } else if (errorExpiry) {
        document.getElementById("expiry_date").focus();
      } else if (errorFrom) {
        document.getElementById("salary_from").focus();
      } else if (errorTo) {
        document.getElementById("salary_to").focus();
      }
      // else if(errorCurrency){
      //   document.getElementById("currency").focus();
      // }else if(errorPeriod){
      //   document.getElementById("salary_period").focus();
      // }else if(errorCareer){
      //   document.getElementById("career_level").focus();
      // }else if(errorShift){
      //   document.getElementById("shift").focus();
      // }
      // else if(errorPosition){
      //   document.getElementById("position").focus();
      // }
      else if (errorDegree) {
        document.getElementById("degree_level").focus();
      }
      // else if(errorFunctional){
      //   document.getElementById("functional_area").focus();
      // }
      else if (errorDesc) {
        document.getElementById("description").focus();
      }
      // else if(errorName){
      //   document.getElementById("Recruiter_name").focus();
      // }else if(errorEmail){
      //   document.getElementById("Recruiter_email").focus();
      // }
      setError(false)
    }
  }, [error]);

  useEffect(() => {
    let empEditJobData = props.employee.empEditJobData;
    if (empEditJobData !== undefined) {
      if (empEditJobData?.data?.status == "success") {
        Swal.fire("Good job!", "Job updated successfully.", "success");
        props.employee.empEditJobData = undefined;
        navigate("/manageJobs");
      } else {
        Swal.fire('Error!', `Somthing went wrong while updating job.`, 'error');
        props.employee.empEditJobData = undefined;
      }
    }
  }, [props.employee.empEditJobData]);
  
  return (
    <>
      <Header />
      <Breadcrumbs title="Edit Job" />
      <div class="manage-jobs section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Job" />

              <div class="col-lg-8 col-12">
                <div class="job-post">
                  <div class="job-information">
                    <h3 class="title">Job Information</h3>
                    <form class="forms-sample">
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Job title*</label>
                            <input
                              class="form-control"
                              type="text"
                              name="title"
                              id="title"
                              value={data.title}
                              readOnly
                              onBlur={validateTitle}
                              // onChange={onChangeData}
                              placeholder=""
                            />
                            {errorTitle && (
                              <div style={mystyle}>{errorTitle}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Job Vacancy*</label>
                            <input
                              class="form-control"
                              type="number"
                              name="vacancy"
                              id="vacancy"
                              value={data.vacancy}
                              onBlur={validateVacancy}
                              onChange={onChangeData}
                              placeholder=""
                            />
                            {errorVacancy && (
                              <div style={mystyle}>{errorVacancy}</div>
                            )}
                          </div>
                        </div>
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Job Types*</label>
                            <select
                              class="select"
                              name="type"
                              id="type"
                              value={data.type}
                              onBlur={validateType}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Job Type</option>
                              {types.map((option) => (
                                <option value={option.id}>{option.name}</option>
                              ))}
                            </select>
                            {errorType && (
                              <div style={mystyle}>{errorType}</div>
                            )}
                          </div>
                        </div> */}
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Industrial Category*</label>
                            <select
                              class="select"
                              name="category"
                              id="category"
                              value={data.category}
                              onBlur={validateCategory}
                              readOnly
                            // onChange={onChangeData}
                            >
                              <option value="0">Select Job Category</option>
                              {categories.map((option) => {
                                if (option.disable === "yes") {
                                  return (
                                    <option key={option._id} value="0" style={{ color: "#964B00" , fontSize:"20px"}} disabled>{option.name}</option>
                                  )
                                } else {
                                  return (
                                    <option key={option._id} value={option._id}>{option.name}</option>
                                  )
                                }
                              })}
                            </select>
                            {errorCategory && (
                              <div style={mystyle}>{errorCategory}</div>
                            )}
                          </div>
                        </div>

                        <div class="col-lg-6 col-md-6">
                          <div style={{ color: "black" }}>
                            <label for="gender" class="label">
                              Gender
                            </label>
                            <br />
                            <br />
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                style={{ margin: "0px" }}
                                id="genderMale"
                                name="gender"
                                value="1"
                                onBlur={validateGender}
                                onChange={onChangeData}
                                checked={data.gender === 1}
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio1"
                              >
                                Male
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                style={{ margin: "0px" }}
                                id="genderFemale"
                                name="gender"
                                value="0"
                                onBlur={validateGender}
                                onChange={onChangeData}
                                checked={data.gender === 0}
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio2"
                              >
                                Female
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                style={{ margin: "0px" }}
                                id="genderAny"
                                name="gender"
                                value="2"
                                onBlur={validateGender}
                                onChange={onChangeData}
                                checked={data.gender === 2}
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio3"
                              >
                                Any
                              </label>
                            </div>
                            {errorGender && (
                              <div style={mystyle}>{errorGender}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Expiry Date</label>
                            <input
                              class="form-control"
                              type="date"
                              name="expiry_date"
                              id="expiry_date"
                              value={data.expiry_date.split("T")[0]}
                              onBlur={validateExpiry}
                              readOnly
                              // onChange={onChangeData}
                              placeholder=""
                            />
                            {errorExpiry && (
                              <div style={mystyle}>{errorExpiry}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Salary From*</label>
                            <input
                              class="form-control"
                              type="number"
                              name="salary_from"
                              id="salary_from"
                              value={data.salary_from}
                              onBlur={validateFrom}
                              onChange={onChangeData}
                              placeholder=""
                            />
                            {errorFrom && (
                              <div style={mystyle}>{errorFrom}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Salary To*</label>
                            <input
                              class="form-control"
                              type="number"
                              name="salary_to"
                              id="salary_to"
                              value={data.salary_to}
                              onBlur={validateTo}
                              onChange={onChangeData}
                              placeholder=""
                            />
                            {errorTo && <div style={mystyle}>{errorTo}</div>}
                          </div>
                        </div>
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Currency*</label>
                            <select
                              class="select"
                              name="currency"
                              id="currency"
                              value={data.currency}
                              onBlur={validateCurrency}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Currency</option>
                              {currencies.map((option) => (
                                <option value={option.id}>
                                  {option.currency_name}
                                </option>
                              ))}
                            </select>
                            {errorCurrency && (
                              <div style={mystyle}>{errorCurrency}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Salary Period*</label>
                            <select
                              class="select"
                              name="salary_period"
                              id="salary_period"
                              value={data.salary_period}
                              onBlur={validatePeriod}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Salary Period</option>
                              {SalaryPeriod.map((option) => (
                                <option value={option.id}>
                                  {option.period}
                                </option>
                              ))}
                            </select>
                            {errorPeriod && (
                              <div style={mystyle}>{errorPeriod}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Career Level*</label>
                            <select
                              class="select"
                              name="career_level"
                              id="career_level"
                              value={data.career_level}
                              onBlur={validateCareer}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Career Level</option>
                              {career_levels.map((option) => (
                                <option value={option.id}>
                                  {option.level}
                                </option>
                              ))}
                            </select>
                            {errorCareer && (
                              <div style={mystyle}>{errorCareer}</div>
                            )}
                          </div>
                        </div>*/}
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Position Status*</label>
                            <select
                              class="select"
                              name="position_status"
                              id="position_status"
                              value={data.position_status}
                              // onBlur={validateShift}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Position Status</option>                           
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>

                            </select>
                            {errorShift && (
                              <div style={mystyle}>{errorShift}</div>
                            )}
                          </div>
                        </div> 
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Position*</label>
                            <select
                              class="select"
                              name="position"
                              id="position"
                              value={data.position}
                              onBlur={validatePosition}
                              readOnly
                              // onChange={onChangeData}
                            >
                              <option value="0">Select Position</option>
                              {position.map((option) => (
                                <option value={option.id}>{option.name}</option>
                              ))}
                               <option value="Company level Manager">Company level Manager</option>
                              <option value="Chief Executive Officer">Chief Executive Officer</option>
                              <option value="Chief Operating Officer">Chief Operating Officer</option>
                              <option value="CEO">CEO</option>
                              <option value="Chief Financial Officer">Chief Financial Officer</option>
                              <option value="Chief Technology OfficerChief Technology Officer">Chief Technology Officer</option>
                              <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                              <option value="Chief Legal Officer">Chief Legal Officer</option>
                              <option value="Accounts Manager">Accounts Manager</option>
                              <option value="Recruitment Manager">Recruitment Manager</option>
                              <option value="Technology Manager">Technology Manager</option>
                              <option value="Store Manager">Store Manager</option>
                              <option value="Regional Managers">Regional Managers</option>
                              <option value="Functional Managers">Functional Managers</option>
                              <option value="Departmental Managers">Departmental Managers</option>
                              <option value="General Managers">General Managers</option>
                              <option value="Employee">Employee</option>
                            </select>
                            {errorPosition && (
                              <div style={mystyle}>{errorPosition}</div>
                            )}
                          </div> 
                        </div>*/}

                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Degree Level</label>
                            <select
                              class="select"
                              name="degree_level"
                              id="degree_level"
                              value={data.degree_level}
                              onBlur={validateDegree}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Degree</option>
                              {degree_levels.map((option) => (
                                <option value={option.id}>
                                  {option.level}
                                </option>
                              ))}
                              <option value="Master of Computer Science (MCA)">Master of Computer Science (MCA)</option>
                              <option value="Bachelor of Computer Science (BCA)">Bachelor of Computer Science (BCA)</option>
                              <option value="Associate of Applied Science (AAS)">Associate of Applied Science (AAS)</option>
                              <option value="Associate of Arts (A.A.)">Associate of Arts (A.A.)</option>
                              <option value="Associate of Science (A.S.)">Associate of Science (A.S.)</option>
                              <option value="Bachelor of Applied Science (BAS)">Bachelor of Applied Science (BAS)</option>
                              <option value="Bachelor of Arts (B.A.)">Bachelor of Arts (B.A.)</option>
                              <option value="Bachelor of Fine Arts (BFA)">Bachelor of Fine Arts (BFA)</option>
                              <option value="Bachelor of Science (B.S.)">Bachelor of Science (B.S.)</option>
                              <option value="Doctor of Dental Surgery (DDS)">Doctor of Dental Surgery (DDS)</option>
                              <option value="Doctor of Medicine (M.D.)">Doctor of Medicine (M.D.)</option>
                              <option value="Doctor of Philosophy (Ph.D.)">Doctor of Philosophy (Ph.D.)</option>
                              <option value="Juris Doctor (J.D.)">Juris Doctor (J.D.)</option>
                              <option value="Master of Arts (M.A.)">Master of Arts (M.A.)</option>
                              <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                              <option value="Master of Fine Arts (MFA)">Master of Fine Arts (MFA)</option>
                              <option value="Master of Science (M.S.)">Master of Science (M.S.)</option>
                            </select>
                            {errorDegree && (
                              <div style={mystyle}>{errorDegree}</div>
                            )}
                          </div>
                        </div>
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Functional Area</label>
                            <select
                              class="select"
                              name="functional_area"
                              id="functional_area"
                              value={data.functional_area}
                              onBlur={validateFunctional}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Functional Area</option>
                              {functional_areas.map((option) => (
                                <option value={option.id}>{option.name}</option>
                              ))}
                            </select>
                            {errorFunctional && (
                              <div style={mystyle}>{errorFunctional}</div>
                            )}
                          </div>
                        </div> */}
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Experience</label>
                            <input
                              class="form-control"
                              type="number"
                              name="experience"
                              id="experience"
                              value={data.experience}
                              readOnly
                              // onChange={onChangeData}
                              placeholder=""
                            />
                          </div>
                        </div>
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Skill*</label>
                            <select
                              class="select"
                              name="skill"
                              onChange={onChangeSkill}
                              multiple
                            >
                              {skills.map((option) => (
                                <option
                                  value={option.id}
                                >
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Tag</label>
                            <select
                              class="select"
                              name="tag"
                              value={data.tag}
                              onChange={onChangeData}
                            >
                              {tags.map((option) => (
                                <option value={option.id}>{option.name}</option>
                              ))}
                            </select>
                          </div>
                        </div> */}
                        <div class="col-lg-12">
                          <div class="form-group">
                            <label>Job Description*</label>
                            <textarea
                              class="form-control"
                              rows="5"
                              name="description"
                              id="description"
                              value={data.description}
                              onChange={onChangeData}
                              onBlur={validateDesc}
                              placeholder=""
                            ></textarea>
                            {errorDesc && (
                              <div style={mystyle}>{errorDesc}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <h3 class="title">Recruiter Information</h3>
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Full Name</label>
                            <input
                              class="form-control"
                              type="text"
                              name="Recruiter_name"
                              id="Recruiter_name"
                              value={data.Recruiter_name}
                              onChange={onChangeData}
                              onBlur={validateName}
                              placeholder=""
                            />
                            {errorName && (
                              <div style={mystyle}>{errorName}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Email</label>
                            <input
                              class="form-control"
                              type="email"
                              name="Recruiter_email"
                              id="Recruiter_email"
                              value={data.Recruiter_email}
                              onChange={onChangeData}
                              onBlur={validateEmail}
                              placeholder=""
                            />

                            {errorEmail && (
                              <div style={mystyle}>{errorEmail}</div>
                            )}
                          </div>
                        </div>
                      
                      </div> */}
                    </form>
                    <div class="col-lg-12 button">
                      <button class="btn" onClick={submitForm}>
                        Update Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return { employee: state.employee, candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestEmpLogin, requestFormField, requestEditJob, requestJobDetails },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditJob);
