import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestSubscribe } from "../Redux/actions";
import useIntercom from "use-intercom-hook";
import Swal from "sweetalert2";
import logoDashboard from '../images/Rocket.png'


function Footer(props) {

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  useIntercom(process.env.REACT_APP_INTERCOM_APP_ID);
  const [email, setemail] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [error, setError] = useState(false);
  function validateEmail() {
    let valid = false;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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
  function onchange(e) {
    setemail(e.target.value);
  }
  function onSubmitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      props.requestSubscribe({
        data: {
          email: email,
        },
      });
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if (errorEmail) {
        document.getElementById("emailsub").focus();
      }
      setError(false)
    }
  }, [error]);

  useEffect(() => {
    let subscribeData = props.candidate.subscribeData;
    if (subscribeData !== undefined) {
      if (subscribeData?.data?.status === "success") {
        Swal.fire(
          "Good job!",
          "Subscibed your email id successfully.",
          "success"
        );
        props.candidate.subscribeData = undefined;
        setemail("");
      } else {
        Swal.fire("Error!", "The email has already been taken.", "error");
        props.candidate.subscribeData = undefined;
        setemail("");
      }
    }
  }, [props.candidate.subscribeData]);

  function gototop() {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <footer class="footer">
        <div class="footer-middle">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-12">
                <div class="f-about single-footer">
                  <div class="logo">
                    <a href="/home">

                      <img src={logoDashboard} alt="logo dashboard" />
                      {/* <div
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
                            width: 100,
                            height: 40,
                          }}
                        >
                          <h4
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
                          </h4>
                        </div>
                      </div>*/}
                    </a>
                  </div>

                  <ul class="contact-address">
                    <li>
                      <span>Address:</span><a>
                        Flat no F-1, Vaishnav Jyoti Apts, Trisharan Nagar, Shastri Layout, Opposite Somalwar Nikhalas School,  Khamla Nagpur, 440 025</a>
                    </li>
                    <li>
                      <span>Email:</span>{" "}
                      <a href="mailto:jobportal@gmail.com">

                      </a>
                    </li>
                    <li>
                      <span>Call:</span>  <a href="callto:555-555-1234" ></a>
                    </li>
                  </ul>
                  <div class="footer-social">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-pinterest-p"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-12">
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-12">
                    <div class="single-footer f-link">
                      <h3>For Candidates</h3>
                      <ul>
                        <li>
                          <a href="/profile">User Profile</a>
                        </li>
                        <li>
                          <a href="/jobAlerts">Job Alerts</a>
                        </li>
                        <li>
                          <a href="/jobList/1/10">Job List</a>
                        </li>
                        <li>
                          <a href="/browseJobs">Browse Jobs</a>
                        </li>
                        <li>
                          <a href="/browseCategories">Browse Categories</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-12">
                    <div class="single-footer f-link">
                      <h3>For Employers</h3>
                      <ul>
                        <li>
                          <a href="/postJob">Post a New</a>
                        </li>
                        <li>
                          <a href="/empProfile">Company Profile</a>
                        </li>
                        <li>
                          <a href="/manageJobs">Manage Jobs</a>
                        </li>
                        <li>
                          <a href="/manageApplications">Manage Applications</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-12">
                    <div class="single-footer newsletter">
                      <h3>Join Our Newsletter</h3>
                      <p>
                        Subscribe to get the latest jobs posted, candidates...
                      </p>
                      <form onSubmit={onSubmitForm}>
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Your email address"
                            id="emailsub"
                            name="email"
                            value={email}
                            onBlur={validateEmail}
                            onChange={onchange}
                          />
                          {errorEmail && (
                            <div style={mystyle}>{errorEmail}</div>
                          )}
                          <div class="button">
                            <button class="btn ">Subscribe Now!</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="container">
            <div class="inner">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="left"></div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="right">
                    <ul>
                      <li>
                        <a href="/privacyPolicy"> Privacy Policy</a>
                      </li>
                      <li>
                        <a href="/faq">Faq</a>
                      </li>
                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a
        class="scroll-top btn-hover"
        onClick={gototop}
        style={{ bottom: "100px", textDecoration: "none" }}
      >
        <i class="fa fa-chevron-up"></i>
      </a>
    </>
  );
}
const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestSubscribe }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
