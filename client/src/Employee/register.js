import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestEmpRegister,
  userLogout,
} from "../Redux/actions";

import WOW from "wowjs";
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../aws-exports'
Amplify.configure(awsExports);


function Register(props) {
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);

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

  const [errorindustry, seterrorindustry] = useState("");

  const [errorfirst_name, seterrorfirst_name] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const [errorpassword_confirmation, seterrorpassword_confirmation] = useState("");
  const [error, setError] = useState(false);


  function validateFname() {
    let formIsValid = false;
    if (!data["name"]) {
      formIsValid = false;
      seterrorfirst_name("*Enter company name.");
    } else if (typeof data["name"] !== "undefined") {
      if (!data["name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterrorfirst_name("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterrorfirst_name("");
      }
    }
    return formIsValid;
  }

  function validateindustry() {
    let formIsValid = false;
    if (!data["industry"]) {
      formIsValid = false;
      seterrorindustry("*Enter industry.");
    } else if (typeof data["industry"] !== "undefined") {
      if (!data["name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterrorindustry("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterrorindustry("");
      }
    }
    return formIsValid;
  }
  function validateEmail() {
    let formIsValid = false;
    if (!data["email"]) {
      formIsValid = false;
      seterroremail("*Enter company E-mail ID.");
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
      seterrorpassword("*Enter company password.");
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
      seterrorpassword_confirmation("*Enter company confirm password.");
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
  function validateForm() {
    let fname = validateFname();
    let email = validateEmail();
    let pass = validatePassword();
    let cpass = validateCPassword();
    // let industry = validateindustry();

    let valid =
      fname &&
      email &&
      pass &&
      // industry &&
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
  //   props.userLogout();
  //   if (validateForm()) {
  //     props.requestEmpRegister({
  //       data: {
  //         name: data.name,
  //         email: data.email,
  //         password: data.password,
  //         password_confirmation: data.password_confirmation,
  //         // industry : data.industry,
  //       },
  //     });
  //     setError(false)
  //   }else{
  //     setError(true)
  //   }
  // }

  
  async function onSubmitForm(e) {
    e.preventDefault();
    props.userLogout();
    if (validateForm()) {
      const {user}=await Auth.signUp({
        username: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
          attributes:{
          name: data.name,
          }
          // industry : data.industry,
      });
      if(user){
      navigate("/empverify");
      }
      // console.log(user);
      setError(false)
    }else{
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if(errorfirst_name){
        document.getElementById("name").focus();
      }else if(erroremail){
        document.getElementById("email").focus();
      }else if(errorpassword){
        document.getElementById("password").focus();
      }else if(errorpassword_confirmation){
        document.getElementById("password_confirmation").focus();
      }
      // else if(errorindustry){
      //   document.getElementById("industry").focus();
      // }
      setError(false)
    }
  },[error]);

  useEffect(() => {
    let empRegisterData = props.employee.empRegisterData;
    if (empRegisterData !== undefined) {
      if (empRegisterData?.data?.status === "success") {
        navigate("/emplogin");
        props.employee.empRegisterData=undefined;
      } else {
        seterroremail('Email is already used.');
        setError(true)
      }
    }
  }, [props.employee.empRegisterData]);

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
                    For Company
                  </h3>
                  <p>
                    Create company account to continue <br /> and post new jobs. <br/><br/>
                  </p>
                </div>
        

                <form onSubmit={onSubmitForm}>
                  <div class="form-group">
                    <label for="name" class="label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Company Name"
                      id="name"
                      name="name"
                      value={data.name}
                      onChange={onChangeData}
                      onBlur={validateFname}
                    />
                    {errorfirst_name && (
                      <div style={mystyle}>{errorfirst_name}</div>
                    )}
                  </div>
                  {/* <div class="col-lg-6 col-md-6">
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
                                  {industry.map((option) => (
                                    <option value={option.id}>
                                      {option.name}
                                    </option>
                                  ))}
                                  <option value="mechanical">mechanical </option>
                                  <option value="civil">civil </option>
                                  <option value="bsc">bsc </option>
                                </select>

                                {errorindustry && (
                                  <div style={mystyle}>{errorindustry}</div>
                                )}
                              </div>

                            </div> */}
                  {/* <div class="form-group">
                    <label for="address" class="label">
                      Address
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Address"
                      id="address"
                      name="address"
                      value={data.address}
                      onChange={onChangeData}
                      onBlur={validateaddress}
                    />
                    {erroraddress && (
                      <div style={mystyle}>{erroraddress}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="mobile" class="label">
                      Mobile
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mobile"
                      id="mobile"
                      name="mobile"
                      value={data.mobile}
                      onChange={onChangeData}
                      onBlur={validatemobile}
                    />
                    {errormobile && (
                      <div style={mystyle}>{errormobile}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="name_of_the_authorized_person" class="label">
                      Name of the authorized person
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name of the authorized person"
                      id="name_of_the_authorized_person"
                      name="name_of_the_authorized_person"
                      value={data.name_of_the_authorized_person}
                      onChange={onChangeData}
                      onBlur={validateAperson}
                    />
                    {errorname_of_the_authorized_person && (
                      <div style={mystyle}>{errorname_of_the_authorized_person}</div>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="mobile_of_the_authorized_person" class="label">
                      Mobile of the authorized person
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mobile of the authorized person"
                      id="mobile_of_the_authorized_person"
                      name="mobile_of_the_authorized_person"
                      value={data.mobile_of_the_authorized_person}
                      onChange={onChangeData}
                      onBlur={validateAperson}
                    />
                    {errormobile_of_the_authorized_person && (
                      <div style={mystyle}>{errormobile_of_the_authorized_person}</div>
                    )}
                  </div> */}
                  <div class="form-group">
                    <label for="email" class="label">
                      Company E-mail
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

                  <div class="form-group mb-8 button">
                    <button class="btn ">Sign Up</button>
                  </div>
                  <p class="text-center create-new-account">
                    Already have an account?{" "}
                    <a href="/emplogin">Login to company account</a>
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
  return { employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestEmpRegister, userLogout },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
