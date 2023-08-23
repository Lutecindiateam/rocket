import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestEmpLogin, userLogout } from "../Redux/actions";
import WOW from "wowjs";
import { Auth } from "aws-amplify";


function Login(props) {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const [error, setError] = useState(false);
  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  function onChangeData(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
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
    } else {
      formIsValid = true;
      seterroremail("");
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
  function validateForm() {
    let email = validateEmail();
    let pass = validatePassword();
    let valid = email && pass;
    return valid;
  }

  
  // function onSubmitForm(e) {
  //   e.preventDefault();
  //   props.userLogout();
  //   if (validateForm()) {
  //     props.requestEmpLogin({
  //       data: {
  //         email: data.email,
  //         password: data.password,
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
      try {
        const user = await Auth.signIn(data.email, data.password);
        if (user) {
          props.requestEmpLogin({
            data: {
              email: user.attributes.email,
              name:user.attributes.name.charAt(0).toUpperCase() + user.attributes.name.slice(1),
              sub:user.attributes.sub,
              token:user.signInUserSession.idToken.jwtToken
            },
          });
        }        
          // alert("Authentication completed")
          // navigate("/home");
    } catch (error) {
      alert(error.message)
        console.log('error signing in', error);
    }
      setError(false)
    }else{
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if(erroremail){
        document.getElementById("email").focus();
      }else if(errorpassword){
        document.getElementById("password").focus();
      }
      setError(false)
    }
  },[error]);

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status === "success") {
        // if (localStorage.getItem("link")) {
        //   navigate(localStorage.getItem("link"));
        // } else {
        //   navigate("/home");
        // }
        navigate("/home");
      } else {
        if (empLoginData?.data?.message) {
          seterrorpassword(empLoginData.data.message);
          setError(true)
        } else {
          seterrorpassword(empLoginData.message);
          setError(true)
        }
      }
    }
  }, [props.employee.empLoginData]);
  return (
    <>
      <div class=" modal form-modal" style={{ display: "block" }}>
        <div class="modal-dialog max-width-px-840 position-relative"></div>
        <div class="login-modal-main">
          <div class="row no-gutters">
            <div class="col-lg-4 col-md-3"></div>
            <div class="col-lg-4 col-md-6">
              <div class="row">
                <div class="heading">
                  <h3>Login For Company</h3>
                  <p>
                    Log in to continue your account <br /> and create new jobs.
                  </p>
                  <br />
                  <br />
                </div>

                <form onSubmit={onSubmitForm}>
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
                      {/* {errorpassword && (
                        <div style={mystyle}>{errorpassword}</div>
                      )} */}
                    </div>
                  </div>
                  <div class="form-group d-flex flex-wrap justify-content-between">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ marginLeft: "10px" }}
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Remember password
                      </label>
                    </div>
                    <a
                      href="/empforget"
                      class="font-size-3 text-dodger line-height-reset"
                    >
                      Forget Password
                    </a>
                  </div>
                  <div class="form-group mb-8 button">
                    <button class="btn ">Log in</button>
                  </div>
                  <p class="text-center create-new-account">
                    Don’t have an account?{" "}
                    <a href="/empregister">Create a free account</a>
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
  bindActionCreators({ requestEmpLogin, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);