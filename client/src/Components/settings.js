import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import ManageAccount from "./manageAccount";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestLogin, requestDelete, userLogout } from "../Redux/actions";
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

  const [user, setUser] = useState({});

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      } else {
        localStorage.setItem("link", "/settings");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/settings");
      navigate("/login");
    }
  }, [props.candidate.loginData]);

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
    if (user.id) {
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
            props.requestDelete({
              id: user.id,
              token: user.token,
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
    let deleteAccountData = props.candidate.deleteAccountData;
    if (deleteAccountData !== undefined) {
      if (deleteAccountData?.data?.status === "success") {
        Swal.fire("Good job!", "Your Account deleted successfully.", "success");
        props.candidate.deleteAccountData = undefined;
        props.userLogout();
        navigate("/home");
      } else {
        seterrorpassword("*Enter your current password");
        Swal.fire("Error!", `Something went wrong while deleting account`, "error");
        props.candidate.deleteAccountData = undefined;
      }
    }
  }, [props.candidate.deleteAccountData]);

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
                            <b>Profile Picture</b>
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
                          Everyone knows that first impressions have a
                          significant impact on how people perceive you. <br />
                          <br />
                          A good profile picture lets your personality shine
                          through, so that grainy, low-resolution selfie is not
                          a very accurate representation of your personality,
                          wouldn’t you say? Especially if you are in the job
                          market. Recruiters really don't want to see a pic of
                          you on holiday or doing something that has nothing to
                          do with what you do for a living.
                          <br />
                          <br />
                          Remember that your profile picture is a representation
                          of Your Personal Brand, whether you realise it or not,
                          you’re constantly selling yourself online.
                          <br />
                          <br />
                          <div class="col-lg-12 button">
                            <Link to="/picture">
                              <button class="btn">
                                Change Profile Picture
                              </button>
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
                            <b>Profile</b>
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
                          Profile is summery of your personal details, industry
                          information, address information and social media
                          information.
                          <br />
                          <br />
                          <div class="col-lg-12 button">
                            <Link to="/profile">
                              {" "}
                              <button class="btn">Change Profile</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <b>Make Resume</b>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseThree"
                        class="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          Resume – that small piece of paper we all fuss over;
                          something that can make or break our chances of
                          getting an interview!
                          <br />
                          <br />
                          A lot of people feel overwhelmed at the thought of
                          writing their resume. How can one possibly illustrate
                          their complete professional journey in a page or two?
                          But in all honesty, putting together an effective
                          resume is easy once you know how. It’s about taking
                          your experience and skills and tailoring them to the
                          job you’re applying for.
                          <br />
                          <br />
                          <b> What do recruiters look for in Candidates?</b>
                          <br />
                          <br />
                          1. Relevant experience
                          <br />
                          2. Explicit accomplishments
                          <br />
                          3. Whether or not your resume is customized for the
                          open position
                          <br />
                          <br />
                          <div class="col-lg-12 button">
                            <Link to="/addResumeForm">
                              <button class="btn">Make Resume</button>
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
                            <Link to="/changePassword">
                              {" "}
                              <button class="btn">Change Password</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingFive">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <b>Deactivate Account</b>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseFive"
                        class="collapse"
                        aria-labelledby="headingFive"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          In case you are not looking for a job right now, you
                          can deactivate your Job Portal account. This will stop
                          all emails from Job Portal. We will reactivate your
                          account only when you login again on Job Portal.
                          <br />
                          <br />
                          <b>Why do you want to deactivate your account ?</b>
                          <br />
                          <br />
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="deactivate1"
                              name="deactivate"
                              value="1"
                              onChange={onChangeDeactivate}
                            />
                            <label class="form-check-label" for="deactivate1">
                              You found proper Job
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="deactivate2"
                              name="deactivate"
                              value="2"
                              onChange={onChangeDeactivate}
                            />
                            <label class="form-check-label" for="deactivate2">
                              Not want to change your current job
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="deactivate3"
                              name="deactivate"
                              value="3"
                              onChange={onChangeDeactivate}
                            />
                            <label class="form-check-label" for="deactivate3">
                              Not satisfy with Job Portal
                            </label>
                          </div>
                          {errordeactivate && (
                            <div style={mystyle}>{errordeactivate}</div>
                          )}
                          <br />
                          <br />
                          <div class="col-lg-12 button">
                            <button class="btn" onClick={deactivateProfile}>
                              Deactivate Account
                            </button>
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
                          Job Search is not a one-time activity. Your Job Portal
                          profile might be useful when you search for a new job
                          in the future, hence we don’t recommend users to
                          delete their profiles.
                          <br />
                          <br />
                          1. If you wish to delete your account because you
                          already got a job, you can deactivate your account
                          instead. Deactivating it would put your account in
                          sleep mode with no notifications until the next time
                          you login on Job Portal.
                          <br />
                          <br />
                          2. If you want to delete your account because you are
                          not getting relevant job recommendations, try creating
                          a Custom Job Alert.
                          <br />
                          <br />
                          3. If you want to delete your account because you want
                          to stop emails from Job Portal, try changing your
                          communication settings to stop all emails and mobile
                          notifications. You can still search and apply to jobs
                          but you not receive any emails from Job Portal by
                          deactivating your account.
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
                              You found proper Job
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
                              Not want to change your current job
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
                              Not satisfy with Job Portal
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
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestLogin,
      requestDelete,
      userLogout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
