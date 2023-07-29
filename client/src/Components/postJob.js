import Footer from "./footer";
import Header from "./header";
import React, { useEffect, useState } from "react";
import ManageAccount from "../Employee/manageAccount";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestEmpLogin,
  requestFormField,
  requestAddJob,
} from "../Redux/actions";
import WOW from "wowjs";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { Country, State, City } from "country-state-city";
import Select from "react-select";


function PostJob(props) {

  useEffect(() => {
    new WOW.WOW().init();
    localStorage.removeItem("link");
    // localStorage.removeItem("link1")
  }, []);

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  const [cityId, setCityId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [data, setData] = useState({});
  const [selectedskill, setselectedskill] = useState([]);
  const [selectedtag, setselectedtag] = useState([]);
  const [SalaryPeriod, setSalaryPeriod] = useState([]);
  const [career_levels, setcareer_levels] = useState([]);
  const [categories, setcategories] = useState([]);
  const [currencies, setcurrencies] = useState([]);
  const [degree_levels, setdegree_levels] = useState([]);
  // const [functional_areas, setfunctional_areas] = useState([]);
  const [expiry_date, setexpiry_date] = useState([]);
  const [skills, setskills] = useState([]);
  const [tags, settags] = useState([]);
  const [types, settypes] = useState([]);
  const [functional_area, setfunctional_area] = useState([]);
  const [errorstate, seterrorstate] = useState("");
  const [errorcity, seterrorcity] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);


  const [errorTitle, seterrorTitle] = useState("");
  const [errorType, seterrorType] = useState("");
  const [errorCategory, seterrorCategory] = useState("");
  const [errorGender, seterrorGender] = useState("");
  const [errorExpiry, seterrorExpiry] = useState("");
  const [errorFrom, seterrorFrom] = useState("");
  const [errorTo, seterrorTo] = useState("");
  // const [errorCurrency, seterrorCurrency] = useState("");
  const [errorRemote, seterrorRemote] = useState("");
  const [errorCareer, seterrorCareer] = useState("");
  const [errorDesired, seterrorDesired] = useState("");
  const [errorDegree, seterrorDegree] = useState("");
  const [errorFunctional, seterrorFunctional] = useState("");
  // const [errorPosition, seterrorPosition] = useState("");
  const [errorDesc, seterrorDesc] = useState("");

  const [errorName, seterrorName] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorVacancy, seterrorVacancy] = useState("");
  const [error, setError] = useState(false);
  const [errorPincode, seterrorPincode] = useState("");

  const navigate = useNavigate();
  const [emp, setEmp] = useState({});
  const [empProfile, setEmpProfile] = useState({});

  // const options = [];
  // const today = new Date();
  // for (let i = 1; i < 16; i++) {
  //   const nextDay = new Date();
  //   nextDay.setDate(today.getDate() + i);
  //   const formattedDate = nextDay.toISOString().split("T")[0];
  //   options.push(
  //     <option key={i} value={formattedDate}>
  //       {formattedDate}
  //     </option>
  //   );
  // }

  // useEffect(() => {
  //   console.log(selectedState);
  //   console.log(selectedCity);
  // }, [selectedState, selectedCity]);

  const statesOfIndia = State.getStatesOfCountry("IN");

  const selectStyles = {
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // Set a high z-index value
    }),
  };


  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    // console.log(props);
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
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
    let empData = props.employee.empData;
    if (empData !== undefined) {
      if (empData?.data?.status == "success") {
        setEmpProfile(empData.data.data);
      }
    }
  }, [props.employee.empData])

  useEffect(() => {
    let formfieldData = props.employee.formfieldData;
    // console.log(formfieldData);
    if (formfieldData !== undefined) {
      if (formfieldData?.data?.status == "success") {
        setcategories(formfieldData.data.data.categories[0].category);
        setfunctional_area(formfieldData.data.data.categories[2].educationOptions);
        setfunctional_area(formfieldData.data.data.categories[2].educationOptions);
        setdegree_levels(formfieldData.data.data.categories[1].educationLevel);
        setexpiry_date(formfieldData.data.data.categories[4].expiry_date);

        // setSalaryPeriod(formfieldData.data.data.SalaryPeriod);
        // setcareer_levels(formfieldData.data.data.career_levels);
        // seteducation(formfieldData.data.data.categories[1].educationLevel);
        // setnotice_period(formfieldData.data.data.categories[3].notice_period);
        // setcurrencies(formfieldData.data.data.currencies);
        // setfunctional_areas(formfieldData.data.data.functional_areas);
        // setskills(formfieldData.data.data.skills);
        // settags(formfieldData.data.data.tags);
        // settypes(formfieldData.data.data.types);
        // setposition(formfieldData.data.data.position);
      }
    }
  }, [props.employee.formfieldData]);

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


  function validateTitle() {
    let formIsValid = false;
    if (!data["title"]) {
      // formIsValid = false;
      seterrorTitle("*Enter job title.");
    } else if (typeof data["title"] === "undefined") {
      // formIsValid = false;
      seterrorTitle("*Enter job title.");
    } else {
      formIsValid = true;
      seterrorTitle("");
    }
    return formIsValid;
  }
  function validateremote() {
    let formIsValid = false;
    if (!data["remote"]) {
      formIsValid = false;
      seterrorRemote("*Select option.");
    } else if (typeof data["remote"] === "undefined") {
      formIsValid = false;
      seterrorRemote("*Select option.");
    } else {
      formIsValid = true;
      seterrorRemote("");
    }
    return formIsValid;
  }
  function validateState() {
    let formIsValid = false;
    if (!selectedState) {
      seterrorstate("*Enter your State.");
      formIsValid = false;
    } else if (typeof stateId === "undefined") {
      formIsValid = false;
      seterrorstate("*Select your State.");
    } else if (stateId === "0") {
      seterrorstate("*Enter your State.");
      formIsValid = false;
    } else {
      seterrorstate("");
      formIsValid = true;
    }
    return formIsValid;
  }
  function validateCity() {
    let formIsValid = false;
    if (!selectedCity) {
      seterrorcity("*Enter your City.");
      formIsValid = false;
    } else if (typeof cityId === "undefined") {
      formIsValid = false;
      seterrorcity("*Select your City.");
    } else if (cityId === "0") {
      seterrorcity("*Enter your City.");
      formIsValid = false;
    } else {
      seterrorcity("");
      formIsValid = true;
    }
    return formIsValid;
  }
  // function validateType() {
  //   let formIsValid = false;
  //   if (data["type"] === "0") {
  //     formIsValid = false;
  //     seterrorType("*Select job type.");
  //   } else if (typeof data["type"] === "undefined") {
  //     formIsValid = false;
  //     seterrorType("*Select job type.");
  //   } else {
  //     formIsValid = true;
  //     seterrorType("");
  //   }
  //   return formIsValid;
  // }
  // function validateCategory() {
  //   let formIsValid = false;
  //   if (data["category"] === "0") {
  //     formIsValid = false;
  //     seterrorCategory("*Select job category.");
  //   } else if (typeof data["category"] === "undefined") {
  //     formIsValid = false;
  //     seterrorCategory("*Select job category.");
  //   } else {
  //     formIsValid = true;
  //     seterrorCategory("");
  //   }
  //   return formIsValid;
  // }
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
  // function validateExpiry() {
  //   let formIsValid = false;
  //   var Today = new Date();
  //   if (typeof data["expiry_date"] !== "undefined") {
  //     if (new Date(data["expiry_date"]).getTime() <= Today.getTime()) {
  //       formIsValid = false;
  //       seterrorExpiry("*Please select proper date.");
  //     } else {
  //       formIsValid = true;
  //       seterrorExpiry("");
  //     }
  //   } else {
  //     formIsValid = true;
  //     seterrorExpiry("");
  //   }
  //   return formIsValid;
  // }
  function validateFrom() {
    let formIsValid = false;
    // if (data["salary_from"] === undefined) {
    //   formIsValid = false;
    //   seterrorFrom("*Enter minimum salary.");
    // } else 
    if (data["salary_from"] <= 0) {
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
    // if (data["salary_to"] === undefined) {
    //   formIsValid = false;
    //   seterrorTo("*Enter maximum salary.");
    // } else
    if (data["salary_to"] <= data["salary_from"]) {
      formIsValid = false;
      seterrorTo("*Maximum salary shold be more than Minimum salary.");
    } else {
      formIsValid = true;
      seterrorTo("");
    }
    return formIsValid;
  }
  // function validateCurrency() {
  //   let formIsValid = false;
  //   if (data["currency"] === "0") {
  //     formIsValid = false;
  //     seterrorCurrency("*Select salary currency.");
  //   } else if (typeof data["currency"] === "undefined") {
  //     formIsValid = false;
  //     seterrorCurrency("*Select salary currency.");
  //   } else {
  //     formIsValid = true;
  //     seterrorCurrency("");
  //   }
  //   return formIsValid;
  // }
  // function validatePeriod() {
  //   let formIsValid = false;
  //   if (data["salary_period"] === "0") {
  //     formIsValid = false;
  //     seterrorPeriod("*Select salary period.");
  //   } else if (typeof data["salary_period"] === "undefined") {
  //     formIsValid = false;
  //     seterrorPeriod("*Select salary period.");
  //   } else {
  //     formIsValid = true;
  //     seterrorPeriod("");
  //   }
  //   return formIsValid;
  // }
  // function validateCareer() {
  //   let formIsValid = false;
  //   if (data["career_level"] === "0") {
  //     formIsValid = false;
  //     seterrorCareer("*Select career level.");
  //   } else if (typeof data["career_level"] === "undefined") {
  //     formIsValid = false;
  //     seterrorCareer("*Select career level.");
  //   } else {
  //     formIsValid = true;
  //     seterrorCareer("");
  //   }
  //   return formIsValid;
  // }
  // function validateShift() {
  //   let formIsValid = false;
  //   if (data["shift"] === "0" ) {
  //     formIsValid = false;
  //     seterrorShift("*Select job shift.");
  //   } else
  //    if (typeof data["shift"] === "undefined") {
  //     formIsValid = false;
  //     seterrorShift("*Select job shift.");
  //   } else {
  //     formIsValid = true;
  //     seterrorShift("");
  //   }
  //   return formIsValid;
  // }
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
  //   if (data["position"] === "0") {
  //     formIsValid = false;
  //     seterrorPosition("*Select job position.");
  //   } else if (typeof data["position"] === "undefined") {
  //     formIsValid = false;
  //     seterrorPosition("*Select job position.");
  //   } else {
  //     formIsValid = true;
  //     seterrorPosition("");
  //   }
  //   return formIsValid;
  // }
  function validateDesired() {
    let formIsValid = false;
    if (!data["desired_description"]) {
      formIsValid = false;
      seterrorDesired("*Enter Desired job description.");
    } else if (typeof data["desired_description"] === "undefined") {
      formIsValid = false;
      seterrorDesired("*Enter Desired job description.");
    } else {
      formIsValid = true;
      seterrorDesired("");
    }
    return formIsValid;
  }
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
  // function validateName() {
  //   let formIsValid = false;
  //   if (!data["Recruiter_name"]) {
  //     formIsValid = false;
  //     seterrorName("*Enter recruiter name.");
  //   } else if (typeof data["Recruiter_name"] !== "undefined") {
  //     if (!data["Recruiter_name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
  //       formIsValid = false;
  //       seterrorName("*Please enter Alphabet characters only.");
  //     } else {
  //       formIsValid = true;
  //       seterrorName("");
  //     }
  //   }
  //   return formIsValid;
  // }
  // function validateEmail() {
  //   let formIsValid = false;
  //   if (!data["Recruiter_email"]) {
  //     formIsValid = false;
  //     seterrorEmail("*Enter recruiter E-mail ID.");
  //   } else if (typeof data["Recruiter_email"] !== "undefined") {
  //     if (
  //       !data["Recruiter_email"].match(
  //         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  //       )
  //     ) {
  //       formIsValid = false;
  //       seterrorEmail("*Please enter valid E-mail ID.");
  //     } else {
  //       formIsValid = true;
  //       seterrorEmail("");
  //     }
  //   }
  //   return formIsValid;
  // }
  function validatepincode() {
    let formIsValid = false;
    if (data["vacancy"] === undefined) {
      formIsValid = false;
      seterrorPincode("*Enter pincode.");
    } else if (data["vacancy"] <= 0) {
      formIsValid = false;
      seterrorPincode("*pincode shold be more than 0.");
    } else {
      formIsValid = true;
      seterrorPincode("");
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
    let Degree = validateDegree();
    let Functional = validateFunctional();
    // let Category = validateCategory();
    let Gender = validateGender();
    let Desired = validateDesired();
    let From = validateFrom();
    let To = validateTo();
    let Desc = validateDesc();
    let Vacancy = validateVacancy();
    let state = validateState();
    let city = validateCity();
    let pincode = validatepincode();
    let remote = validateremote()

    // let Type = validateType();

    // let Expiry = validateExpiry();



    // let Currency = validateCurrency();
    // let Period = validatePeriod();
    // let Career = validateCareer();
    // let Shift = validateShift();


    // let Position = validatePosition();

    // let Name = validateName();
    // let Email = validateEmail();




    let valid =
      Title &&
      remote &&
      // Category &&
      Gender &&
      Degree &&
      Functional &&
      Desired &&
      From &&
      To &&
      Desc &&
      Vacancy &&
      state &&
      city &&
      pincode;
    // Expiry &&
    // Currency &&
    // Period &&
    // Career &&
    // Shift &&

    // Position &&
    // Name &&
    // Email &&

    return valid;
  }

  function submitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      if (empProfile.authorized_person) {
        props.requestAddJob({
          token: emp.token,
          data: {
            company_name: emp.name,
            company_id: emp.id,
            title: data.title,
            category:empProfile.industry,
            gender: data.gender,
            expiry_date: data.expiry_date,
            salary_from: data.salary_from,
            salary_to: data.salary_to,
            desired_description: data.desired_description,
            pincode: data.pincode,
            remote: data.remote,
            career_level: data.career_level,
            experience: data.experience,
            description: data.description,
            degree_level: data.degree_level,
            functional_area: data.functional_area,
            vacancy: data.vacancy,
            state: selectedState,
            city: selectedCity,
            // status: "pending"
          
            // position: data.position,
            
            // shift: data.shift,
            // tag: data.tag,
            // Recruiter_name: data.Recruiter_name,
            // Recruiter_email: data.Recruiter_email,
            // salary_period: data.salary_period,

          }, 
        });
        setError(false)
      } else {
        localStorage.setItem("link1", "/postJob");
        Swal.fire("Error!", `Please complete your profile.`, "error");
        navigate("/empProfile");
      }
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
      } else if (errorType) {
        document.getElementById("type").focus();
      } else if (errorCategory) {
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
      //  else if (errorCurrency) {
      //   document.getElementById("currency").focus();
      // }
      else if (errorDesired) {
        document.getElementById("desired_description").focus();
      }
      else if (errorCareer) {
        document.getElementById("career_level").focus();
      }
      else if (errorPincode) {
        document.getElementById("pincode").focus();
      }
      else if (errorRemote) {
        document.getElementById("remote").focus();
      }
      else if (errorDegree) {
        document.getElementById("degree_level").focus();
      } else if (errorFunctional) {
        document.getElementById("functional_area").focus();
      } else if (errorDesc) {
        document.getElementById("description").focus();
      } else if (errorName) {
        document.getElementById("Recruiter_name").focus();
      } else if (errorEmail) {
        document.getElementById("Recruiter_email").focus();
      } else if (errorstate) {
        document.getElementById("state").focus();
      } else if (errorcity) {
        document.getElementById("city").focus();
      }
      setError(false)
    }
  }, [error]);


  useEffect(() => {
    let empAddJobData = props.employee.empAddJobData;
    // console.log(empAddJobData)
    if (empAddJobData !== undefined) {
      if (empAddJobData?.data?.status == "success") {
        Swal.fire("Good job!", "Job added successfully.", "success");
        props.employee.empAddJobData = undefined;
        navigate("/manageJobs");
      } else {
        Swal.fire("Error!", `Something went wrong while posting job.`, "error");
        props.employee.empAddJobData = undefined;
      }
    }
  }, [props.employee.empAddJobData]);
  return (
    <>
      <Header />
      <Breadcrumbs title="Post Job" />
      <div class="manage-jobs section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="PostJob" />

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
                              onBlur={validateTitle}
                              onChange={onChangeData}
                              placeholder="Enter Job Title"
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
                              placeholder="Enter Job Vacancy"
                            />
                            {errorVacancy && (
                              <div style={mystyle}>{errorVacancy}</div>
                            )}
                          </div>
                        </div>
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Industry Category*</label>
                            <select
                              class="select"
                              name="category"
                              id="category"
                              value={data.category}
                              onBlur={validateCategory}
                              onChange={onChangeData}
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
                        </div> */}

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
                            <label>Salary From(per annum)</label>
                            <input
                              class="form-control"
                              type="number"
                              name="salary_from"
                              id="salary_from"
                              value={data.salary_from}
                              onBlur={validateFrom}
                              onChange={onChangeData}
                              placeholder="Enter Salary in lakhs"
                            />
                            {errorFrom && (
                              <div style={mystyle}>{errorFrom}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Salary To(per annum)</label>
                            <input
                              class="form-control"
                              type="number"
                              name="salary_to"
                              id="salary_to"
                              value={data.salary_to}
                              onBlur={validateTo}
                              onChange={onChangeData}
                              placeholder="Enter Salary in lakhs"
                            />
                            {errorTo && <div style={mystyle}>{errorTo}</div>}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Remote Option*</label>
                            <select
                              class="select"
                              name="remote"
                              id="remote"
                              value={data.remote}
                              onBlur={validateremote}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Remote Option</option>
                              <option value="yes">Yes</option>
                              <option value="No">No</option>

                            </select>
                            {errorRemote && (
                              <div style={mystyle}>{errorRemote}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Expiry Date*</label>
                            <select
                              class="select"
                              name="expiry_date"
                              id="expiry_date"
                              value={data.expiry_date}
                              onChange={onChangeData}
                            // onBlur={validateExpiry}
                            >
                              <option value="">Select a day</option>
                              {expiry_date.map((option) => (
                                <option value={option.day}>
                                  {option.day}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Educational Qualification*</label>
                            <select
                              class="select"
                              name="degree_level"
                              id="degree_level"
                              value={data.degree_level}
                              onBlur={validateDegree}
                              onChange={onChangeData}
                            >
                              <option value="0">Select Qualification</option>
                              {degree_levels.map((option) => (
                                <option value={option.option}>
                                  {option.option}
                                </option>
                              ))}
                            </select>
                            {errorDegree && (
                              <div style={mystyle}>{errorDegree}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Course</label>
                            <select
                              class="select"
                              name="functional_area"
                              id="functional_area"
                              value={data.functional_area}
                              onBlur={validateFunctional}
                              onChange={onChangeData}
                            >
                              <option value="0">
                                Select Course
                              </option>
                              {functional_area.map((option) => {
                                // Filter options based on the currently selected educationLevel
                                if (option.name === data.degree_level) {
                                  return (
                                    <option key={option.id} value={option.course}>
                                      {option.course}
                                    </option>
                                  );
                                }
                                return null;
                              })}
                            </select>
                            {errorFunctional && (
                              <div style={mystyle}>{errorFunctional}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Experience*</label>
                            <input
                              class="form-control"
                              type="number"
                              name="experience"
                              min="0"
                              value={data.experience}
                              onChange={onChangeData}
                              placeholder="Enter Experience"
                            />
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="form-group">
                            <label>Desired Skills Set</label>
                            <input
                              class="form-control"
                              type="text"
                              name="desired_description"
                              id="desired_description"
                              value={data.desired_description}
                              onChange={onChangeData}
                              onBlur={validateDesired}
                              placeholder="Please Enter Desired Skill/Technologies/Expertize which the candidate should possess Ex. Java, HTML , B2B sales Recruitment "
                            ></input>
                            {errorDesired && (
                              <div style={mystyle}>{errorDesired}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="form-group">
                            <label>Job Description*</label>
                            <textarea
                              class="form-control"
                              rows="3"
                              name="description"
                              id="description"
                              value={data.description}
                              onChange={onChangeData}
                              onBlur={validateDesc}
                              placeholder="Enter Job Description"
                            ></textarea>
                            {errorDesc && (
                              <div style={mystyle}>{errorDesc}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <h4>Location*</h4>
                      <div class="form-group">
                        <label for="state" class="label">
                          State
                        </label>
                        <div class="position-relative">
                          {/* <select
                        class="select form-control"
                        value={stateId}
                        name="state"
                        id="state"
                        onBlur={validateState}
                        onChange={onChangeState}
                      >
                        <option value="0">Select Your State</option>
                        {states.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select> */}
                          <Select
                            placeholder="Select State"
                            options={statesOfIndia}
                            getOptionLabel={(options) => {
                              return options["name"];
                            }}
                            getOptionValue={(options) => {
                              return options["name"];
                            }}
                            value={selectedState}
                            onChange={(item) => {
                              setSelectedState(item);
                              setSelectedCity(null);
                            }}
                            styles={selectStyles}
                            menuPortalTarget={document.body}
                            id="state"
                            onBlur={validateState}
                          />
                        </div>
                        {errorstate && <div style={mystyle}>{errorstate}</div>}
                      </div>
                      <div class="form-group">
                        <label for="city" class="label">
                          City
                        </label>
                        <div class="position-relative">
                          {/* <select
                        class="select form-control"
                        value={cityId}
                        name="city"
                        id="city"
                        onBlur={validateCity}
                        onChange={onChangeCity}
                      >
                        <option value="0">Select Your City</option>
                        {cities.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select> */}
                          <Select
                            placeholder="Select City"
                            options={City.getCitiesOfState(
                              selectedState?.countryCode,
                              selectedState?.isoCode
                            )}
                            getOptionLabel={(options) => {
                              return options["name"];
                            }}
                            getOptionValue={(options) => {
                              return options["name"];
                            }}
                            value={selectedCity}
                            onChange={(item) => {
                              setSelectedCity(item);
                            }}
                            styles={selectStyles}
                            menuPortalTarget={document.body}
                            id="city"
                            onBlur={validateCity}
                          />
                        </div>
                        {errorcity && <div style={mystyle}>{errorcity}</div>}
                      </div>

                      {/* <h3 class="title">Recruiter Information</h3>
                      <div class="row"> */}
                      <div class="col-lg-6 col-md-6">
                        <div class="form-group">
                          <label>PinCode*</label>
                          <input
                            class="form-control"
                            type="text"
                            name="pincode"
                            id="pincode"
                            value={data.pincode}
                            onChange={onChangeData}
                            onBlur={validatepincode}
                            placeholder="Enter Pincode"
                          />
                          {errorPincode && (
                            <div style={mystyle}>{errorPincode}</div>
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
                        
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Position*</label>
                            <select
                              class="select"
                              name="position"
                              id="position"
                              value={data.position}
                              onBlur={validatePosition}
                              onChange={onChangeData}
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
                        </div> */}

                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Expiry Date*</label>
                            <input
                              class="form-control"
                              type="date"
                              name="expiry_date"
                              id="expiry_date"
                              value={data.expiry_date}
                              onBlur={validateExpiry}
                              onChange={onChangeData}
                              placeholder=""
                            />
                            {errorExpiry && (
                              <div style={mystyle}>{errorExpiry}</div>
                            )}
                          </div>
                        </div> */}
                       
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Currency*</label>
                            <select
                              class="select"
                              name="currency"
                              id="currency"
                              value={data.currency}
                              // onBlur={validateCurrency}
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
                              // onBlur={validatePeriod}
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
                        </div> */}
                       
                        {/* <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Course*</label>
                                <select
                                  class="select"
                                  name="Course"
                                  id="Course"
                                  value={data.Course}
                                  onBlur={validate_course}
                                  onChange={onChangeData}
                                >
                                  <option value="0">
                                    Select Course
                                  </option>
                                  {functional_area.map((option) => {
                                    // Filter options based on the currently selected educationLevel
                                    if (option.name === data.education) {
                                      return (
                                        <option key={option.id} value={option.course}>
                                          {option.course}
                                        </option>
                                      );
                                    }
                                    return null;
                                  })}

                                </select>
                                {course && (
                                  <div style={mystyle}>
                                    {course}
                                  </div>
                                )}
                              </div>
                            </div> */}
                                                {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Skill*</label>
                            <select
                              class="select"
                              style={{ height: "200px" }}
                              name="skill"
                              onChange={onChangeSkill}
                              multiple
                            >
                              {skills.map((option) => (
                                <option value={option.id}>{option.name}</option>
                              ))}
                            </select>
                          </div>
                        </div> */}
                        {/* <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>Tag</label>
                            <select
                              class="select"
                              style={{ height: "200px" }}
                              name="tag"
                              value={data.tag}
                              onChange={onChangeData}
                              multiple
                            >
                              {tags.map((option) => (
                                <option value={option.id}>{option.name}</option>
                              ))}
                            </select>
                          </div>
                        </div> */}
                                             {/* <div class="col-lg-6 col-md-6">
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
                        Post a Job
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
    { requestEmpLogin, requestFormField, requestAddJob },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PostJob);
