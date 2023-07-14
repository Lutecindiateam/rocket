import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminLogin, requestAdminChangePassword } from "../Redux/actions";
import Swal from "sweetalert2";

function ChangePassword(props) {

  const [data, setData] = useState([]);
  const [admin, setadmin] = useState({});
  const [errorOld, setErrorOld] = useState("");
  const [errorNew, setErrorNew] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [error, setError] = useState(false);

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
    fontSize: "12px",
  };

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setadmin(loginData.data.data);
      }
    }
  }, [props.data.loginData]);

  function onChangeData(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function validateOld() {
    let formIsValid = false;
    if (!data["old"]) {
      setErrorOld("Enter Old Password.");
      formIsValid = false;
    } else if (data["old"].length < 6) {
      setErrorOld("Enter Atleast 6 characters.");
      formIsValid = false;
    } else {
      setErrorOld("");
      formIsValid = true;
    }
    return formIsValid;
  }
  function validateNew() {
    let formIsValid = false;
    if (!data["new"]) {
      setErrorNew("Enter New Password.");
      formIsValid = false;
    } else if (data["new"].length < 6) {
      setErrorNew("Enter Atleast 6 characters.");
      formIsValid = false;
    } else {
      setErrorNew("");
      formIsValid = true;
    }
    return formIsValid;
  }
  function validateConfirm() {
    let formIsValid = false;
    if (!data["new_confirmation"]) {
      setErrorConfirm("Enter New Password.");
      formIsValid = false;
    } else if (data["new_confirmation"].length < 6) {
      setErrorConfirm("Enter Atleast 6 characters.");
      formIsValid = false;
    } else if (data["new_confirmation"] !== data["new"]) {
      setErrorConfirm("Confim Password is mismatched.");
      formIsValid = false;
    } else {
      setErrorConfirm("");
      formIsValid = true;
    }
    return formIsValid;
  }
  function validateForm() {
    let old = validateOld();
    let new1 = validateNew();
    let confirm = validateConfirm();
    let valid = old && new1 && confirm;
    return valid;
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      props.requestAdminChangePassword({
        id: admin.id,
        token: admin.token,
        data: {
          old: data.old,
          new: data.new,
          new_confirmation: data.new_confirmation,
        },
      });
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if (errorOld) {
        document.getElementById("old").focus();
      } else if (errorNew) {
        document.getElementById("new").focus();
      } else if (errorConfirm) {
        document.getElementById("new_confirmation").focus();
      }
    }
    setError(false)
  }, [error]);

  useEffect(() => {
    let changePasswordData = props.data.changePasswordData;
    if (changePasswordData !== undefined) {
      if (changePasswordData.status === "error") {
        setErrorOld(changePasswordData.message);
        setError(true)
      } else {
        setData({
          new: "",
          old: "",
          new_confirmation: "",
        });
        Swal.fire({
          title: 'Good job!',
          text: 'Changed password successfully..',
          icon: 'success'
        });
        props.data.changePasswordData = undefined;
      }
    }
  }, [props.data.changePasswordData]);
  return (
    <>
      <div class="container-scroller">
        <Header name="Change Password" />
        <div class="container-fluid page-body-wrapper">
          <Sidebar name="Password" />

          <div class="main-panel">
            <div class="content-wrapper">
              <div class="row">
                <div class="col-sm-12">
                  <div class="home-tab">
                    <div class="col-12 grid-margin stretch-card">
                      <div class="card">
                        <div class="card-body">
                          You can not change password as this is demo project.
                          {/* <form class="forms-sample" onSubmit={onSubmitForm}>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Old Password</label>
                                <input
                                  class="form-control"
                                  type="password"
                                  name="old"
                                  id="old"
                                  value={data.old}
                                  onChange={onChangeData}
                                  onBlur={validateOld}
                                />
                                {errorOld && (
                                  <div style={mystyle}>* {errorOld}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>New Password</label>
                                <input
                                  class="form-control"
                                  type="password"
                                  name="new"
                                  id="new"
                                  value={data.new}
                                  onChange={onChangeData}
                                  onBlur={validateNew}
                                />
                                {errorNew && (
                                  <div style={mystyle}>* {errorNew}</div>
                                )}
                                <i class="bx bxs-low-vision"></i>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group last">
                                <label>Confirm Password</label>
                                <input
                                  class="form-control"
                                  type="password"
                                  name="new_confirmation"
                                  id="new_confirmation"
                                  value={data.new_confirmation}
                                  onChange={onChangeData}
                                  onBlur={validateConfirm}
                                />
                                {errorConfirm && (
                                  <div style={mystyle}>* {errorConfirm}</div>
                                )}
                                <i class="bx bxs-low-vision"></i>
                              </div>
                            </div>

                            <button
                              type="submit"
                              class="btn btn-primary me-2"
                              style={{ color: "white" }}
                            >
                              Submit
                            </button>
                            <button class="btn btn-light">Cancel</button>
                          </form> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
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
  bindActionCreators({ requestAdminLogin, requestAdminChangePassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
