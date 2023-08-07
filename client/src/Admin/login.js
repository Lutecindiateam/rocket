import { Auth } from "aws-amplify";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminLogin, userLogout } from "../Redux/actions";
import img from "../images/logo.png";

function Login(props) {
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
    } else if (typeof data["last_name"] !== "undefined") {
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
  //     props.requestAdminLogin({
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
        console.log(user);
        // setData(user)
        if (user) {
          props.requestAdminLogin({
            data: {
              email: user.attributes.email,
              name:user.attributes.name,
              sub:user.attributes.sub,
              token:user.signInUserSession.idToken.jwtToken
            },
          });
          setError(false)
        } else {
          setError(true)
        }
      } catch (error) {
        alert(error.message)
        console.log('error signing in', error);
      }
    }
  }

  useEffect(() => {
    if (error) {
      if(erroremail){
        document.getElementById("email").focus();
      } else if(errorpassword){
        document.getElementById("password").focus();
      }
      setError(false)
    }
  },[error]);

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        navigate("/admin/home");
      } else {
        seterrorpassword(loginData.data.message);
        setError(true)
      }
    }
  }, [props.data.loginData]);
  return (
    <>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
              <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                  <center>
                    <div class="brand-logo">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#2042e3",
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 40,
                            borderTopRightRadius: 0,
                            width: 70,
                            height: 40,
                          }}
                        >
                          <h4
                            style={{
                              color: "#fff",
                              textAlign: "center",
                              marginTop: "3.5%",
                            }}
                          >
                            {"Job"}
                          </h4>
                        </div>
                        <div
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#000",
                            borderTopLeftRadius: 40,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                            width: 80,
                            height: 40,
                          }}
                        >
                          <h4
                            style={{
                              color: "#fff",
                              textAlign: "center",
                              marginTop: "10%",
                            }}
                          >
                            &nbsp;{"Portal"}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </center>
                  <h4>Hello! let's get started</h4>
                  <h6 class="fw-light">Sign in to continue.</h6>
                  <form class="pt-3" onSubmit={onSubmitForm}>
                    <div class="form-group">
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
                    <div class="mt-3">
                      <button
                        class="btn btn-block btn-primary btn-sm font-weight-medium auth-form-btn"
                        type="submit"
                      >
                        SIGN IN
                      </button>
                    </div>
                    <div class="my-2 d-flex justify-content-between align-items-center">
                      <div class="form-check">
                        <label class="form-check-label text-muted">
                          <input style={{ marginLeft: "20px" }}
                            type="checkbox" class="form-check-input" />
                          Keep me signed in
                        </label>
                      </div>
                      <a href="/admin/forgotPassword1" class="auth-link text-black">
                        Forgot password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { data: state.data };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestAdminLogin, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
