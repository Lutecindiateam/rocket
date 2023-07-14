import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestAdminForgot3 } from "../Redux/actions";
import Swal from "sweetalert2";

function ForgotPassword(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errorPass, seterrorPass] = useState("");
  const [errorCPass, seterrorCPass] = useState("");
  const [error, setError] = useState(false);
  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
    fontSize: "13px",
  };

  function validatePass() {
    let valid = false;
    if (!data["password"]) {
      seterrorPass("Enter Password.");
      valid = false;
    } else if (data["password"].length < 6) {
      seterrorPass("Enter atleast 6 character.");
      valid = false;
    } else {
      seterrorPass("");
      valid = true;
    }
    return valid;
  }
  function validateCPass() {
    let valid = false;
    if (!data["password_confirmation"]) {
      seterrorCPass("Enter Confirm Password.");
      valid = false;
    } else if (data["password_confirmation"].length < 6) {
      seterrorCPass("Enter atleast 6 character.");
      valid = false;
    } else if (data["password_confirmation"] !== data["password"]) {
      seterrorCPass("Confirm password is mismatched.");
      valid = false;
    } else {
      seterrorCPass("");
      valid = true;
    }
    return valid;
  }
  function validateForm() {
    let pass = validatePass();
    let cpass = validateCPass();
    let valid = pass && cpass;
    return valid;
  }

  function onChangeData(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value
    }));
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      props.requestAdminForgot3({
        data: {
          email: localStorage.getItem("email"),
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      });
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if (errorPass) {
        document.getElementById("password").focus();
      } else if (errorCPass) {
        document.getElementById("password_confirmation").focus();
      }
      setError(false)
    }
  }, [error]);

  useEffect(() => {
    let forgotPassword3Data = props.data.forgotPassword3Data;
    if (forgotPassword3Data !== undefined) {
      if (forgotPassword3Data?.data?.status !== "success") {
        seterrorCPass("Confirm password mismatch.");
        setError(true)
        navigate("/admin/forgotPassword3");
      } else {
        localStorage.removeItem("email");
        props.data.forgotPassword3Data = undefined;
        Swal.fire({
          title: 'Good job!',
          text: 'Password updated successfully..',
          icon: 'success'
        });
        navigate("/admin/login");
      }
    }
  }, [props.data.forgotPassword3Data]);

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
                  <h6 class="fw-light">Update your password.</h6>
                  <form class="pt-3" onSubmit={onSubmitForm}>
                    <div class="form-group">
                      <label for="password" class="label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={onChangeData}
                        onBlur={validatePass}
                      />
                      {errorPass && <div style={mystyle}>{errorPass}</div>}
                    </div>
                    <div class="form-group">
                      <label for="password_confirmation" class="label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onChangeData}
                        onBlur={validateCPass}
                      />
                      {errorCPass && <div style={mystyle}>{errorCPass}</div>}
                    </div>

                    <div class="mt-3">
                      <button
                        class="btn btn-block btn-primary btn-md"
                        type="submit"
                      >
                        Save
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
  bindActionCreators({ requestAdminForgot3 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);