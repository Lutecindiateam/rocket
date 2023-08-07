import Footer from "./footer";
import Header from "./header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestLogin,
  requestFormField,
  requestGetCandidate,
  requestCandidateProfile,
  requestCountry,
  requestState,
  requestCity,
} from "../Redux/actions";
import WOW from "wowjs";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { Multiselect } from 'multiselect-react-dropdown';
import { Storage } from 'aws-amplify';
import { Document, Page, pdfjs } from "react-pdf";


function Profile(props) {

  const numbers = Array.from({ length: 51 }, (_, index) => index);

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
  const [countryId, setcountryId] = useState(0);
  const [stateId, setstateId] = useState(0);
  const [cityId, setcityId] = useState(0);

  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [countries, setcountries] = useState([]);

  const [skill, setskill] = useState([]);
  const [education, seteducation] = useState([]);
  const [industry, setindustry] = useState([]);
  const [functional_area, setfunctional_area] = useState([]);
  const [notice_period, setnotice_period] = useState([]);

  const [errorfirst_name, seterrorfirst_name] = useState("");
  const [errorlast_name, seterrorlast_name] = useState("");
  const [errorgender, seterrorgender] = useState("");
  const [errorcountry, seterrorcountry] = useState("");
  const [errorstate, seterrorstate] = useState("");
  const [errorcity, seterrorcity] = useState("");
  const [errorbirth_date, seterrorbirth_date] = useState("");
  const [errormarital_status, seterrormarital_status] = useState("");
  const [errorlanguages, seterrorlanguages] = useState("");
  const [errornationality, seterrornationality] = useState("");
  const [errornational_id_card, seterrornational_id_card] = useState("");
  const [errorexperience, seterrorexperience] = useState("");
  const [errornotice_period, seterrornotice_period] = useState("");
  const [erroreducation, seterroreducation] = useState("");
  const [errorindustry, seterrorindustry] = useState("");
  const [course, setcourse] = useState("");
  const [errorcurrent_salary, seterrorcurrent_salary] = useState("");
  const [errorexpected_salary, seterrorexpected_salary] = useState("");
  const [errorsalary_notice_period, seterrorsalary_notice_period] = useState("");
  // const [errorimmediate_available, seterrorimmediate_available] = useState("");
  const [erroraddress, seterroraddress] = useState("");
  const [errorfacebook_url, seterrorfacebook_url] = useState("");
  const [errortwitter_url, seterrortwitter_url] = useState("");
  const [errorlinkedin_url, seterrorlinkedin_url] = useState("");
  const [errorgoogle_plus_url, seterrorgoogle_plus_url] = useState("");
  const [errorpinterest_url, seterrorpinterest_url] = useState("");
  const [errorprofile_title, seterrorprofile_title] = useState("");
  const [errorprofile_in_brief, seterrorprofile_in_brief] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorphone, seterrorphone] = useState("");
  const [errorcurrent_organization, seterrorcurrent_organization] = useState("");
  const [errorcurrent_ctc, seterrorcurrent_ctc] = useState("");
  const [errorskills, seterrorskills] = useState("");
  const [errorPincode, seterrorPincode] = useState("");
  const [number, setNumber] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});
  const [educations, setEducations] = useState([
    { education: "", course: "" } // Initial education section
  ]);
  const [pdf, setPdf] = useState()
  const [selectedFile, setSelectedFile] = useState()
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

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  const addEducationSection = () => {
    setEducations([...educations, { education: "", course: "" }]);
  };
  const removeEducationSection = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };


  useEffect(() => {
    let loginData = props.candidate.loginData;
    console.log(loginData);
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setEmp(loginData.data.data);
        props.requestGetCandidate({
          id: loginData.data.data.id,
          token: loginData.data.data.token,
        });
        props.requestFormField({
          token: loginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/profile");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/profile");
      navigate("/login");
    }
  }, [props.candidate.loginData]);


  useEffect(() => {
    let getCandidateData = props.candidate.getCandidateData;
    if (getCandidateData !== undefined) {
      if (getCandidateData?.data?.status === "success") {
        setData(getCandidateData.data.data);
        if (getCandidateData.data.data.education) {
          setEducations(getCandidateData.data.data.education);
        }
        const getResume = async () => {
          const s3Key = `candidateResume/${emp.id}`;
          try {
            // List objects in the S3 bucket with the specified s3Key
            const response = await Storage.list(s3Key);
            // If the response is an array and it's not empty, the object exists
            if (response.results.length > 0) {
              // Fetch the object using the get method
              const pdfUrl = await Storage.get(s3Key);
              if (pdfUrl) {
                setPdf(pdfUrl);
              }
            } else {
              // Handle the case when the object is not present in S3
              console.error("PDF object not found in S3.");
            }
          } catch (error) {
            // Handle errors
            console.error("Error fetching the PDF from S3:", error);
          }
        }
        getResume();
        // setSelectedState(getCandidateData.data.data.state);
        // setSelectedCity(getCandidateData.data.data.city)
        // if (getCandidateData.data.data.country) {
        //   setcountryId(getCandidateData.data.data.country);
        //   props.requestState({
        //     id: getCandidateData.data.data.country,
        //   });
        //   if (getCandidateData.data.data.state) {
        //     setstateId(getCandidateData.data.data.state);
        //     props.requestCity({
        //       id: getCandidateData.data.data.state,
        //     });
        //     if (getCandidateData.data.data.city) {
        //       setcityId(getCandidateData.data.data.city);
        //     }
        //   }
        // }

      }
    }
  }, [props.candidate.getCandidateData]);

  useEffect(() => {
    let formfieldData = props.employee.formfieldData;
    // console.log(formfieldData);
    if (formfieldData !== undefined) {
      if (formfieldData?.data?.status === "success") {
        setindustry(formfieldData.data.data.categories[0].category);
        // setskill(formfieldData.data.data.skills);
        seteducation(formfieldData.data.data.categories[1].educationLevel);
        setfunctional_area(formfieldData.data.data.categories[2].educationOptions);
        setnotice_period(formfieldData.data.data.categories[3].notice_period);
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
  const onChangeEducation = (e, index) => {
    const { name, value } = e.target;
    const updatedEducations = [...educations];
    updatedEducations[index][name] = value;
    setEducations(updatedEducations);
  };

  // function onChangeSkill(e) {
  //   selectedskill.push(e.target.value);
  // }

  // useEffect(() => {
  //   props.requestCountry();
  // }, []);

  // useEffect(() => {
  //   let countryData = props.candidate.countryData;
  //   if (countryData !== undefined) {
  //     if (countryData?.data?.status === "success") {
  //       setcountries(countryData.data.data.countries);
  //     }
  //   }
  // }, [props.candidate.countryData]);

  // function onChangeCountry(e) {
  //   setcountryId(e.target.value);
  //   props.requestState({
  //     id: e.target.value,
  //   });
  // }

  // useEffect(() => {
  //   let stateData = props.candidate.stateData;
  //   if (stateData !== undefined) {
  //     if (stateData?.data?.status === "success") {
  //       setstates(stateData.data.data.states);
  //     }
  //   }
  // }, [props.candidate.stateData]);

  // function onChangeState(e) {
  //   setstateId(e.target.value);
  //   props.requestCity({
  //     id: e.target.value,
  //   });
  // }

  // useEffect(() => {
  //   let cityData = props.candidate.cityData;
  //   if (cityData !== undefined) {
  //     if (cityData?.data?.status === "success") {
  //       setcities(cityData.data.data.cities);
  //     }
  //   }
  // }, [props.candidate.cityData]);



  function validatepincode() {
    let formIsValid = false;
    // if (data["vacancy"] === undefined) {
    //   formIsValid = false;
    //   seterrorPincode("*Enter pincode.");
    // } else 
    if (data["vacancy"] <= 0) {
      formIsValid = false;
      seterrorPincode("*pincode shold be more than 0.");
    } else {
      formIsValid = true;
      seterrorPincode("");
    }
    return formIsValid;
  }

  function validatefirst_name() {
    let formIsValid = false;
    if (!data["first_name"]) {
      formIsValid = false;
      seterrorfirst_name("*Enter your first name.");
    } else if (typeof data["first_name"] === "undefined") {
      formIsValid = false;
      seterrorfirst_name("*Enter your first name.");
    } else if (!data["first_name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
      formIsValid = false;
      seterrorfirst_name("*Please enter Alphabet characters only.");
    } else {
      formIsValid = true;
      seterrorfirst_name("");
    }
    return formIsValid;
  }
  function validatelast_name() {
    let formIsValid = false;
    if (!data["last_name"]) {
      formIsValid = false;
      seterrorlast_name("*Enter your last name.");
    } else if (typeof data["last_name"] === "undefined") {
      formIsValid = false;
      seterrorlast_name("*Enter your last name.");
    } else if (!data["last_name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
      formIsValid = false;
      seterrorlast_name("*Please enter Alphabet characters only.");
    } else {
      formIsValid = true;
      seterrorlast_name("");
    }
    return formIsValid;
  }

  function validateCorganization() {
    let formIsValid = false;
    if (!data["current_organization"]) {
      formIsValid = false;
      seterrorcurrent_organization("*Enter your Current Organization.")
    } else {
      formIsValid = true;
      seterrorcurrent_organization("")
    }
    return formIsValid;
  }

  function validateCctc() {
    let formIsValid = false;
    if (!data.current_ctc) {
      seterrorcurrent_ctc("*Enter your Current CTC.");
      formIsValid = false;
    } else if (typeof current_ctc === "undefined") {
      formIsValid = false;
      seterrorcurrent_ctc("*Select your Current CTC.");
    }
    else {
      seterrorcurrent_ctc("");
      formIsValid = true;
    }
    return formIsValid;
  }

  function validatePtitle() {
    let formIsValid = false;
    if (!data["profile_title"]) {
      formIsValid = false;
      seterrorprofile_title("*Enter your profile title.");
    }
    else {
      formIsValid = true;
      seterrorprofile_title("");
    }
    return formIsValid;
  }

  function validateskills() {
    let formIsValid = false;
    if (!data["skills"]) {
      formIsValid = false;
      seterrorprofile_title("*Enter your skills.");
    }
    else {
      formIsValid = true;
      seterrorprofile_title("");
    }
    return formIsValid;
  }

  function validategender() {
    let formIsValid = false;
    if (typeof data["gender"] === "undefined") {
      formIsValid = false;
      seterrorgender("*Select your gender.");
    } else {
      formIsValid = true;
      seterrorgender("");
    }
    return formIsValid;
  }
  function validatecountry() {
    let formIsValid = false;
    if (!countryId) {
      formIsValid = false;
      seterrorcountry("*Select your country.");
    } else if (typeof countryId === "undefined") {
      formIsValid = false;
      seterrorcountry("*Select your country.");
    } else if (countryId === "0") {
      formIsValid = false;
      seterrorcountry("*Select your country.");
    } else {
      formIsValid = true;
      seterrorcountry("");
    }
    return formIsValid;
  }
  function validateState() {
    let formIsValid = false;
    if (!selectedState) {
      formIsValid = false;
      seterrorstate("*Select your state.");
    } else if (typeof stateId === "undefined") {
      formIsValid = false;
      seterrorstate("*Select your state.");
    } else if (stateId === "0") {
      formIsValid = false;
      seterrorstate("*Select your state.");
    } else {
      formIsValid = true;
      seterrorstate("");
    }
    return formIsValid;
  }
  function validateCity() {
    let formIsValid = false;
    if (!selectedCity) {
      formIsValid = false;
      seterrorcity("*Select your city.");
    } else if (typeof cityId === "undefined") {
      formIsValid = false;
      seterrorcity("*Select your city.");
    } else if (cityId === "0") {
      formIsValid = false;
      seterrorcity("*Select your city.");
    } else {
      formIsValid = true;
      seterrorcity("");
    }
    return formIsValid;
  }
  function validatebirth_date() {
    let formIsValid = false;
    var Today = new Date();
    if (!data["birth_date"]) {
      formIsValid = false;
      seterrorbirth_date("*Please select birth date.");
    } else if (typeof data["birth_date"] === "undefined") {
      formIsValid = false;
      seterrorbirth_date("*Please select birth date.");
    } else if (new Date(data["birth_date"]).getTime() >= Today.getTime()) {
      formIsValid = false;
      seterrorbirth_date("*Please select proper date.");
    } else {
      formIsValid = true;
      seterrorbirth_date("");
    }
    return formIsValid;
  }
  function validatemarital_status() {
    let formIsValid = false;
    if (typeof data["marital_status"] === "undefined") {
      formIsValid = false;
      seterrormarital_status("*Select your marital status.");
    } else {
      formIsValid = true;
      seterrormarital_status("");
    }
    return formIsValid;
  }

  function validatePbrief() {
    let formIsValid = false;
    if (!data["profile_in_brief"]) {
      formIsValid = false;
      seterrorprofile_in_brief("*Enter your profile in brief.")
    } else {
      formIsValid = true;
      seterrorprofile_in_brief("");
    }
    return formIsValid;
  }
  function validateEmail() {
    let formIsValid = false;
    if (!data["email"]) {
      formIsValid = false;
      seterroremail("*Enter your E-mail ID.");
    } else if (typeof data["email"] !== "undefined") {
      if (
        !data["email"].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        formIsValid = false;
        seterroremail("*Please enter valid E-mail ID.");
      } else {
        formIsValid = true;
        seterroremail("");
      }
    }
    return formIsValid;
  }
  function validatelanguages() {
    let formIsValid = false;
    if (!data["languages"]) {
      formIsValid = false;
      seterrorlanguages("*Enter your known languages.");
    } else if (typeof data["languages"] === "undefined") {
      formIsValid = false;
      seterrorlanguages("*Enter your known languages.");
    } else {
      formIsValid = true;
      seterrorlanguages("");
    }
    return formIsValid;
  }

  function validateexperience() {
    let formIsValid = false;
    if (!data["total_experience"]) {
      formIsValid = false;
      seterrorexperience("*Please enter your experience.");
    } else if (typeof data["total_experience"] === "undefined") {
      formIsValid = false;
      seterrorexperience("*Please enter your experience.");
    } else if (data["total_experience"] < 0) {
      formIsValid = false;
      seterrorexperience("*Please enter positive experience.");
    } else {
      formIsValid = true;
      seterrorexperience("");
    }
    return formIsValid;
  }
  function validatenotice_period() {
    let formIsValid = false;
    if (!data["notice_period"]) {
      formIsValid = false;
      seterrornotice_period("*Please enter your notice period.");
    } else if (typeof data["notice_period"] === "undefined") {
      formIsValid = false;
      seterrornotice_period("*Please enter your notice period.");
    } else {
      formIsValid = true;
      seterrornotice_period("");
    }
    return formIsValid;
  }

  function validate_education() {
    let formIsValid = false;

    if (!educations[0].education) {
      formIsValid = false;
      seterroreducation("*Select your education.");
    } else if (typeof educations[0].education === "undefined") {
      formIsValid = false;
      seterroreducation("*Select your education .");
    } else if (educations[0].education === "0") {
      formIsValid = false;
      seterroreducation("*Select your education.");
    } else {
      formIsValid = true;
      seterroreducation("");
    }
    return formIsValid;
  }
  function validateindustry() {
    let formIsValid = false;
    if (!data["industry"]) {
      formIsValid = false;
      seterrorindustry("*Select your industry.");
    } else if (typeof data["industry"] === "undefined") {
      formIsValid = false;
      seterrorindustry("*Select your industry.");
    } else if (data["industry"] === "0") {
      formIsValid = false;
      seterrorindustry("*Select your industry.");
    } else {
      formIsValid = true;
      seterrorindustry("");
    }
    return formIsValid;
  }
  function validateaddress() {
    let formIsValid = false;
    if (!data["address"]) {
      formIsValid = false;
      seterroraddress("*Enter your address.");
    } else if (typeof data["address"] === "undefined") {
      formIsValid = false;
      seterroraddress("*Enter your address.");
    } else {
      formIsValid = true;
      seterroraddress("");
    }
    return formIsValid;
  }

  // function validatecurrent_salary() {
  //   let formIsValid = false;
  //   if (!data["current_salary"]) {
  //     formIsValid = false;
  //     seterrorcurrent_salary("*Please enter current salary.");
  //   } else if (typeof data["current_salary"] === "undefined") {
  //     formIsValid = false;
  //     seterrorcurrent_salary("*Please enter current salary.");
  //   } else if (data["current_salary"] < 0) {
  //     formIsValid = false;
  //     seterrorcurrent_salary("*Please enter positive current salary.");
  //   } else {
  //     formIsValid = true;
  //     seterrorcurrent_salary("");
  //   }
  //   return formIsValid;
  // }

  // function validateexpected_salary() {
  //   let formIsValid = false;
  //   if (!data["expected_salary"]) {
  //     formIsValid = false;
  //     seterrorexpected_salary("*Please enter expected salary.");
  //   } else if (typeof data["expected_salary"] === "undefined") {
  //     formIsValid = false;
  //     seterrorexpected_salary("*Please enter expected salary.");
  //   } else if (data["expected_salary"] < 0) {
  //     formIsValid = false;
  //     seterrorexpected_salary("*Please enter positive expected salary.");
  //   } else {
  //     formIsValid = true;
  //     seterrorexpected_salary("");
  //   }
  //   return formIsValid;
  // }

  // function validatesalary_currency() {
  //   let formIsValid = false;
  //   if (!data["salary_currency"]) {
  //     formIsValid = false;
  //     seterrorsalary_currency("*Select your salary currency.");
  //   } else if (typeof data["salary_currency"] === "undefined") {
  //     formIsValid = false;
  //     seterrorsalary_currency("*Select your salary currency.");
  //   } else if (data["salary_currency"] === "0") {
  //     formIsValid = false;
  //     seterrorsalary_currency("*Select your salary currency.");
  //   } else {
  //     formIsValid = true;
  //     seterrorsalary_currency("");
  //   }
  //   return formIsValid;
  // }
  // function validateimmediate_available() {
  //   let formIsValid = false;
  //   if (typeof data["immediate_available"] === "undefined") {
  //     formIsValid = false;
  //     seterrorimmediate_available("*Select your availablity.");
  //   } else {
  //     formIsValid = true;
  //     seterrorimmediate_available("");
  //   }
  //   return formIsValid;
  // }

  // function validatenationality() {
  //   let formIsValid = false;
  //   if (!data["nationality"]) {
  //     formIsValid = false;
  //     seterrornationality("*Enter your nationality.");
  //   } else if (typeof data["nationality"] === "undefined") {
  //     formIsValid = false;
  //     seterrornationality("*Enter your nationality.");
  //   } else if (!data["nationality"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
  //     formIsValid = false;
  //     seterrornationality("*Please enter Alphabet characters only.");
  //   } else {
  //     formIsValid = true;
  //     seterrornationality("");
  //   }
  //   return formIsValid;
  // }
  // function validatenational_id_card() {
  //   let formIsValid = false;
  //   if (!data["national_id_card"]) {
  //     formIsValid = false;
  //     seterrornational_id_card("*Enter your national ID card.");
  //   } else if (typeof data["national_id_card"] === "undefined") {
  //     formIsValid = false;
  //     seterrornational_id_card("*Enter your national ID card.");
  //   } else if (!data["national_id_card"].match(/^[0-9\s]*$/)) {
  //     formIsValid = false;
  //     seterrornational_id_card("*Please enter digits only.");
  //   } else {
  //     formIsValid = true;
  //     seterrornational_id_card("");
  //   }
  //   return formIsValid;
  // }
  // function validate_course() {
  //   let formIsValid = false;
  //   if (!data["Course"]) {
  //     formIsValid = false;
  //     seterrorfunctional_area("*Select your functional area.");
  //   } else if (typeof data["Course"] === "undefined") {
  //     formIsValid = false;
  //     seterrorfunctional_area("*Select your functional area.");
  //   } else if (data["Course"] === "0") {
  //     formIsValid = false;
  //     seterrorfunctional_area("*Select your functional area.");
  //   } else {
  //     formIsValid = true;
  //     seterrorfunctional_area("");
  //   }
  //   return formIsValid;
  // }
  function validate_course() {
    let formIsValid = false;
    if (!educations[0].course) {
      formIsValid = false;
      setcourse("*Select your course.");
    } else if (educations[0].course === "0") {
      formIsValid = false;
      setcourse("*Select your coursewwww.");
    } else {
      formIsValid = true;
      setcourse("");
    }
    return formIsValid;
  }

  // function validatefacebook_url() {
  //   let formIsValid = false;
  //   if (!data["facebook_url"]) {
  //     formIsValid = true;
  //     seterrorfacebook_url("");
  //   } else if (typeof data["facebook_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrorfacebook_url("");
  //   } else if (!data["facebook_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrorfacebook_url("*Please enter valid facebook URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrorfacebook_url("");
  //   }
  //   return formIsValid;
  // }
  // function validatetwitter_url() {
  //   let formIsValid = false;
  //   if (!data["twitter_url"]) {
  //     formIsValid = true;
  //     seterrortwitter_url("");
  //   } else if (typeof data["twitter_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrortwitter_url("");
  //   } else if (!data["twitter_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrortwitter_url("*Please enter valid twitter URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrortwitter_url("");
  //   }
  //   return formIsValid;
  // }
  // function validatelinkedin_url() {
  //   let formIsValid = false;
  //   if (!data["linkedin_url"]) {
  //     formIsValid = true;
  //     seterrorlinkedin_url("");
  //   } else if (typeof data["linkedin_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrorlinkedin_url("");
  //   } else if (!data["linkedin_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrorlinkedin_url("*Please enter valid linkedin URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrorlinkedin_url("");
  //   }
  //   return formIsValid;
  // }
  // function validategoogle_plus_url() {
  //   let formIsValid = false;
  //   if (!data["google_plus_url"]) {
  //     formIsValid = true;
  //     seterrorgoogle_plus_url("");
  //   } else if (typeof data["google_plus_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrorgoogle_plus_url("");
  //   } else if (!data["google_plus_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrorgoogle_plus_url("*Please enter valid google plus URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrorgoogle_plus_url("");
  //   }
  //   return formIsValid;
  // }
  // function validatepinterest_url() {
  //   let formIsValid = false;
  //   if (!data["pinterest_url"]) {
  //     formIsValid = true;
  //     seterrorpinterest_url("");
  //   } else if (typeof data["pinterest_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrorpinterest_url("");
  //   } else if (!data["pinterest_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrorpinterest_url("*Please enter valid pinterest URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrorpinterest_url("");
  //   }
  //   return formIsValid;
  // }

  function validatePhone() {
    let formIsValid = false;
    if (!data["phone"]) {
      seterrorphone("*Enter your Contact No.");
      formIsValid = false;
    } else if (data["phone"].length < 6) {
      seterrorphone("*Enter exact 10 digits.");
      formIsValid = false;
    } else {
      seterrorphone("");
      formIsValid = true;
    }
    return formIsValid;
  }

  function validateForm() {
    let first_name = validatefirst_name();
    let last_name = validatelast_name();
    let gender = validategender();
    let state = validateState();
    let city = validateCity();
    let birth_date = validatebirth_date();
    let marital_status = validatemarital_status();
    let pincode = validatepincode();
    let profile_title = validatePtitle()
    let profile_in_brief = validatePbrief()
    let email = validateEmail()
    let phone = validatePhone()
    let current_organization = validateCorganization()
    let Cctc = validateCctc();
    let skills = validateskills();
    let total_experience = validateexperience();
    let notice_period = validatenotice_period();
    let education = validate_education();
    let industry = validateindustry();
    let address = validateaddress();
    let course = validate_course();

    // let languages = validatelanguages();
    // let nationality = validatenationality();
    // let national_id_card = validatenational_id_card();
    // let current_salary = validatecurrent_salary();
    // let expected_salary = validateexpected_salary();
    // let salary_currency = validatesalary_currency();
    // let immediate_available = validateimmediate_available();
    // let facebook_url = validatefacebook_url();
    // let twitter_url = validatetwitter_url();
    // let linkedin_url = validatelinkedin_url();
    // let google_plus_url = validategoogle_plus_url();
    // let pinterest_url = validatepinterest_url();



    let valid =
      first_name &&
      last_name &&
      gender &&
      skills &&
      state &&
      city &&
      birth_date &&
      marital_status &&
      notice_period &&
      pincode &&
      profile_title &&
      profile_in_brief &&
      email &&
      phone &&
      current_organization &&
      Cctc &&
      address &&
      total_experience &&
      education &&
      industry &&
      course
    // nationality &&
    // national_id_card &&
    // current_salary &&
    // expected_salary &&
    // salary_currency &&
    // immediate_available &&
    // languages &&
    // facebook_url &&
    // twitter_url &&
    // linkedin_url &&
    // google_plus_url &&

    // pinterest_url;
    return valid;
  }
  // console.log(data.selectedCity);
  function submitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      if (pdf !== undefined) {
        props.requestCandidateProfile({
          id: emp.id,
          token: emp.token,
          data: {
            given_name: data.first_name,
            family_name: data.last_name,
            gender: data.gender,
            skills: data.skills,
            state: selectedState,
            city: selectedCity,
            birth_date: data.birth_date,
            marital_status: data.marital_status,
            pincode: data.pincode,
            total_experience: data.total_experience,
            education: educations,
            // course: educations,
            industry: data.industry,
            profile_title: data.profile_title,
            profile_in_brief: data.profile_in_brief,
            phone: data.phone,
            current_organization: data.current_organization,
            current_ctc: data.current_ctc,
            languages: data.languages,
            notice_period: data.notice_period,
            address: data.address,
            email: data.email
            // skill: selectedskill,       
            // nationality: data.nationality,
            // national_id_card: data.national_id_card,
            // functional_area: data.functional_area,
            // current_salary: data.current_salary,
            // expected_salary: data.expected_salary,
            // salary_currency: data.salary_currency,
            // immediate_available: data.immediate_available,
            // facebook_url: data.facebook_url,
            // twitter_url: data.twitter_url,
            // linkedin_url: data.linkedin_url,
            // google_plus_url: data.google_plus_url,
            // pinterest_url: data.pinterest_url,

            // Cours: data.Coursess.map(course => course.name)

          },
        });

        setError(false)
      } else {
        Swal.fire("Error!", `Please upload Your Resume.`, "error");
      }
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if (errorfirst_name) {
        document.getElementById("first_name").focus();
      } else if (errorlast_name) {
        document.getElementById("last_name").focus();
      } else if (errorgender) {
        document.getElementById("male").focus();
      } else if (errormarital_status) {
        document.getElementById("married").focus();
      }
      else if (errorskills) {
        document.getElementById("skills").focus();
      }
      else if (errorPincode) {
        document.getElementById("pincode").focus();
      }
      else if (errorbirth_date) {
        document.getElementById("birth_date").focus();
      }
      // else if (errorlanguages) {
      //   document.getElementById("languages").focus();
      // } 
      else if (errorexperience) {
        document.getElementById("experience").focus();
      } else if (erroreducation) {
        document.getElementById("education").focus();
      } else if (errorindustry) {
        document.getElementById("industry").focus();
      }
      else if (errornotice_period) {
        document.getElementById("notice_period").focus();
      }
      // else if (errorcurrent_salary) {
      //   document.getElementById("current_salary").focus();
      // } else if (errorexpected_salary) {
      //   document.getElementById("expected_salary").focus();
      // } else if (errorsalary_currency) {
      //   document.getElementById("salary_currency").focus();
      // }
      // else if (errorcountry) {
      //   document.getElementById("country").focus();
      // }
      else if (errorstate) {
        document.getElementById("state").focus();
      } else if (errorcity) {
        document.getElementById("city").focus();
      }
      else if (erroraddress) {
        document.getElementById("address").focus();
      }
      // else if (errorfacebook_url) {
      //   document.getElementById("facebook_url").focus();
      // } else if (errortwitter_url) {
      //   document.getElementById("twitter_url").focus();
      // } else if (errorlinkedin_url) {
      //   document.getElementById("linkedin_url").focus();
      // } else if (errorgoogle_plus_url) {
      //   document.getElementById("google_plus_url").focus();
      // } else if (errorpinterest_url) {
      //   document.getElementById("pinterest_url").focus();
      // }
      else if (errorprofile_title) {
        document.getElementById("profile_title").focus();
      } else if (erroremail) {
        document.getElementById("email").focus();
      } else if (errorphone) {
        document.getElementById("phone").focus();
      }
      else if (errorcurrent_organization) {
        document.getElementById("current_organization").focus();
      } else if (errorcurrent_ctc) {
        document.getElementById("current_ctc").focus();
      }
      setError(false)
    }
  }, [error]);
  useEffect(() => {
    let candidateprofile = props.candidate.candidateProfileData;
    if (candidateprofile !== undefined) {
      if (candidateprofile?.data?.status == "success") {
        Swal.fire("Good job!", "Profile updated Successfully.", "success");
        props.candidate.candidateProfileData = undefined;
        props.requestGetCandidate({
          id: emp.id,
          token: emp.token,
        });
        if (localStorage.getItem("link1")) {
          navigate(localStorage.getItem("link1"));
        } else {
          navigate("/settings");
        }

      } else {
        Swal.fire("Error!", `Something went wrong while updating profile.`, "error");
        props.candidate.candidateProfileData = undefined;
        props.requestGetCandidate({
          id: emp.id,
          token: emp.token,
        });
      }
    }
  }, [props.candidate.candidateProfileData]);

  async function addResume(e) {
    e.preventDefault();
    if (selectedFile) {
      const s3Key = `candidateResume/${emp.id}`;
      const result = await Storage.put(s3Key, selectedFile, {
        contentType: selectedFile.type,
      });
      if (result) {
        Swal.fire("Good job!", "Your Resume Uploaded Successfully.", "success");
        setPdf(result)
      } else {
        console.log("semething went wrong");
      }
    } else {
      Swal.fire(
        "Error!",
        "Please select png or jpg or jpeg file for profile picture.",
        "error"
      );
    }
  }


  return (
    <>
      <Header />
      <Breadcrumbs title="Profile" />
      <div class="resume section">
        <div class="container">
          <div class="resume-inner">
            <div class="row">
              <ManageAccount name="Settings" />

              <div class="col-lg-8 col-12">
                <div class="inner-content">
                  <div class="job-post ">
                    <div class="row">
                      <div
                        class="job-information"
                        style={{ border: "0px", padding: "0px 10px" }}
                      >
                        <form class="forms-sample" onSubmit={submitForm}>
                          <div class="row">
                            <h3 class="title">Basic Information</h3>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>First Name*</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="first_name"
                                  name="first_name"
                                  value={data.first_name}
                                  onBlur={validatefirst_name}
                                  onChange={onChangeData}
                                  placeholder="Enter First Name"
                                />
                                {errorfirst_name && (
                                  <div style={mystyle}>{errorfirst_name}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Last Name*</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="last_name"
                                  id="last_name"
                                  value={data.last_name}
                                  onBlur={validatelast_name}
                                  onChange={onChangeData}
                                  placeholder="Enter Last Name"
                                />
                                {errorlast_name && (
                                  <div style={mystyle}>{errorlast_name}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-3">
                              <div style={{ color: "black" }}>
                                <label for="gender" class="label">
                                  Gender*
                                </label>

                                <br />
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    style={{ margin: "0px" }}
                                    id="male"
                                    name="gender"
                                    value="1"
                                    onBlur={validategender}
                                    checked={data.gender === 1}
                                    onChange={onChangeData}
                                  />
                                  <label class="form-check-label">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    style={{ margin: "0px" }}
                                    id="female"
                                    name="gender"
                                    value="0"
                                    onBlur={validategender}
                                    checked={data.gender === 0}
                                    onChange={onChangeData}
                                  />
                                  <label class="form-check-label">Female</label>
                                </div>
                                {errorgender && (
                                  <div style={mystyle}>{errorgender}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-3">
                              <div style={{ color: "black" }}>
                                <label for="marital_status" class="label">
                                  Marital Status*
                                </label>

                                <br />
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    style={{ margin: "0px" }}
                                    id="married"
                                    name="marital_status"
                                    value="1"
                                    onBlur={validatemarital_status}
                                    checked={data.marital_status === 1}
                                    onChange={onChangeData}
                                  />
                                  <label class="form-check-label">
                                    Married
                                  </label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    style={{ margin: "0px" }}
                                    id="unmarried"
                                    name="marital_status"
                                    value="0"
                                    onBlur={validatemarital_status}
                                    checked={data.marital_status === 0}
                                    onChange={onChangeData}
                                  />
                                  <label class="form-check-label">
                                    Unmarried
                                  </label>
                                </div>
                                {errormarital_status && (
                                  <div style={mystyle}>
                                    {errormarital_status}
                                  </div>
                                )}
                              </div>
                            </div>


                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>
                                  Date of Birth*
                                </label>
                                <input
                                  class="form-control"
                                  type="date"
                                  name="birth_date"
                                  id="birth_date"
                                  value={data.birth_date}
                                  onBlur={validatebirth_date}
                                  onChange={onChangeData}
                                  placeholder="Enter DOB"
                                />
                                {errorbirth_date && (
                                  <div style={mystyle}>{errorbirth_date}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label for="email" class="label">
                                  E-mail*
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  placeholder="example@gmail.com"
                                  id="email"
                                  name="email"
                                  value={data.email}
                                  onChange={onChangeData}
                                  onBlur={validateEmail}
                                />
                                {erroremail && <div style={mystyle}>{erroremail}</div>}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label for="phone" class="label">
                                  Contact No.*
                                </label>
                                <div class="position-relative">
                                  <input
                                    type="tel"
                                    class="form-control"
                                    id="phone"
                                    placeholder="Enter Contact No."
                                    name="phone"
                                    value={data.phone}
                                    onChange={onChangeData}
                                    onBlur={validatePhone}
                                  />
                                  {errorphone && <div style={mystyle}>{errorphone}</div>}
                                </div>
                              </div>
                            </div>
                            <h3 class="title">Professional Information</h3>
                            {/* <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Skill*</label>
                                <select
                                  class="select"
                                  name="skill"
                                  id="skill"
                                  // value={selectedskill}
                                  onChange={onChangeSkill}
                                  multiple
                                >
                                  {skill.map((option) => (
                                    <option value={option.id}>
                                      {option.name}
                                    </option>
                                  ))}
                                  <option value="javascript">javascript</option>
                                </select>
                              </div> */}
                            {/* <div class="col-lg-6 col-md-6"> */}
                            <div class="form-group">
                              <label>Profile Title*</label>
                              <input
                                class="form-control"
                                type="text"
                                id="profile_title"
                                name="profile_title"
                                value={data.profile_title}
                                onBlur={validatePtitle}
                                onChange={onChangeData}
                                placeholder="e.g.  Sales Manager with 5 years of experience in  B2B sales in Industrial equipment"
                              />
                              {errorprofile_title && (
                                <div style={mystyle}>{errorprofile_title}</div>
                              )}
                            </div>
                            {/* </div> */}
                            {/* <div class="col-lg-6 col-md-6"> */}
                            <div class="form-group">
                              <label for="current_organization" class="label">
                                Current Organization*
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Current Organization"
                                id="current_organization"
                                name="current_organization"
                                value={data.current_organization}
                                onChange={onChangeData}
                                onBlur={validateCorganization}
                              />
                              {errorcurrent_organization && (
                                <div style={mystyle}>{errorcurrent_organization}</div>
                              )}
                            </div>
                            {/* </div> */}


                            <div class="form-group">
                              <label>Profile in brief*</label>
                              <input
                                class="form-control"
                                type="text"
                                name="profile_in_brief"
                                id="profile_in_brief"
                                value={data.profile_in_brief}
                                onBlur={validatePbrief}
                                onChange={onChangeData}
                                placeholder="Enter Profile in brief"
                              />
                              {errorprofile_in_brief && (
                                <div style={mystyle}>{errorprofile_in_brief}</div>
                              )}
                            </div>
                            <h3 class="title">Industry Information</h3>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Industry Category*</label>
                                <select
                                  class="select"
                                  name="industry"
                                  id="industry"
                                  value={data.industry}
                                  onBlur={validateindustry}
                                  onChange={onChangeData}
                                >
                                  <option value="0">Select Industry</option>
                                  {industry.map((option) => {
                                    if (option.disable === "yes") {
                                      return (
                                        <option key={option._id} value="0" style={{ color: "gray" }} disabled>{option.name}</option>
                                      )
                                    } else {
                                      return (
                                        <option key={option._id} value={option._id}>{option.name}</option>
                                      )
                                    }
                                  })}
                                  {/* //   <option value={option.id}>
                                  //     {option.name}
                                  //   </option>
                                  // ))}
                                  // <option value="mechanical">mechanical </option>
                                  // <option value="civil">civil </option>
                                  // <option value="bsc">bsc </option> */}
                                </select>

                                {errorindustry && (
                                  <div style={mystyle}>{errorindustry}</div>
                                )}
                              </div>

                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Skills*</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="skills"
                                  name="skills"
                                  value={data.skills}
                                  onBlur={validateskills}
                                  onChange={onChangeData}
                                  placeholder="Enter Your Skills"
                                />
                                {errorskills && (
                                  <div style={mystyle}>{errorskills}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Total Experience*(In Years)</label>
                                <input
                                  class="form-control"
                                  type="number"
                                  name="total_experience"
                                  id="total_experience"
                                  value={data.total_experience}
                                  onBlur={validateexperience}
                                  onChange={onChangeData}
                                  placeholder="Enter Experience"
                                />
                                {errorexperience && (
                                  <div style={mystyle}>{errorexperience}</div>
                                )}
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label for="Current CTC" class="label">
                                  Current CTC*(in Lakhs per annum)
                                </label>
                                <div class="position-relative">
                                  <select
                                    class="select form-control"
                                    value={data.current_ctc}
                                    name="current_ctc"
                                    id="current_ctc"
                                    onBlur={validateCctc}
                                    onChange={onChangeData}
                                  >
                                    <option value="0">Current CTC</option>
                                    {numbers.map((number) => (
                                      <option value={number}>{number}</option>
                                    ))}
                                  </select>
                                </div>
                                {errorcurrent_ctc && <div style={mystyle}>{errorcurrent_ctc}</div>}
                              </div>
                            </div>




                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Notice Period*</label>
                                <select
                                  class="select"
                                  name="notice_period"
                                  id="notice_period"
                                  value={data.notice_period}
                                  onBlur={validatenotice_period}
                                  onChange={onChangeData}
                                >
                                  <option value="0">Select Notice Period</option>
                                  {notice_period.map((option, index) => (
                                    <option value={option.day}>
                                      {index === 0 ? option.day : option.day + " Days"}
                                    </option>
                                  ))}
                                </select>
                                {errornotice_period && (
                                  <div style={mystyle}>{errornotice_period}</div>
                                )}

                              </div>
                            </div>
                            <div >
                              {educations.map((educationData, index) => (
                                <div key={index}>
                                  <h3 class="title"> Qualification Details
                                    &nbsp;
                                    <button type="button" onClick={addEducationSection}>
                                      +
                                    </button>
                                    &nbsp;
                                    {index > 0 &&
                                      <button type="button" onClick={() => removeEducationSection(index)}>
                                        -
                                      </button>
                                    }
                                  </h3>
                                  <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                      <div class="form-group">
                                        <label>Education*</label>
                                        <select
                                          class="select"
                                          name="education"
                                          id="education"
                                          value={educationData.education}
                                          onBlur={validate_education}
                                          onChange={(e) => onChangeEducation(e, index)}
                                        >
                                          <option value="0">Select Education</option>
                                          {education.map((option) => (
                                            <option value={option.option}>
                                              {option.option}
                                            </option>
                                          ))}

                                        </select>
                                        {erroreducation && (
                                          <div style={mystyle}>{erroreducation}</div>
                                        )}
                                      </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                      <div class="form-group">
                                        <label>Course*</label>
                                        <select
                                          class="select"
                                          name="course"
                                          id="course"
                                          value={educationData.course}
                                          onBlur={validate_course}
                                          onChange={(e) => onChangeEducation(e, index)}
                                        >
                                          <option value="0">
                                            Select Course
                                          </option>
                                          {functional_area.map((option) => {
                                            // Filter options based on the currently selected educationLevel  
                                            if (option.name === educationData.education) {
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
                                    </div>
                                  </div>

                                </div>
                              ))}

                            </div>


                            <h3 class="title">Address Information</h3>
                            <div class="form-group">
                              <label>Address*</label>
                              <input
                                class="form-control"
                                type="text"
                                name="address"
                                id="address"
                                value={data.address}
                                onBlur={validateaddress}
                                onChange={onChangeData}
                                placeholder="Enter Your Address"
                              />
                              {erroraddress && (
                                <div style={mystyle}>{erroraddress}</div>
                              )}
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label for="state" class="label">
                                  State
                                </label>
                                <div class="position-relative">
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
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label for="city" class="label">
                                  City
                                </label>
                                <div class="position-relative">
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
                            </div>
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
                                  placeholder="Enter Your Pincode"
                                />
                                {errorPincode && (
                                  <div style={mystyle}>{errorPincode}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            {pdf ? (
                              <>
                                <text style={{color: "green" }}>Your Resume Uploaded.</text>
                                <Link to="/resume">
                                  <button
                                    type="submit"
                                    class="btn btn-primary me-2"
                                    style={{ color: "white" }}
                                  >
                                    View Resume
                                  </button>
                                </Link>

                                <br />
                              </>
                            ) : (
                              <>
                                <h6>Upload Your Resume.</h6>
                                <input type="file" accept=".pdf,.doc,.docx" onChange={onSelectFile} />

                                <button
                                  type="submit"
                                  onClick={addResume}
                                  class="btn btn-primary me-2"
                                  style={{ color: "white" }}
                                >
                                  Add Rresume
                                </button>
                              </>
                            )}
                          </div>

                          {/* <div class="col-lg-4 col-md-4">
                              <div style={{ color: "black" }}>
                                <label for="immediate_available" class="label">
                                  Immediate available
                                </label>

                                <br />
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    style={{ margin: "0px" }}
                                    id="yes"
                                    name="immediate_available"
                                    value="1"
                                    onBlur={validateimmediate_available}
                                    checked={data.immediate_available === 1}
                                    onChange={onChangeData}
                                  />
                                  <label class="form-check-label">Yes</label>
                                </div> */}
                          {/* <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    style={{ margin: "0px" }}
                                    id="no"
                                    name="immediate_available"
                                    value="0"
                                    onBlur={validateimmediate_available}
                                    checked={data.immediate_available === 0}
                                    onChange={onChangeData}
                                  />
                                  <label class="form-check-label">No</label>
                                </div>
                                {errorimmediate_available && (
                                  <div style={mystyle}>
                                    {errorimmediate_available}
                                  </div>
                                )}
                              </div>
                            </div> */}

                          {/* 
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Salary Currency</label>
                                <select
                                  class="select"
                                  name="salary_currency"
                                  id="salary_currency"
                                  value={data.salary_currency}
                                  onBlur={validatesalary_currency}
                                  onChange={onChangeData}
                                >
                                  <option value="0">Select Industry</option>
                                  {currency.map((option) => (
                                    <option value={option.id}>
                                      {option.currency_name}
                                    </option>
                                  ))}
                                  <option value="indian RS">Indian RS</option>

                                </select>
                                {errorsalary_currency && (
                                  <div style={mystyle}>
                                    {errorsalary_currency}
                                  </div>
                                )}
                              </div>
                            </div> */}
                          {/* <Multiselect 
                             options={industry}
                             displayValue="name"
                             name="Courses"
                             id="Courses"
                             value={data.name}
                             onSelect={onChangeData}
                             onRemove={onChangeData}
                            /> */}
                          {/* <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Current Salary</label>
                                <input
                                  class="form-control"
                                  type="number"
                                  name="current_salary"
                                  id="current_salary"
                                  value={data.current_salary}
                                  onBlur={validatecurrent_salary}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorcurrent_salary && (
                                  <div style={mystyle}>
                                    {errorcurrent_salary}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Expected Salary</label>
                                <input
                                  class="form-control"
                                  type="number"
                                  name="expected_salary"
                                  id="expected_salary"
                                  value={data.expected_salary}
                                  onBlur={validateexpected_salary}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorexpected_salary && (
                                  <div style={mystyle}>
                                    {errorexpected_salary}
                                  </div>
                                )}
                              </div>
                            </div> */}


                          {/* 
                            <div class="form-group">
                              <label>Languages</label>
                              <input
                                class="form-control"
                                type="text"
                                name="languages"
                                id="languages"
                                value={data.languages}
                                onBlur={validatelanguages}
                                onChange={onChangeData}
                                placeholder=""
                              />
                              {errorlanguages && (
                                <div style={mystyle}>{errorlanguages}</div>
                              )}
                            </div>

                             <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Naionality</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="nationality"
                                  id="nationality"
                                  value={data.nationality}
                                  onBlur={validatenationality}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errornationality && (
                                  <div style={mystyle}>{errornationality}</div>
                                )}
                              </div>
                            </div> */}
                          {/* <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>National ID Card</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="national_id_card"
                                  id="national_id_card"
                                  value={data.national_id_card}
                                  onBlur={validatenational_id_card}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errornational_id_card && (
                                  <div style={mystyle}>
                                    {errornational_id_card}
                                  </div>
                                )}
                              </div>
                            </div> */}


                          {/* <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Country</label>
                                <select
                                  class="select"
                                  name="country"
                                  id="country"
                                  value={countryId}
                                  onBlur={validatecountry}
                                  onChange={onChangeCountry}
                                >
                                  <option value="0">Select Country</option>
                                  {countries.map((option) => (
                                    <option value={option.id}>
                                      {option.name}
                                    </option>
                                  ))}
                                  <option value="indian RS">Indian RS</option>
                                </select>
                                {errorcountry && (
                                  <div style={mystyle}>{errorcountry}</div>
                                )}
                              </div>
                            </div> */}
                          {/* <div class="col-lg-6 col-md-6">
                            <div class="form-group">
                              <label>State</label>
                              <select
                                class="select"
                                name="state"
                                id="state"
                                value={stateId}
                                onBlur={validatestate}
                                onChange={onChangeState}
                              >
                                <option value="0">Select State</option>
                                {states.map((option) => (
                                  <option value={option.id}>
                                    {option.name}
                                  </option>
                                ))}
                                <option value="indian RS">Indian RS</option>
                              </select>
                              {errorstate && (
                                <div style={mystyle}>{errorstate}</div>
                              )}
                            </div>
                          </div>
                          <div class="col-lg-6 col-md-6">
                            <div class="form-group">
                              <label>City</label>
                              <select
                                class="select"
                                name="city"
                                id="city"
                                value={cityId}
                                onBlur={validatecity}
                                onChange={onChangeCity}
                              >
                                <option value="0">Select City</option>
                                {cities.map((option) => (
                                  <option value={option.id}>
                                    {option.name}
                                  </option>
                                ))}
                                <option value="indian RS">Indian RS</option>
                              </select>
                              {errorcity && (
                                <div style={mystyle}>{errorcity}</div>
                              )}
                            </div>
                          </div> */}


                          {/* <h3 class="title">Social Links</h3>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Facebook URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="facebook_url"
                                  id="facebook_url"
                                  value={data.facebook_url}
                                  onBlur={validatefacebook_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorfacebook_url && (
                                  <div style={mystyle}>{errorfacebook_url}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Twitter URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="twitter_url"
                                  id="twitter_url"
                                  value={data.twitter_url}
                                  onBlur={validatetwitter_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errortwitter_url && (
                                  <div style={mystyle}>{errortwitter_url}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Linkedin URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="linkedin_url"
                                  id="linkedin_url"
                                  value={data.linkedin_url}
                                  onBlur={validatelinkedin_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorlinkedin_url && (
                                  <div style={mystyle}>{errorlinkedin_url}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Google Plus URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="google_plus_url"
                                  id="google_plus_url"
                                  value={data.google_plus_url}
                                  onBlur={validategoogle_plus_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorgoogle_plus_url && (
                                  <div style={mystyle}>
                                    {errorgoogle_plus_url}
                                  </div>
                                )}
                              </div>
                            </div> */}
                          {/* <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Pintrest URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="pinterest_url"
                                  id="pinterest_url"
                                  value={data.pinterest_url}
                                  onBlur={validatepinterest_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorpinterest_url && (
                                  <div style={mystyle}>
                                    {errorpinterest_url}
                                  </div>
                                )}
                              </div>
                            </div> */}
                          {/* </div> */}

                          <button
                            type="submit"
                            class="btn btn-primary me-2"
                            style={{
                              color: "white",
                              width: "150px",
                              height: "50px",
                            }}
                          >
                            Save
                          </button>
                        </form>
                      </div>
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
    {
      requestLogin,
      requestFormField,
      requestCandidateProfile,
      requestCountry,
      requestState,
      requestCity,
      requestGetCandidate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
