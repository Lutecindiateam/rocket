import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestRegister,
  requestCountry,
  requestCity,
  requestState,
  userLogout,
} from "../Redux/actions";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import WOW from "wowjs";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { FormControl, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../aws-exports'
Amplify.configure(awsExports);



function Register(props) {
  // const numbers = Array.from({ length: 51 }, (_, index) => index);

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  const googleRef = useRef();
  const facebookRef = useRef();
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const [number, setNumber] = useState(0);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const [errorfirst_name, seterrorfirst_name] = useState("");
  const [errorlast_name, seterrorlast_name] = useState("");
  const [errorprofile_title, seterrorprofile_title] = useState("");
  const [errorprofile_in_brief, seterrorprofile_in_brief] = useState("");
  const [errorcurrent_organization, seterrorcurrent_organization] = useState("");
  const [errorcurrent_ctc, seterrorcurrent_ctc] = useState("");
  const [errorgender, seterrorgender] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const [errorpassword_confirmation, seterrorpassword_confirmation] = useState("");
  const [errorphone, seterrorphone] = useState("");
  const [errorcountry, seterrorcountry] = useState("");
  const [errortotal_experience, seterrortotal_experience] = useState("");
  const [errorstate, seterrorstate] = useState("");
  const [errorcity, seterrorcity] = useState("");
  const [error, setError] = useState(false);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // useEffect(() => {
  //   console.log(selectedState);
  //   console.log(selectedCity);
  // }, [selectedState, selectedCity]);

  // const statesOfIndia = State.getStatesOfCountry("IN");

  // const selectStyles = {
  //   menuPortal: (provided) => ({
  //     ...provided,
  //     zIndex: 9999, // Set a high z-index value
  //   }),
  // };


  // useEffect(() => {
  //   props.requestCountry();
  // }, []);

  // useEffect(() => {
  //   let countryData = props.candidate.countryData;
  //   if (countryData !== undefined) {
  //     if (countryData?.data?.status === "success") {
  //       setCountries(countryData.data.data.countries);
  //     }
  //   }
  // }, [props.candidate.countryData]);

  // function onChangeCountry(e) {
  //   setCountryId(e.target.value);
  //   props.requestState({
  //     id: e.target.value,
  //   });
  // }

  // useEffect(() => {
  //   let stateData = props.candidate.stateData;
  //   if (stateData !== undefined) {
  //     if (stateData?.data?.status === "success") {
  //       setStates(stateData.data.data.states);
  //     }
  //   }
  // }, [props.candidate.stateData]);

  // function onChangeState(e) {
  //   setStateId(e.target.value);
  //   props.requestCity({
  //     id: e.target.value,
  //   });
  // }

  // useEffect(() => {
  //   let cityData = props.candidate.cityData;

  //   if (cityData !== undefined) {
  //     if (cityData?.data?.status === "success") {
  //       setCities(cityData.data.data.cities);
  //     }
  //   }
  // }, [props.candidate.cityData]);

  // function onChangeCity(e) {
  //   setCityId(e.target.value);
  // }

  function validateFname() {
    let formIsValid = false;
    if (!data["first_name"]) {
      formIsValid = false;
      seterrorfirst_name("*Enter your First name.");
    } else if (typeof data["first_name"] !== "undefined") {
      if (!data["first_name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        seterrorfirst_name("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterrorfirst_name("");
      }
    }
    return formIsValid;
  }
  function validateLname() {
    let formIsValid = false;
    if (!data["last_name"]) {
      formIsValid = false;
      seterrorlast_name("*Enter your Last name.");
    } else if (typeof data["last_name"] !== "undefined") {
      if (!data["last_name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        seterrorlast_name("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterrorlast_name("");
      }
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
  function validatePassword() {
    let formIsValid = false;
    if (!data["password"]) {
      seterrorpassword("*Enter your password.");
      formIsValid = false;
    } else if (data["password"].length < 6) {
      seterrorpassword("*Enter atleast 6 character long password.");
      formIsValid = false;
    } else {
      seterrorpassword("");
      formIsValid = true;
    }
    return formIsValid;
  }
  function validateCPassword() {
    let formIsValid = false;
    if (!data["password_confirmation"]) {
      seterrorpassword_confirmation("*Enter your confirm password.");
      formIsValid = false;
    } else if (data["password_confirmation"].length < 6) {
      seterrorpassword_confirmation(
        "*Enter atleast 6 character long password."
      );
      formIsValid = false;
    } else if (data["password_confirmation"] !== data["password"]) {
      seterrorpassword_confirmation("*Confirmm password is mismatched.");
      formIsValid = false;
    } else {
      seterrorpassword_confirmation("");
      formIsValid = true;
    }
    return formIsValid;
  }

  //   function validateCorganization(){
  //     let formIsValid = false;
  //     if(!data["current_organization"]){
  //       formIsValid = false;
  //       seterrorcurrent_organization("*Enter your Current Organization.")
  //     }else{
  //       formIsValid = true;
  //       seterrorcurrent_organization("")
  //     }
  //     return formIsValid;
  //   }

  //   function validatePtitle() {
  //     let formIsValid = false;
  //     if (!data["profile_title"]) {
  //       formIsValid = false;
  //       seterrorprofile_title("*Enter your profile title.");
  //     }
  //     //  else if (typeof data["profile_title"] !== "undefined") {
  //     //   if (!data["profile_title"].match(/^[a-zA-Z]+$/)) {
  //     //     formIsValid = false;
  //     //     seterrorprofile_title("*Please enter Alphabet characters only.");
  //     //   }
  //        else {
  //         formIsValid = true;
  //         seterrorprofile_title("");
  //       }
  //     // }
  //     return formIsValid;
  //   }

  //   function validatePbrief() {
  //     let formIsValid = false;
  //     if(!data["profile_in_brief"]){
  //       formIsValid = false;
  // seterrorprofile_in_brief("*Enter your profile in brief.")
  //     }else{
  //       formIsValid = true;
  //       seterrorprofile_in_brief("");
  //     }
  //     return formIsValid;
  //   }

  //   function validateGender() {
  //     let formIsValid = false;
  //     if (!data["gender"]) {
  //       formIsValid = false;
  //       seterrorgender("*Enter your Gender.");
  //     } else {
  //       formIsValid = true;
  //       seterrorgender("");
  //     }
  //     return formIsValid;
  //   }


  // function validatePhone() {
  //   let formIsValid = false;
  //   if (!data["phone"]) {
  //     seterrorphone("*Enter your Contact No.");
  //     formIsValid = false;
  //   } else if (data["phone"].length < 6) {
  //     seterrorphone("*Enter exact 10 digits.");
  //     formIsValid = false;
  //   } else {
  //     seterrorphone("");
  //     formIsValid = true;
  //   }
  //   return formIsValid;
  // }

  // function validateCountry() {
  //   let formIsValid = false;
  //   if (!countryId) {
  //     seterrorcountry("*Enter your Country.");
  //     formIsValid = false;
  //   } else if (typeof countryId === "undefined") {
  //     formIsValid = false;
  //     seterrorcountry("*Select your country.");
  //   } else if (countryId === "0") {
  //     seterrorcountry("*Enter your Country.");
  //     formIsValid = false;
  //   } else {
  //     seterrorcountry("");
  //     formIsValid = true;
  //   }
  //   return formIsValid;
  // }

  // function validateTexperience() {
  //   let formIsValid = false;
  //   if (!data.total_experience) {
  //     seterrortotal_experience("*Enter your Total Experience.");
  //     formIsValid = false;
  //   } else if (typeof total_experience === "undefined") {
  //     formIsValid = false;
  //     seterrortotal_experience("*Select your Total Experience.");
  //   } 
  // else if (number === "0") {
  //   seterrortotal_experience("*Enter your Country.");
  //   formIsValid = false;
  // }
  //    else {
  //     seterrortotal_experience("");
  //     formIsValid = true;
  //   }
  //   return formIsValid;
  // }

  // function validateCctc() {
  //   let formIsValid = false;
  //   if (!data.current_ctc) {
  //     seterrorcurrent_ctc("*Enter your Current CTC.");
  //     formIsValid = false;
  //   } else if (typeof current_ctc === "undefined") {
  //     formIsValid = false;
  //     seterrorcurrent_ctc("*Select your Current CTC.");
  //   } 
  //    else {
  //     seterrorcurrent_ctc("");
  //     formIsValid = true;
  //   }
  //   return formIsValid;
  // }
  // function validateState() {
  //   let formIsValid = false;
  //   if (!selectedState) {
  //     seterrorstate("*Enter your State.");
  //     formIsValid = false;
  //   } else if (typeof stateId === "undefined") {
  //     formIsValid = false;
  //     seterrorstate("*Select your State.");
  //   } else if (stateId === "0") {
  //     seterrorstate("*Enter your State.");
  //     formIsValid = false;
  //   } else {
  //     seterrorstate("");
  //     formIsValid = true;
  //   }
  //   return formIsValid;
  // }
  // function validateCity() {
  //   let formIsValid = false;
  //   if (!selectedCity) {
  //     seterrorcity("*Enter your City.");
  //     formIsValid = false;
  //   } else if (typeof cityId === "undefined") {
  //     formIsValid = false;
  //     seterrorcity("*Select your City.");
  //   } else if (cityId === "0") {
  //     seterrorcity("*Enter your City.");
  //     formIsValid = false;
  //   } else {
  //     seterrorcity("");
  //     formIsValid = true;
  //   }
  //   return formIsValid;
  // }
  function validateForm() {
    let fname = validateFname();
    let lname = validateLname();
    let email = validateEmail();
    let pass = validatePassword();
    let cpass = validateCPassword();


    let valid =
      fname &&
      lname &&
      email &&
      pass &&
      cpass;
    return valid;
  }

  function onChangeData(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  // function onSubmitForm(e) {
  //   e.preventDefault();
  //   if (isSubmitting) {
  //     return;
  //   }
  //   setIsSubmitting(true);

  //    props.userLogout();
  //   if (validateForm()) {
  //     props.requestRegister({
  //       data: {
  //         first_name: data.first_name,
  //         last_name: data.last_name,
  //         email: data.email,
  //         password: data.password,
  //         password_confirmation: data.password_confirmation
  //       },
  //     });
  //     setIsSubmitting(false);

  //     setError(false)
  //   } else {
  //     setIsSubmitting(false);

  //     setError(true)
  //   }
  // }
  async function onSubmitForm(e) {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    props.userLogout();

    if (validateForm()) {
      try {
        const {user}=await Auth.signUp({
          username: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
          attributes: {
            given_name: data.first_name.charAt(0).toUpperCase() + data.first_name.slice(1),
            family_name: data.last_name.charAt(0).toUpperCase() + data.last_name.slice(1),
          },
        });
        // console.log(user);
        if(user){
        // Swal.fire("Good job!", "Registration successfully.", "success");
        navigate('/verify')
        setIsSubmitting(false);
        setError(false);
        }
      } catch (error) {
        setIsSubmitting(false);

        alert(error.message);
        console.log('Error signing up:', error);
        setError(true);
      }
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    if (error) {
      if (errorfirst_name) {
        document.getElementById("first_name").focus();
      } else if (errorlast_name) {
        document.getElementById("last_name").focus();
      }
      else if (erroremail) {
        document.getElementById("email").focus();
      } else if (errorpassword) {
        document.getElementById("password").focus();
      } else if (errorpassword_confirmation) {
        document.getElementById("password_confirmation").focus();
      }
      setError(false)
    }
  }, [error]);

  // function googleLogin(e) {
  //   props.userLogout();
  //   props.requestRegister({
  //     data: {
  //       first_name: data.first_name,
  //       last_name: data.last_name,
  //       email: data.email,
  //     },
  //   });
  // }

  useEffect(() => {
    let registerdata = props.candidate.registerData;
    // console.log(registerdata);
    if (registerdata !== undefined) {
      if (registerdata?.data?.status === "success") {
        props.candidate.registerData = undefined;
        Swal.fire("Good job!", "Registration successfully.", "success");
        navigate("/login");
      } else {
        seterroremail("Email is already used.");
        setError(true)
      }
    }
  }, [props.candidate.registerData]);

  return (
    <>
      <div
        class=" modal form-modal"
        style={{ display: "block", height: "100%", overflow: "auto" }}
      >
        <div class="modal-dialog max-width-px-840 position-relative"></div>
        <div class="login-modal-main">
          <div class="row no-gutters">
            <div class="col-lg-4 col-md-3"></div>
            <div class="col-lg-4 col-md-6">
              <div class="row">
                <div class="heading">
                  <h3>
                    Create a free Account
                    <br />
                    For Candidates
                  </h3>
                  <p>
                    Create your account to continue <br /> and explore new jobs.
                  </p>
                </div>
                {/* <div class="social-login">


                  <ul>
                    <li>
                      <LoginSocialGoogle
                        ref={googleRef}
                        client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        onResolve={({ provider, data }) => {
                          setProvider(provider);
                          setProfile(data);
                          setData((data) => ({
                            ...data,
                            first_name: profile.firstName,
                            last_name: profile.lastName,
                            email: profile.email,
                          }));

                          googleLogin();
                        }}
                        onReject={(err) => {
                          alert.error(err);
                        }}
                      >
                        <a class="google" style={{ textDecoration: "none" }}>
                          <i class="lni lni-google"></i> Log in with Google
                        </a>
                      </LoginSocialGoogle>
                    </li>
                    <li>
                      <LoginSocialFacebook
                        ref={facebookRef}
                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                        onResolve={({ provider, data }) => {
                          setProvider(provider);
                          setProfile(data);

                          console.log(data, "data");
                          console.log(provider, "provider");
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      >
                        <li>
                          <a class="facebook" style={{ textDecoration: "none" }}>
                            <i class="lni lni-facebook-original"></i> Log in with
                            Facebook
                          </a>
                        </li>
                      </LoginSocialFacebook>
                    </li>

                  </ul>
                </div>
                <div class="or-devider">
                  <span>Or</span>
                </div> */}

                <form onSubmit={onSubmitForm}>
                  <div class="form-group">
                    <label for="first_name" class="label">
                      First Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First Name"
                      id="first_name"
                      name="first_name"
                      value={data.first_name}
                      onChange={onChangeData}
                      onBlur={validateFname}
                    />
                    {errorfirst_name && (
                      <div style={mystyle}>{errorfirst_name}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="last_name" class="label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last Name"
                      id="last_name"
                      name="last_name"
                      value={data.last_name}
                      onChange={onChangeData}
                      onBlur={validateLname}
                    />
                    {errorlast_name && (
                      <div style={mystyle}>{errorlast_name}</div>
                    )}
                  </div>
                  {/* <div class="form-group">
                    <label for="current_organization" class="label">
                      Current Organization
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
                  <div class="form-group">
                    <label for="profile_title" class="label">
                      Profile Titile(max 25 words)
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Profile Titile(max 25 words)"
                      id="profile_title"
                      name="profile_title"
                      value={data.profile_title}
                      onChange={onChangeData}
                      onBlur={validatePtitle}
                    />
                    {errorprofile_title && (
                      <div style={mystyle}>{errorprofile_title}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="profile in brief" class="label">
                      profile in brief
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="profile in brief"
                      id="profile_in_brief"
                      name="profile_in_brief"
                      value={data.profile_in_brief}
                      onChange={onChangeData}
                      onBlur={validatePbrief}
                    />
                    {errorprofile_in_brief && (
                      <div style={mystyle}>{errorprofile_in_brief}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="gender" class="label">
                      Gender
                    </label>
                    <input
                      type="radio"
                      style={{ margin: "0px" }}
                      id="male"
                      name="gender"
                      value="1"
                      onChange={onChangeData}
                      onBlur={validateGender}
                    />
                    <label for="male" style={{ color: "black" }}>
                      {" "}
                      &nbsp; Male
                    </label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="0"
                      onChange={onChangeData}
                      onBlur={validateGender}
                      style={{ marginLeft: "30px" }}
                    />
                    <label for="female" style={{ color: "black" }}>
                      {" "}
                      &nbsp; Female
                    </label>
                    {errorgender && <div style={mystyle}>{errorgender}</div>}
                  </div> */}

                  <div class="form-group">
                    <label for="email" class="label">
                      E-mail
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
                  <div class="form-group">
                    <label for="password" class="label">
                      Password
                    </label>
                    <div class="position-relative">
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        value={data.password}
                        onChange={onChangeData}
                        onBlur={validatePassword}
                      />
                      {errorpassword && (
                        <div style={mystyle}>{errorpassword}</div>
                      )}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="password_confirmation" class="label">
                      Confirm Password
                    </label>
                    <div class="position-relative">
                      <input
                        type="password"
                        class="form-control"
                        id="password_confirmation"
                        placeholder="Enter Confirm password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onChangeData}
                        onBlur={validateCPassword}
                      />
                      {errorpassword_confirmation && (
                        <div style={mystyle}>{errorpassword_confirmation}</div>
                      )}
                    </div>
                  </div>

                  {/* <div class="form-group">
                    <label for="phone" class="label">
                      Contact No.
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
                  
                   <div class="form-group">
                    <label for="country" class="label">
                      Country
                    </label>
                    <div class="position-relative">
                      <select
                        class="select form-control"
                        value={countryId}
                        name="country"
                        id="country"
                        onBlur={validateCountry}
                        onChange={onChangeCountry}
                      > 
                   <option value="0">Select Your Country</option> 

                   {countries.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))} 
                   </select>
                    </div>
                    {errorcountry && <div style={mystyle}>{errorcountry}</div>}
                  </div>
                  <div class="form-group">
                    <label for="Total Experience" class="label">
                    Total Experience
                    </label>
                    <div class="position-relative">
                      <select
                        class="select form-control"
                        value={data.total_experience}
                        name="total_experience"
                        id="total_experience"
                        onBlur={validateTexperience}
                        onChange={onChangeData}
                      > 
                   <option value="0">Total Experience</option> 
                   {numbers.map((number) => (
                          <option value={number}>{number}</option>
                        ))} 
                   </select>
                    </div>
                    {errortotal_experience && <div style={mystyle}>{errortotal_experience}</div>}
                  </div>
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
                      </select> 
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
                      </select> 
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

                  <div class="form-group">
                    <label for="Current CTC" class="label">
                    Current CTC(in Lakhs per annum)
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
                  //  <option value="0">Current CTC</option> 
                   {numbers.map((number) => (
                          <option value={number}>{number}</option>
                        ))} 
                   </select>
                    </div>
                    {errorcurrent_ctc && <div style={mystyle}>{errorcurrent_ctc}</div>}
                  </div>*/}

                  <div class="form-group mb-8 button">
                    <button class="btn " disabled={isSubmitting}>        
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                  </div>
                  <p class="text-center create-new-account">
                    Already have an account?{" "}
                    <a href="/login">Login to your account</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestCountry, requestCity, requestState, requestRegister, userLogout },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);

