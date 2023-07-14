import Footer from "./footer";
import Header from "./header";
import { useEffect, useState } from "react";
import WOW from "wowjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAddContact } from "../Redux/actions";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";

function Contact(props) {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  const [data, setData] = useState({});
  const [errorfirst_name, seterrorfirst_name] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorphone, seterrorphone] = useState("");
  const [errorsubject, seterrorsubject] = useState("");
  const [errormsg, seterrormsg] = useState("");
  const [error, setError] = useState(false);

  function onChangeData(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function validateFname() {
    let formIsValid = false;
    if (!data["name"]) {
      formIsValid = false;
      seterrorfirst_name("*Enter your name.");
    } else if (typeof data["name"] !== "undefined") {
      if (!data["name"].match(/^[a-zA-Z][a-zA-Z\s]+$/)) {
        formIsValid = false;
        seterrorfirst_name("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterrorfirst_name("");
      }
    }
    return formIsValid;
  }
  function validateEmail() {
    let formIsValid = false;
    if (!data["email"]) {
      formIsValid = false;
      seterroremail("*Enter your E-mail ID.");
    } else if (typeof data["email"] !== "undefined") {
      if (
        !data["email"].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        formIsValid = false;
        seterroremail("*Please enter valid E-mail ID.");
      } else {
        formIsValid = true;
        seterroremail("");
      }
    }
    return formIsValid;
  }
  function validatePhone() {
    let formIsValid = false;
    if (!data["phone"]) {
      seterrorphone("*Enter your Contact No.");
      formIsValid = false;
    } else if (data["phone"].length < 6) {
      seterrorphone("*Enter exact 10 digits.");
      formIsValid = false;
    } else {
      seterrorphone("");
      formIsValid = true;
    }
    return formIsValid;
  }
  function validateSubject() {
    let formIsValid = false;
    if (!data["subject"]) {
      formIsValid = false;
      seterrorsubject("*Enter your subject.");
    } else if (typeof data["subject"] === "undefined") {
      formIsValid = false;
      seterrorsubject("*Enter your subject.");
    } else {
      formIsValid = true;
      seterrorsubject("");
    }
    return formIsValid;
  }
  function validateMsg() {
    let formIsValid = false;
    if (!data["message"]) {
      formIsValid = false;
      seterrormsg("*Enter your message.");
    } else if (typeof data["message"] === "undefined") {
      formIsValid = false;
      seterrormsg("*Enter your message.");
    } else {
      formIsValid = true;
      seterrormsg("");
    }
    return formIsValid;
  }
  function validateForm() {
    let name = validateFname();
    let sub = validateSubject();
    let email = validateEmail();
    let phone = validatePhone();
    let msg = validateMsg();
    let valid = name && sub && email && phone && msg;
    return valid;
  }
  function submitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      props.requestAddContact({
        data: {
          email: data.email,
          name: data.name,
          subject: data.subject,
          message: data.message,
          phone: data.phone,
        },
      });
      setError(false)
    }else{
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if(errorfirst_name){
        document.getElementById("name").focus();
      }else if(errorsubject){
        document.getElementById("subject").focus();
      }else if(erroremail){
        document.getElementById("email").focus();
      }else if(errorphone){
        document.getElementById("phone").focus();
      }else if(errormsg){
        document.getElementById("message").focus();
      }
      setError(false)
    }
  },[error]);

  useEffect(() => {
    let addcontact = props.candidate.addContactData;
    if (addcontact !== undefined) {
      if (addcontact?.data?.status == "success") {
        Swal.fire("Good job!", "Query posted successfully.", "success");
        props.candidate.addContactData = undefined;
        setData({
          email: "",
          name: "",
          subject: "",
          message: "",
          phone: "",
        });
      } else {
        Swal.fire("Error!", "There is some error in posting query.", "error");
        props.candidate.addContactData = undefined;
      }
    }
  }, [props.candidate.addContactData]);
  return (
    <>
      <Header name="Contact" />
      <Breadcrumbs title="Contact Us" />
      <section id="contact-us" class="contact-us section">
        <div class="container">
          <div class="contact-head wow fadeInUp" data-wow-delay=".4s">
            <div class="row">
              <div class="col-lg-7 col-12">
                <div class="form-main">
                  <form class="form">
                    <div class="row">
                      <div class="col-lg-6 col-12">
                        <div class="form-group">
                          <input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            value={data.name}
                            onChange={onChangeData}
                            onBlur={validateFname}
                          />
                          {errorfirst_name && (
                            <div style={mystyle}>{errorfirst_name}</div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-6 col-12">
                        <div class="form-group">
                          <input
                            name="subject"
                            id="subject"
                            type="text"
                            placeholder="Your Subject"
                            value={data.subject}
                            onChange={onChangeData}
                            onBlur={validateSubject}
                          />
                          {errorsubject && (
                            <div style={mystyle}>{errorsubject}</div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-6 col-12">
                        <div class="form-group">
                          <input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Your Email"
                            value={data.email}
                            onChange={onChangeData}
                            onBlur={validateEmail}
                          />
                          {erroremail && (
                            <div style={mystyle}>{erroremail}</div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-6 col-12">
                        <div class="form-group">
                          <input
                            name="phone"
                            id="phone"
                            type="text"
                            placeholder="Your Phone"
                            value={data.phone}
                            onChange={onChangeData}
                            onBlur={validatePhone}
                          />
                          {errorphone && (
                            <div style={mystyle}>{errorphone}</div>
                          )}
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group message">
                          <textarea
                            name="message"
                            id="message"
                            placeholder="Your Message"
                            onChange={onChangeData}
                            onBlur={validateMsg}
                            value={data.message}
                          ></textarea>
                          {errormsg && <div style={mystyle}>{errormsg}</div>}
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="col-12">
                    <div class="form-group button">
                      <button type="submit" class="btn " onClick={submitForm}>
                        Submit Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 col-12">
                <div class="single-head">
                  <div class="contant-inner-title">
                    <h4>Contact Information</h4>
                    <p>
                      Business consulting excepteur sint occaecat cupidatat
                      consulting non proident.
                    </p>
                  </div>
                  <div class="single-info">
                    <i class="lni lni-phone"></i>
                    <ul>
                      <li>+522 672-452-1120</li>
                    </ul>
                  </div>
                  <div class="single-info">
                    <i class="lni lni-envelope"></i>
                    <ul>
                      <li>jobportal@gmail.com</li>
                    </ul>
                  </div>
                  <div class="single-info">
                    <i class="lni lni-map"></i>
                    <ul>
                      <li>
                        KA-62/1, Travel Agency, 45 Grand Central Terminal, New
                        York.
                      </li>
                    </ul>
                  </div>
                  <div class="contact-social">
                    <h5>Follow Us on</h5>
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
            </div>
          </div>
        </div>

        <div class="map-section">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="map-container">
                  <div class="mapouter">
                    <div class="gmap_canvas">
                      <iframe
                        width="100%"
                        height="400"
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?q=New%20York&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestAddContact }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
