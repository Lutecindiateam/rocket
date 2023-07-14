import Footer from "../Components/footer";
import Header from "../Components/header";
import { useEffect, useState } from "react";
import WOW from "wowjs";
import ManageAccount from "./manageAccount";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestEmpLogin, requestEmpChangePassword } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";

function ChangePassword(props) {
  
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [errorOld, setErrorOld] = useState("");
  const [errorNew, setErrorNew] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
    new WOW.WOW().init();
    localStorage.removeItem("link");
  }, []);

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setUser(empLoginData.data.data);
      } else {
        localStorage.setItem("link", "/empchangePassword");
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", "/empchangePassword");
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

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
      props.requestEmpChangePassword({
        id: user.id,
        token: user.token,
        data: {
          old: data.old,
          new: data.new,
          new_confirmation: data.new_confirmation,
        },
      });
      setError(false)
    }else{
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if(errorOld){
        document.getElementById("old").focus();
      }else if(errorNew){
        document.getElementById("new").focus();
      }else if(errorConfirm){
        document.getElementById("new_confirmation").focus();
      }
      setError(false)
    }
  },[error]);


  useEffect(() => {
    if (user.id) {
      let changePasswordData = props.employee.changePasswordData;
      if (changePasswordData !== undefined) {
        if (changePasswordData.status === 200) {
          Swal.fire("Good job!", "Changed password successfully.", "success");
          setData({
            new: "",
            old: "",
            new_confirmation: "",
          });
          props.employee.changePasswordData = undefined;
        } else {
          setErrorOld("Old password is mismatch.");
          setError(true)
          props.employee.changePasswordData = undefined;
        }
      }
    }
  }, [props.employee.changePasswordData]);


  return (
    <>
      <Header />
      <Breadcrumbs title="Change Password" />
      <div class="change-password section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Settings" />
              <div class="col-lg-8">
                <div class="password-content">
                  <h3>Change Password</h3>
                  <p>
                  You can not change password as this is demo project.
                    {/* Here you can change your password please fill up the form. */}
                  </p>
                  {/* <form onSubmit={onSubmitForm}>
                    <div class="row">
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
                          {errorOld && <div style={mystyle}>* {errorOld}</div>}
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
                          {errorNew && <div style={mystyle}>* {errorNew}</div>}
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
                      <div class="col-lg-12">
                        <div class="button">
                          <button class="btn">Save Change</button>
                        </div>
                      </div>
                    </div>
                  </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return { employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestEmpLogin, requestEmpChangePassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
