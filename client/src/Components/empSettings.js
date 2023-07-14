import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import ManageAccount from "./manageAccount";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestEmpLogin,
  requestEmpDelete,
  userLogout,
} from "../Redux/actions";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";

function Settings(props) {

  const navigate = useNavigate();
  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };
  const [emp, setEmp] = useState({});
  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
      } else {
        localStorage.setItem("link", "/empsettings");
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", "/empsettings");
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);
  const [deactivate, setdeactivate] = useState(0);
  const [errordeactivate, seterrordeactivate] = useState("");
  function onChangeDeactivate(e) {
    setdeactivate(e.target.value);
  }
  function deactivateProfile() {
    if (deactivate === 0) {
      seterrordeactivate("*Select reason for deactivating account.");
    } else {
      seterrordeactivate("");
    }
  }
  const [Delete, setDelete] = useState(0);
  const [errordelete, seterrordelete] = useState("");
  const [password, setpassword] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  function onChangeDelete(e) {
    setDelete(e.target.value);
  }
  function onChangePassword(e) {
    setpassword(e.target.value);
  }
  function deleteProfile() {
    if (emp) {
      if (Delete === 0) {
        seterrordelete("*Select reason for deleting account.");
        seterrorpassword("");
      } else if (password === "") {
        seterrordelete("");
        seterrorpassword("*Enter your current password");
      } else {
        seterrordelete("");
        seterrorpassword("");
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            props.requestEmpDelete({
              id: emp.id,
              token: emp.token,
              data: {
                passwords: password,
              },
            });
          }
        })  
      }
    }
  }

  useEffect(() => {
    let empDeleteAccountData = props.employee.empDeleteAccountData;
    if (empDeleteAccountData !== undefined) {
      if (empDeleteAccountData?.data?.status == "success") {
        Swal.fire("Good job!", "Your Account deleted successfully.", "success");
        props.employee.empDeleteAccountData = undefined;
        props.userLogout();
        navigate("/home");
      } else {
        seterrorpassword("*Enter your current password");
        Swal.fire("Error!", `Something went wrong while deleting account`, "error");
        props.employee.empDeleteAccountData = undefined;
      }
    }
  }, [props.employee.empDeleteAccountData]);

  return (
    <>
      <Header />
      <Breadcrumbs title="Settings" />
      <div class="resume section">
        <div class="container">
          <div class="resume-inner">
            <div class="row">
              <ManageAccount name="Settings" />

              <div class="col-lg-8 col-12">
                <div class="inner-content">
                  <div class="accordion" id="accordionExample">
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <b>Company Logo</b>
                          </button>
                        </h2>
                      </div>

                      <div
                        id="collapseOne"
                        class="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          The term “logo” generally refers to all the marks that
                          represent your brand. <br />
                          <br />
                          A well-designed logo builds trust by validating your
                          professionalism and get’s people to stick around.
                          <br />
                          <br />
                          It tells potential clients who you are, what you do,
                          and how that benefits them. It communicates to people
                          with no prior knowledge or experience with your
                          business that you do great work.
                          <br />
                          <br />
                          Create a strong logo to stand out to consumers, ensure
                          they remember your brand, and cultivate positive
                          associations with you. Logos have a deep symbolic
                          association connected to people’s memories and
                          emotions.
                          <br />
                          <br />
                          <div class="col-lg-12 button">
                            <Link to="/empLogo">
                              <button class="btn">Change Company Logo</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <b>Company Profile</b>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseTwo"
                        class="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          Company profile is defined as a professional
                          introduction aimed at capturing the attention of the
                          reader and inform him about the company succinctly. It
                          is designed to make a powerful impact and a good first
                          impression on potential investors or clients.
                          <br />
                          <br />
                          A company profile is actually a summary of all the
                          relevant elements of an entity. It is in the form of a
                          statement that describes important information about
                          the business. A company profile is a marketing
                          material that serves several purposes.
                          <br />
                          <br />
                          <div class="col-lg-12 button">
                            <Link to="/empProfile">
                              {" "}
                              <button class="btn">
                                Change Company Profile
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" id="headingFour">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <b>Change Password</b>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseFour"
                        class="collapse"
                        aria-labelledby="headingFour"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          <b>Why Should You Change Your Password Often?</b>
                          <br />
                          <br />
                          1. LIMITS BREACHES TO MULTIPLE ACCOUNTS <br />
                          If you use the same password for all your accounts, if
                          one gets hacked, you should assume the others will be
                          as well. Each account should have a unique password.
                          For example, you should not use your Facebook password
                          as your work password or your Target password for your
                          mobile banking password.
                          <br />
                          <br />
                          2. PREVENTS CONSTANT ACCESS <br />
                          A hacker may attempt to access your account more than
                          once over a period of time. Changing your password
                          often reduces the risk that they will have frequent
                          access.
                          <br />
                          <br />
                          3. PREVENTS USE OF SAVED PASSWORDS <br />
                          If you lose or change computers, it is possible for
                          someone else to gain access to your passwords.
                          Regularly updating your passwords means that even if
                          someone finds an old or saved password, it will no
                          longer be useful, and your data will be secure.
                          <br />
                          <br />
                          4. LIMITS ACCESS GAINED BY KEYSTROKE LOGGERS <br />
                          A keystroke logger is surveillance technology use to
                          record keystrokes. It is often used to steal credit
                          card information as well as login credentials.
                          Regularly changing your password makes it less likely
                          that passwords obtained this way will be useful for
                          any length of time.
                          <br />
                          <br />
                          <div class="col-lg-12 button">
                            <Link to="/empchangePassword">
                              {" "}
                              <button class="btn">Change Password</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" id="headingSix">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseSix"
                            aria-expanded="false"
                            aria-controls="collapseSix"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <b>Delete Account</b>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseSix"
                        class="collapse"
                        aria-labelledby="headingSix"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          Note that once you delete your Job Portal account, you
                          cannot get your Job Portal profile back. For security
                          reasons, you also may not be able to create a new
                          account with the email used by you earlier.
                          <br />
                          <br />
                          Candidate Search is not a one-time activity. Your Job
                          Portal profile might be useful when you search for a
                          new candidate in the future, hence we don’t recommend
                          company to delete their profiles.
                          <br />
                          <br />
                          1. If you wish to delete your account because you
                          already got a candidate, you can stop to upload jobs
                          until the next time you require for candidate.
                          <br />
                          <br />
                          If you still wish to delete your account, you can do.
                          You have to confirm with your password while deleting
                          the account. Note that it may take some time to remove
                          your profile from database.
                          <br />
                          <br />
                          <b>Why do you want to delete your account ?</b>
                          <br />
                          <br />
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="delete1"
                              name="delete"
                              value="1"
                              onChange={onChangeDelete}
                            />
                            <label class="form-check-label" for="delete1">
                              You found proper candidate
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="delete2"
                              name="delete"
                              value="2"
                              onChange={onChangeDelete}
                            />
                            <label class="form-check-label" for="delete2">
                              Not satisfy with Job Portal
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="delete3"
                              name="delete"
                              value="3"
                              onChange={onChangeDelete}
                            />
                            <label class="form-check-label" for="delete3">
                              Your company is no longer remains
                            </label>
                          </div>
                          {errordelete && (
                            <div style={mystyle}>{errordelete}</div>
                          )}
                          <br />
                          <br />
                          <b>Enter your current Password </b>
                          <div
                            class="form-group"
                            style={{ width: "250px", marginTop: "10px" }}
                          >
                            <input
                              class="form-control"
                              type="password"
                              name="password"
                              value={password}
                              onChange={onChangePassword}
                              placeholder=""
                            />
                            {errorpassword && (
                              <div style={mystyle}>{errorpassword}</div>
                            )}
                          </div>
                          <br />
                          <br />
                          <div class="col-lg-12 button">
                            <button class="btn" onClick={deleteProfile}>
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  bindActionCreators(
    {
      requestEmpLogin,
      requestEmpDelete,
      userLogout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
