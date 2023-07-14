import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestEmpForgot3 } from "../Redux/actions";
import WOW from "wowjs";
import Swal from "sweetalert2";

function ForgotPassword(props) {
  
  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errorPass, seterrorPass] = useState("");
  const [errorCPass, seterrorCPass] = useState("");
  const [error, setError] = useState(false);
  function validatePass() {
    let valid = false;
    if (data["password"] === "") {
      seterrorPass("Enter password.");
      valid = false;
    } else if (typeof data["password"] === "undefined") {
      seterrorPass("Enter password.");
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
    if (data["password_confirmation"] === "") {
      seterrorCPass("Enter confirm password.");
      valid = false;
    } else if (typeof data["password_confirmation"] === "undefined") {
      seterrorCPass("Enter confirm password.");
      valid = false;
    } else if (data["password_confirmation"].length < 6) {
      seterrorCPass("Enter atleast 6 character.");
      valid = false;
    } else if (data["password_confirmation"] !== data["password"]) {
      seterrorCPass("Confirmm password is mismatched.");
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
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      props.requestEmpForgot3({
        data: {
          email: localStorage.getItem("email"),
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      });
      setError(false)
    }else{
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if(errorPass){
        document.getElementById("password").focus();
      }else if(errorCPass){
        document.getElementById("password_confirmation").focus();
      }
      setError(false)
    }
  },[error]);

  useEffect(() => {
    let empForgotPassword3Data = props.employee.empForgotPassword3Data;
    if (empForgotPassword3Data !== undefined) {
      if (empForgotPassword3Data?.data?.status !== "success") {
        seterrorCPass('Confirm password mismatch.');
        setError(true)
        navigate("/empforgotpass3");
      } else {
        Swal.fire("Good job!", "Password changed successfully.", "success");
        localStorage.removeItem("email");
        props.employee.empForgotPassword3Data = undefined;
        navigate("/emplogin");
      }
    }
  }, [props.employee.empForgotPassword3Data]);

  return (
    <>
      <div class=" modal form-modal" style={{ display: "block" }}>
        <div class="modal-dialog max-width-px-840 position-relative"></div>
        <div class="login-modal-main">
          <div class="row no-gutters">
            <div class="col-md-3 col-lg-4"></div>
            <div class="col-md-6 col-lg-4">
              <div class="row">
                <div class="heading">
                  <h3>Reset Password</h3>
                  <p>Enter your email and get token.</p>
                </div>
                <h1>
                  {" "}
                  <br />
                  <br />
                </h1>
                <form onSubmit={onSubmitForm}>
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
                  <div class="form-group mb-8 button">
                    <button class="btn ">Save</button>
                  </div>
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
  bindActionCreators({ requestEmpForgot3 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

