import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestAdminForgot1 } from "../Redux/actions";

function ForgotPassword(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errorEmail, seterrorEmail] = useState("");
  const [error, setError] = useState(false);
  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
    fontSize: "13px"
  };

  function validateEmail() {
    let valid = false;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data["email"])) {
      seterrorEmail("");
      valid = true;
    } else {
      seterrorEmail("Enter valid email");
      valid = false;
    }
    return valid;
  }

  function validateForm() {
    let email = validateEmail();
    return email;
  }

  function onChangeData(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      props.requestAdminForgot1({
        data: {
          email: data.email,
        },
      });
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if (errorEmail) {
        document.getElementById("email").focus();
      }
      setError(false)
    }
  }, [error]);

  useEffect(() => {
    let forgotPassword1Data = props.data.forgotPassword1Data;
    if (forgotPassword1Data !== undefined) {
      if (forgotPassword1Data?.data?.status !== "success") {
        seterrorEmail("Something went wrong while sending mail to you.");
        setError(true)
        navigate("/admin/forgotPassword1");
      } else {
        localStorage.setItem("email", data.email);
        props.data.forgotPassword1Data = undefined;
        navigate("/admin/forgotPassword2");
      }
    }
  }, [props.data.forgotPassword1Data]);

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
                  <h4>Reset Password</h4>
                  <h6 class="fw-light">Enter your email and get token.</h6>
                  <form class="pt-3" onSubmit={onSubmitForm}>
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
                      {errorEmail && <div style={mystyle}>{errorEmail}</div>}
                    </div>

                    <div class="mt-3">
                      <button
                        class="btn btn-block btn-primary btn-md"
                        type="submit"
                      >
                        Next
                      </button>
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
  bindActionCreators({ requestAdminForgot1 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
