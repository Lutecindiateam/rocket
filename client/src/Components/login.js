import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestLogin, userLogout, requestGoogleLogin } from "../Redux/actions";
import WOW from "wowjs";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import { Auth } from "aws-amplify";

function Login(props) {
  // console.log(props);
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  const googleRef = useRef();
  const facebookRef = useRef();
  const [provider, setProvider] = useState("");
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [data1, setData1] = useState({});
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
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  function validateEmail() {
    let formIsValid = false;
    if (!data1["email"]) {
      formIsValid = false;
      seterroremail("*Enter your E-mail ID.");
    } else if (typeof data1["email"] !== "undefined") {
      if (
        !data1["email"].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
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
    if (!data1["password"]) {
      seterrorpassword("*Enter your password.");
      formIsValid = false;
    } else if (data1["password"].length < 6) {
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
  // if (validateForm()) {
  //   props.requestLogin({
  //     data: {
  //       email: data1.email,
  //       password: data1.password,
  //     },
  //   });
  //   setError(false)
  // }else{
  //   setError(true)
  // }
  // }
  async function onSubmitForm(e) {
    e.preventDefault();
    props.userLogout();
    if (validateForm()) {
      try {
        const user = await Auth.signIn(data1.email, data1.password);
        // setData(user)
        if (user) {
          props.requestLogin({
            data: {
              email: user.attributes.email,
              family_name: user.attributes.family_name,
              given_name: user.attributes.given_name,
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
  // console.log(data);
  useEffect(() => {
    if (error) {
      if (erroremail) {
        document.getElementById("email").focus();
      } else if (errorpassword) {
        document.getElementById("password").focus();
      }
      setError(false)
    }
  }, [error]);

  // function googleLogin(email) {
  //   props.userLogout();
  //   props.requestGoogleLogin({
  //     data: {
  //       email: email,
  //     },
  //   });
  // }

  useEffect(() => {
    let loginData = props.candidate.loginData;
    // const loginData = data
    // console.log("loginData ::",loginData)

    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (localStorage.getItem("link")) {
          navigate(localStorage.getItem("link"));
        } else {
          navigate("/home");
        }
      } else {
        seterrorpassword("Invalid Credentials");
        setError(true)
      }
    }
  }, [props.candidate.loginData]);
  // useEffect(() => {
  //   let loginData = props.candidate.loginData;
  //         console.log("loginData ::",loginData)

  //   if (loginData !== undefined) {
  //     if (loginData?.attributes?.email_verified == "true") {
  //       if (localStorage.getItem("link")) {
  //         navigate(localStorage.getItem("link"));
  //       } else {
  //         navigate("/home");
  //       }
  //     } else {
  //       seterrorpassword("Invalid Credentials");
  //       setError(true)
  //     }
  //   }
  // }, [props.candidate.loginData]);

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
                  <h3>Login From Here</h3>
                  <p>
                    Log in to continue your account <br /> and explore new jobs.
                  </p>
                </div>
                {/* <div class="social-login">
                  <ul>
                    <li>
                      <LoginSocialGoogle
                        ref={googleRef}
                        client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        onResolve={({ provider, data }) => {
                          setData1({
                            email: data.email,
                          });
                          googleLogin(data.email);
                        }}
                        onReject={(err) => {
                          console.log("Error", err);
                        }}
                      >
                        <a class="google" style={{textDecoration:"none"}}>
                          <i class="lni lni-google"></i> Log in with Google
                        </a>
                      </LoginSocialGoogle>
                    </li>
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
                        <a class="facebook"  style={{textDecoration:"none"}}>
                          <i class="lni lni-facebook-original"></i> Log in with
                          Facebook
                        </a>
                      </li>
                    </LoginSocialFacebook>
                  </ul>
                </div>
                <div class="or-devider">
                  <span>Or</span>
                </div> */}
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
                      value={data1.email}
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
                        value={data1.password}
                        onChange={onChangeData}
                        onBlur={validatePassword}
                      />
                      {errorpassword && (
                        <div style={mystyle}>{errorpassword}</div>
                      )}
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
                        &nbsp;Remember password
                      </label>
                    </div>
                    <a
                      // href="/forgotPassword1"
                      href="/forget"
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
                    <a href="/register">Create a free account</a>
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
    { requestLogin, userLogout, requestGoogleLogin },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
