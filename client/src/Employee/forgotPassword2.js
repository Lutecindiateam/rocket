import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestEmpForgot2 } from "../Redux/actions";
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
  const [error, setError] = useState(false);
  const [errorToken, seterrorToken] = useState("");
 

  function onChangeData(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmitForm(e) {
    e.preventDefault();   
      props.requestEmpForgot2({
        data: {
          token: data.token,
          email: localStorage.getItem("email"),
        },
      });    
  }
  useEffect(() => {
    if (error) {
      if(errorToken){
        document.getElementById("token").focus();
      }
      setError(false)
    }
  },[error]);

  useEffect(() => {
    let empForgotPassword2Data = props.employee.empForgotPassword2Data;
    if (empForgotPassword2Data !== undefined) {
      if (empForgotPassword2Data?.data?.status !== "success") {
        seterrorToken('Mismatched Token.');
        setError(true)
        navigate("/empforgotpass2");
      } else {
        props.employee.empForgotPassword2Data = undefined;
        Swal.fire( 'Good job!','Token is valid. You can set your new password.','success');
        navigate("/empforgotpass3");
      }
    }
  }, [props.employee.empForgotPassword2Data]);

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
                    <label for="token" class="label">
                      Token
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="000000"
                      id="token"
                      name="token"
                      value={data.token}
                      onChange={onChangeData}
                     
                    />
                     {errorToken && <div style={mystyle}>{errorToken}</div>}
                  </div>
                  
                  <div class="form-group button">
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
  bindActionCreators({ requestEmpForgot2 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

