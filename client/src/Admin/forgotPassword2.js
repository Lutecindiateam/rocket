import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestAdminForgot2 } from "../Redux/actions";

function ForgotPassword(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errorToken, seterrorToken] = useState("");
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

  function onChangeData(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmitForm(e) {
    e.preventDefault();
    props.requestAdminForgot2({
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
    let forgotPassword2Data = props.data.forgotPassword2Data;
    if (forgotPassword2Data !== undefined) {
      if (forgotPassword2Data?.data?.status !== "success") {
        seterrorToken("Token mismatched.");
        setError(true)
        navigate("/admin/forgotPassword2");
      } else {
        props.data.forgotPassword2Data = undefined;
        navigate("/admin/forgotPassword3");
      }
    }
  }, [props.data.forgotPassword2Data]);

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
                  <h6 class="fw-light">
                    Enter token and update your password.
                  </h6>
                  <form class="pt-3" onSubmit={onSubmitForm}>
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
  bindActionCreators({ requestAdminForgot2 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);