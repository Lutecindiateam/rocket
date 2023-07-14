import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestLogin,
  requestEmpLogin,
  userLogout,
  requestRecentlyJob,
} from "../Redux/actions";
import "./DarkMode.css";
import jwt_decode from "jwt-decode";
import logoDashboard from '../images/Rocket.png'
import { Auth } from 'aws-amplify';


function Header(props) {

  const navigate = useNavigate();
  const [user, setUSer] = useState({});
  const [emp, setEmp] = useState({});

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          props.userLogout();
        }
        return error;
      }
    );
  }, []);

  async function logout() {
    props.userLogout();
    navigate("/home");
  }

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUSer(loginData.data.data);
      } else {
        setUSer({});
      }
    } else {
      setUSer({});
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status === "success") {
        setEmp(empLoginData.data.data);
      } else {
        setEmp({});
      }
    } else {
      setEmp({});
    }
  }, [props.employee.empLoginData]);

  function gotToTop() {
    window.scrollTo(0, 0);
  }

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (localStorage.getItem("dark") === "true") {
      document.body.classList.add("dark");
      return true;
    } else {
      return false;
    }
  });

  const setDarkMode = (e) => {
    localStorage.setItem("dark", !isDarkMode);
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <header class="header other-page" >
        <div class="navbar-area" >
          <div class="container" >
            <div class="row align-items-center" >
              <div class="col-lg-12">
                <nav class="navbar navbar-expand-lg " style={{ backgroundColor: "#fff" }}>
                  <Link class="navbar-brand logo" to="/home" onClick={gotToTop}>
                        <img src={logoDashboard} alt='logo dashboard' />

                    {/* <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }} */}
                    {/* > */}
                      {/* <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#2042e3",
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 40,
                          borderTopRightRadius: 0,
                          width: 100,
                          height: 40,
                        }}
                      > */}
                        {/* <h4
                          style={{
                            color: "#fff",
                            textAlign: "center",
                            marginTop: "8px",
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
                          width: 120,
                          height: 40,
                        }}
                      >
                        <h4
                          style={{
                            color: "#fff",
                            textAlign: "center",
                            marginTop: "10px",
                          }}
                        >
                          &nbsp;{"Portal"}
                        </h4> */}
                      {/* </div> */}
                    {/* </div> */}
                  </Link>
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ backgroundColor: "#2043e3", }}
                  >
                    <span class="toggler-icon"></span>
                    <span class="toggler-icon"></span>
                    <span class="toggler-icon"></span>
                  </button>
                  <div
                    class="collapse navbar-collapse sub-menu-bar open-nav"
                    id="navbarSupportedContent"
                  >
                    {/* ml-auto */}

                    <ul id="nav" class="navbar-nav">
                      <li class="nav-item">
                        <Link to="/home" onClick={gotToTop}>
                          Home
                        </Link>
                      </li>

                      {/* <li class="nav-item">
                        <Link to="">Pages</Link>
                        <ul class="sub-menu">
                          <li>
                            <Link to="/aboutUs">About Us</Link>
                          </li>
                          <li>
                            <Link to="/privacyPolicy">Privacy Policy</Link>
                          </li>
                          <li>
                            <Link to="/faq">Faq</Link>
                          </li>
                        </ul>
                      </li> */}
                      {!emp.id && (
                        <li class="nav-item">
                          <Link to="">Job Opportunities</Link>
                          <ul class="sub-menu">
                            <li>
                              <Link to="/jobList/1/10">Job List</Link>
                            </li>
                            <li>
                              <Link to="/browseJobs">Browse Jobs</Link>
                            </li>
                            <li>
                              <Link to="/browseCategories">
                                Browse Categories
                              </Link>
                            </li>
                          </ul>
                        </li>
                      )}
                      {emp.id && (
                        <li class="nav-item">
                          <Link to="">Employers </Link>
                          <ul class="sub-menu">
                            <li>
                              <Link onClick={gotToTop} to={emp?.id ? "/postJob" : "/emplogin"}>
                                Post A Job
                              </Link>
                            </li>
                            <li>
                              <Link onClick={gotToTop} to="/manageJobs">
                                Manage Jobs
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={gotToTop}
                                to="/manageApplications"
                              >
                                Manage Applications
                              </Link>
                            </li>
                            <li>
                              <Link onClick={gotToTop} to="/interviews">
                                Interviews
                              </Link>
                            </li>
                          </ul>
                        </li>
                      )}
                      {/* <li class="nav-item">
                        <Link to="/contact">Contact </Link>{" "}
                      </li> */}
                      <li class="nav-item">
                        {(() => {
                          if (emp.id) {
                            return (
                              <>
                                <Link
                                  to=""
                                  class="login"
                                  style={{ color: "#2042e3" }}
                                >
                                  <i class="lni lni-lock-alt"></i> Emp{" "}
                                </Link>
                                <ul class="sub-menu">
                                  <li>
                                    <Link to="/empLogo">Company Logo</Link>
                                  </li>
                                  <li>
                                    <Link to="/empProfile">My Profile</Link>
                                  </li>
                                  <li>
                                    <Link onClick={gotToTop} to="/manageJobs">
                                      Manage Account
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={gotToTop} to="/empsettings">
                                      Settings
                                    </Link>
                                  </li>
                                  <li>
                                    <a onClick={logout} href="/home">
                                      Sign Out
                                    </a>
                                  </li>
                                </ul>
                              </>
                            );
                          } else if (user.id) {
                            return (
                              <>
                                <Link
                                  to=""
                                  class="login"
                                  style={{ color: "#2042e3" }}
                                >
                                  <i class="lni lni-lock-alt"></i> User{" "}
                                </Link>
                                <ul class="sub-menu">
                                  <li>
                                    <Link to="/picture">Profile Picture</Link>
                                  </li>
                                  <li>
                                    <Link to="/profile">My Profile</Link>
                                  </li>
                                  <li>
                                    <Link onClick={gotToTop} to="/resume">
                                      Manage Account
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={gotToTop} to="/settings">
                                      Settings
                                    </Link>
                                  </li>
                                  <li>
                                    <a onClick={logout} href="/home">
                                      Sign Out
                                    </a>
                                  </li>
                                </ul>
                              </>
                            );
                          } else {
                            return (
                              <Link
                                to="/login"
                                class="login"
                                style={{ color: "#2042e3" }}
                              >
                                <i class="lni lni-lock-alt"></i> Candidate Login
                              </Link>
                            );
                          }
                        })()}
                      </li>

                  {!user.id && (
                    <li class="nav-item">
                      <Link onClick={gotToTop} to={emp?.id ? "/postJob" : "/emplogin"}  style={{ color: "#2042e3" }} >
                        Employer/Post Job
                      </Link>
                    </li>
                  )}
                   </ul>
                  </div>
                  <button
                    onClick={setDarkMode}
                    style={{
                      paddingLeft: "25px",
                      border: "0px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {isDarkMode ? (
                      <i class="fa fa-sun-o" style={{ fontSize: "17px" }}></i>
                    ) : (
                      <i class="fa fa-moon-o" style={{ fontSize: "17px" }}></i>
                    )}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
const mapStateToProps = (state) => {
  return { candidate: state.candidate, employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestLogin, requestEmpLogin, userLogout, requestRecentlyJob },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
