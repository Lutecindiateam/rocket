import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestEmpForgot1 } from "../Redux/actions";
import WOW from "wowjs";
import Swal from 'sweetalert2'
function ForgotPassword(props) {
  useEffect(() => {
    new WOW.WOW().init();
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
      props.requestEmpForgot1({
        data: {
          email: data.email,
        },
      });
      setError(false)
    }else{
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if(errorEmail){
        document.getElementById("email").focus();
      }
      setError(false)
    }
  },[error]);

  useEffect(() => {
    let empForgotPassword1Data = props.employee.empForgotPassword1Data;
    if (empForgotPassword1Data !== undefined) {
      if (empForgotPassword1Data?.data?.status !== "success") {
        seterrorEmail('Something went wrong while sending mail to you.');
        setError(true)
        navigate("/empforgotpass1");
      } else {
        localStorage.setItem("email", data.email);
        props.employee.empForgotPassword1Data= undefined;
        Swal.fire( 'Good job!','Job Potal sent you token via email.','success');
        navigate("/empforgotpass2");
      }
    }
  }, [props.employee.empForgotPassword1Data]);

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
                    {errorEmail&& <div style={mystyle}>{errorEmail}</div>}
                  </div>

                  <div class="form-group mb-8 button">
                    <button class="btn ">Next</button>
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
  bindActionCreators({ requestEmpForgot1 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

