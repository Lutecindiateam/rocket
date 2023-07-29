import Footer from "../Components/footer";
import Header from "../Components/header";
import { RWebShare } from "react-web-share";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestEmpLogin,
  requestLogin,
  requestCountLastweekJob,
  requestRecentlyJob,
  requestCategory,
  requestAddBookmark,
  userLogout
} from "../Redux/actions";
import WOW from "wowjs";
import img from "../images/emp.jpg";
import image from "../images/extraLogo.png";
import logodashboard from '../assets/images/hero/hero-images.jpeg'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Swal from "sweetalert2";
import About from "../Section/aboutUsSection";
import Apply from "../Section/applyProcessSection";
import Jobcategory from "../Section/jobCategorySection";
import Client from "../Section/clientLogoSection";
import logo from '../assets/images/testimonial/test4.png'
import girlpic from '../assets/images/testimonial/test3.jpg'


function Home(props) {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [user, setUSer] = useState({});
  const [emp, setEmp] = useState({});
  // const [jobcount, setjobcount] = useState(0);
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    // props.requestCountLastweekJob();
    props.requestCategory();
    props.requestRecentlyJob({});
  }, []);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUSer(loginData.data.data);
        props.requestRecentlyJob({
          token: loginData.data.data.token,
        });
      }
    } else {
      props.requestRecentlyJob({});
    }
  }, []);
  // useEffect(() => {
  //   let loginData = props.candidate.loginData;
  //   if (loginData !== undefined) {
  //     console.log(loginData?.attributes?.email_verified === "true");
  //     if (loginData?.attributes?.email_verified === "true") {
  //       setUSer(loginData.attributes);
  //       props.requestRecentlyJob({
  //         token: loginData.data.data.token,
  //       });
  //     }
  //   } else {
  //     props.requestRecentlyJob({});
  //   }
  // }, []);

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
      }
    }
  }, [props.employee.empLoginData]);

  // useEffect(() => {
  //   let loginData = props.candidate.loginData;
  //   if (loginData !== undefined) {
  //     if (loginData?.data?.status == "success") {
  //       setUSer(loginData.data.data);
  //     }
  //   }
  // }, [props.candidate.loginData]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.attributes?.email_verified === "true") {
        setUSer(loginData.attributes);
      }
    }
  }, [props.candidate.loginData]);

  // useEffect(() => {
  //   let lastweekjob = props.candidate.lastWeekJobCount;
  //   if (lastweekjob !== undefined) {
  //     if (lastweekjob?.data?.status == "success") {
  //       setjobcount(lastweekjob.data.data);
  //     }
  //   }
  // }, [props.candidate.lastWeekJobCount]);

  useEffect(() => {
    let recentlyjob = props.candidate.recentlyAddedJobData;
    if (recentlyjob !== undefined) {
      if (recentlyjob?.data?.status == "success") {
        setjobs(recentlyjob.data.data);
      }
    }
  }, [props.candidate.recentlyAddedJobData]);

  // function bookmarkJobs(id) {
  //   if (user.id) {
  //     props.requestAddBookmark({
  //       token: user.token,
  //       id: id,
  //       data: {},
  //     });
  //   } else {
  //     localStorage.setItem("link", `/home`);
  //     navigate("/login");
  //   }
  // }

  // useEffect(() => {
  //   if (user.id) {
  //     let addBookmarkedData = props.candidate.addBookmarkedData;
  //     if (addBookmarkedData !== undefined) {
  //       if (addBookmarkedData?.data?.status == "success") {
          // Swal.fire("Good job!", "Bookmarked for Job successfully.", "success");
  //         props.candidate.addBookmarkedData = undefined;
  //         let loginData = props.candidate.loginData;
  //         if (loginData !== undefined) {
  //           if (loginData?.data?.status == "success") {
  //             setUSer(loginData.data.data);
  //             props.requestRecentlyJob({
  //               token: loginData.data.data.token,
  //             });
  //           }
  //         } else {
  //           props.requestRecentlyJob();
  //         }
  //       } else {
  //         Swal.fire("Error!", "Already bookmarked for the job.", "error");
  //         props.candidate.addBookmarkedData = undefined;
  //       }
  //     }
  //   } else {
  //     let addBookmarkedData = props.candidate.addBookmarkedData;
  //     if (addBookmarkedData !== undefined) {
  //       if (addBookmarkedData?.data?.status == "Token is Expired") {
  //         props.userLogout()
  //       }
  //     }
  //   }
  // }, [props.candidate.addBookmarkedData]);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
  const [categories, setCategories] = useState([]);
  const [items, setitems] = useState([]);
  const [state, setState] = useState({
    suggestions: [],
    text: "",
  });
  useEffect(() => {
    let categoryData = props.candidate.categoryData;
    if (categoryData) {
      if (categoryData?.data?.status == "success") {
        setCategories(categoryData.data.data.categories);
      }
    }
  }, [props.candidate.categoryData]);
  useEffect(() => {
    {
      categories.map((item1) => {
        if (items.indexOf(item1.name) === -1) {
          items.push(item1.name);
        }
      });
    }
  }, [categories]);
  function suggestionSelected(value) {
    setState(() => ({
      text: value,
      suggestions: [],
    }));
  }

  const onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter((v) => regex.test(v));
    }
    setState(() => ({ suggestions, text: value }));
  };

  function renderSuggestionsTitle() {
    const { suggestions } = state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="srchList">
        <div
          style={{
            backgroundColor: "white",
            margin: "0px -2px",
            marginTop: "1px",
            border: "2px solid rgba(13, 110, 253, .25)",
            borderRadius: "3px",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          <ul>
            {suggestions.map((item) => (
              <li
                style={{ fontSize: "14px", color: "black" }}
                onClick={() => suggestionSelected(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
      () => {
        setValue(description, false);
        clearSuggestions();
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      const text = main_text + ", " + secondary_text;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <small style={{ fontSize: "14px", color: "black" }}>
            {text.length > 20 ? text.substring(0, 20) + "..." : text}
          </small>
        </li>
      );
    });

  function submitForm(e) {
    e.preventDefault();
    localStorage.setItem("jobKeyword", state.text);
    localStorage.setItem("jobLocation", value);
    navigate("/browseJobs");
  }

  // function commentFunction(id) {
  //   localStorage.setItem("comment", "comment");
  //   navigate(`/jobDetails/${id}`);
  // }

  return (
    <>
      <Header name="Home" />
      <section class="hero-area">
        <div class="hero-inner">
          <div class="container">
            {emp.id ? (
              <div class="row ">
                <div class="col-lg-4 co-12">
                  <div class="inner-content">
                    <div class="hero-text">
                      <h4 class="wow fadeInUp" data-wow-delay=".3s">Welcome {emp.name} ...</h4>
                      <br />
                      <h1 class="wow fadeInUp" data-wow-delay=".3s">
                        Find Your <br /> Career to Make <br />a Better Life
                      </h1>
                      <br />
                      <br />
                      <div class="job-search-form">
                        <a class=" wow fadeInUp submit-btn" href="/postJob">
                          <button class="btn btn-primary" type="submit">
                            Post A Job
                          </button>
                        </a>
                      </div>
                    </div>
                    <div
                      class="job-search-wrap-two mt-50 wow fadeInUp"
                      data-wow-delay=".7s"
                    ></div>
                  </div>
                </div>
                <div class="col-lg-8 co-12">
                  <div
                    class="hero-video-head wow fadeInRight"
                    data-wow-delay=".5s"
                  >
                    <div class="video-inner">
                      <img src={img} alt="#" height="auto" width="100%" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div class="row">
                <div class="col-lg-6 co-12">
                  <div class="inner-content">
                    <div class="hero-text">
                      {}
                      <h1 class="wow fadeInUp" data-wow-delay=".3s">
                        Find Your Career <br />
                        to Make a Better Life
                      </h1>
                      <br />
                      <br />
                    </div>
                    <div
                      class="job-search-wrap-two mt-50 wow fadeInUp"
                      data-wow-delay=".7s"
                    >
                      <div class="job-search-form">
                        <form>
                          <div class="single-field-item keyword">
                            <label for="keyword">What</label>
                            <input
                              id="keyword"
                              placeholder="What jobs you want?"
                              name="keyword"
                              type="text"
                              style={{ height: "50px" }}
                              value={state.text}
                              onChange={onTextChanged}
                            />
                          </div>

                          <div class="single-field-item location">
                            <label for="location">Where</label>
                            <input
                              id="location"
                              class="input-field input-field-location"
                              placeholder="Location"
                              name="location"
                              type="text"
                              value={value}
                              onChange={handleInput}
                              disabled={!ready}
                              style={{ height: "50px" }}
                            />
                          </div>

                          <div class="submit-btn">
                            <button
                              class="btn"
                              type="submit"
                              style={{ height: "75px" }}
                              onClick={submitForm}
                            >
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="pr-0"
                        style={{ position: "relative", width: "37%" }}
                      >
                        <div class="col-md-12 justify-content-md-center">
                          {renderSuggestionsTitle()}
                        </div>
                      </div>
                      <div style={{ position: "relative", width: "37%" }}>
                        {status === "OK" && (
                          <div
                            style={{
                              backgroundColor: "white",
                              margin: "0px -2px",
                              marginTop: "1px",
                              border: "2px solid rgba(13, 110, 253, .25)",
                              borderRadius: "3px",
                              padding: "5px 5px",
                              cursor: "pointer",
                            }}
                          >
                            <ul>{renderSuggestions()}</ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 co-12">
                  <div
                    class="hero-video-head wow fadeInRight"
                    data-wow-delay=".5s"
                  >
                    <div class="video-inner">
                      {/* <img src="assets/images/hero/home-page4.jpg" alt="#" /> */}
                      <img src={logodashboard} alt="logo dashboard" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* {emp.id ? (
        <section class="apply-process section">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-12">
                <a href="/empregister">
                  {" "}
                  <div class="process-item">
                    <i class="lni lni-user"></i>
                    <h4>Register Your Account</h4>
                    <p>
                      Registering you account gives you access to Job Portal for
                      uploading jobs.
                    </p>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-md-4 col-12">
                <a href="/empProfile">
                  {" "}
                  <div class="process-item">
                    <i class="lni lni-book"></i>
                    <h4>Upload Your Profile</h4>
                    <p>
                      Profile can act as a plan for growing business operations
                      and revenue.
                    </p>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-md-4 col-12">
                <a href="/postJob">
                  <div class="process-item">
                    <i class="lni lni-briefcase"></i>
                    <h4>Post your Jobs</h4>
                    <p>
                      It is an official advertisement regarding a job opening or
                      vacancy.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Apply />
      )} */}

      {!emp.id && (
        <>
          {/* <Jobcategory />
          <About /> */}

          {/* <section class="call-action overlay section">
            <div class="container">
              <div class="row ">
                <div class="col-lg-8 offset-lg-2 col-12">
                  <div class="inner">
                    <div class="section-title">
                      <span class="wow fadeInDown" data-wow-delay=".2s">
                        GETTING STARTED TO WORK
                      </span>
                      <h2 class="wow fadeInUp" data-wow-delay=".4s">
                        Don’t just find. Be found. Put your CV in front of great
                        employers
                      </h2>
                      <p class="wow fadeInUp" data-wow-delay=".6s">
                        It helps you to increase your chances of finding a
                        suitable job and let recruiters contact you about jobs
                        that are not needed to pay for advertising.
                      </p>
                      <div class="button wow fadeInUp" data-wow-delay=".8s">
                        <a href="/addResumeForm" class="btn">
                          <i class="lni lni-upload"></i> Upload Your Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <section class="find-job job-list section">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="section-title">
                    <span class="wow fadeInDown" data-wow-delay=".2s">
                      Hot Jobs
                    </span>
                    <h2 class="wow fadeInUp" data-wow-delay=".4s">
                      Browse Recent Jobs
                    </h2>
                    <p class="wow fadeInUp" data-wow-delay=".6s">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form.
                    </p>
                  </div>
                </div>
              </div>
              <div class="single-head">
                <div class="row">
                  {
                  jobs.map((item, index) => {
                    const img = item.employee_logo
                      ? process.env.REACT_APP_API_HOST + item.employee_logo
                      : image;
                    return (
                      <>
                        <div class="col-lg-6 col-12" key={index}>
                          <div class="single-job">
                            <div class="job-image">
                              <a href={`/jobDetails/${item.id}`}>
                                <img
                                  src={img}
                                  alt="logo"
                                  height="50"
                                  style={{ marginTop: "5px" }}
                                />
                              </a>
                            </div>
                            <div class="job-content">
                              <h4>
                                <a href={`/jobDetails/${item.id}`}>
                                  {item.title}
                                </a>
                              </h4>
                              <a href={`/jobDetails/${item.id}`}>
                                <p>
                                  {item.description &&
                                    item.description.substring(0, 120)}
                                </p>
                              </a>
                              <ul>
                                <li>
                                  <i class="lni lni-website"></i>
                                  <a
                                    href={`${item.employee_website}`}
                                    target="_blank"
                                  >
                                    {" "}
                                    {item.employee_website}
                                  </a>
                                </li>
                                <li>
                                  <a href={`/jobDetails/${item.id}`}>
                                    {" "}
                                    {item.currency_name} {item.salary_from}-
                                    {item.salary_to}
                                  </a>
                                </li>
                                <li>
                                  <a href={`/jobDetails/${item.id}`}>
                                    {" "}
                                    <i class="lni lni-map-marker"></i>{" "}
                                    {item.city_name}, {item.state_name},{" "}
                                    {item.country_name}
                                  </a>
                                </li>
                              </ul>
                            </div>
                              {/* <div class="job-button ">
                              <ul>
                                <li>
                                <button
                                    style={{
                                      border: "0px",
                                      backgroundColor: "#edf0fd",
                                      color: "#2043e3",
                                      padding: "5px 8px",
                                      borderRadius: "5px",
                                      margin: "2px",
                                    }}
                                    onClick={() => {
                                      bookmarkJobs(item.id);
                                    }}
                                  >
                                    {item.isbookmarkJob ? (
                                      <i class="fa fa-heart"></i>
                                    ) : (
                                      <i class="fa fa-heart-o"></i>
                                    )}
                                  </button>
                                  <button
                                    style={{
                                      border: "0px",
                                      backgroundColor: "#edf0fd",
                                      color: "#2043e3",
                                      padding: "5px 8px",
                                      borderRadius: "5px",
                                      margin: "2px",
                                    }}
                                    onClick={() => {
                                      commentFunction(item.id);
                                    }}
                                  >
                                    <i class="fa fa-commenting-o"></i>
                                  </button>

                                  <RWebShare
                                    data={{
                                      text: "Job Portal",
                                      url: `${window.location.protocol}//${window.location.host}/jobDetails/${item.id}`,
                                      title: "Job Portal",
                                    }}
                                  >
                                    <button
                                      style={{
                                        border: "0px",
                                        backgroundColor: "#edf0fd",
                                        color: "#2043e3",
                                        padding: "5px 9px",
                                        borderRadius: "5px",
                                        margin: "2px",
                                      }}
                                    >
                                      <i class="fa fa-share-alt"></i>
                                    </button>
                                  </RWebShare>
                                </li>
                              </ul>
                            </div> */}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <br />
                <br />
                <div class="row">
                  <div class="col-12">
                    <div class="section-title">
                      <a href={`/jobList/1/10`} style={{ cursor: "pointer" }}>
                        <span class="wow fadeInDown" data-wow-delay=".2s">
                          View More
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class=" testimonials">
            <img
              class="patern1 wow fadeInRight"
              data-wow-delay=".3s"
              src="assets/images/testimonial/patern1.png"
              alt="#"
            />
            <img
              class="patern2 wow fadeInLeft"
              data-wow-delay=".5s"
              src="assets/images/testimonial/patern1.png"
              alt="#"
            />
            <div class="container">
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div
                    class="section-title align-left wow fadeInLeft"
                    data-wow-delay=".3s"
                  >
                    <span>What saye's Our Clients</span>
                    <h2>Our Testimonials</h2>
                  </div>
                  <div
                    class=" testimonial-inner-head wow fadeInLeft"
                    data-wow-delay=".3s"
                  >
                    <div class=" testimonial-inner">
                      <div class="testimonial-slider">
                        <div
                          id="carouselExampleControls"
                          class="carousel slide"
                          data-ride="carousel"
                        >
                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <div class="single-testimonial">
                                <div class="quote">
                                  <i class="lni lni-quotation"></i>
                                </div>
                                <p>
                                  " Your application system is fantastic, job hunting can be very frustrating and you are by far the most friendly and professional recruitment business I have worked with."{" "}
                                </p>
                                <div class="bottom">
                                  <div class="clien-image">
                                    <img
                                      src="assets/images/testimonial/testi1.jpg"
                                      alt="#"
                                    />
                                  </div>
                                  <h4 class="name">
                                    Musharof Chowdhury{" "}
                                    {/* <span>CEO - Graygrids</span> */}
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div class="carousel-item">
                              <div class="single-testimonial">
                                <div class="quote">
                                  <i class="lni lni-quotation"></i>
                                </div>
                                <p>
                                  "I found your application system really easy-to-use, while still allowing me to include all the information I needed to."{" "}
                                </p>
                                <div class="bottom">
                                  <div class="clien-image">
                                    <img
                                      src="assets/images/testimonial/testi2.jpg"
                                      alt="#"
                                    />
                                  </div>
                                  <h4 class="name">
                                    Naimur Rahman{" "}
                                    {/* <span>CEO - Wpthemes Grid</span> */}
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div class="carousel-item">
                              <div class="single-testimonial">
                                <div class="quote">
                                  <i class="lni lni-quotation"></i>
                                </div>
                                <p>
                                  "Having communications at all levels of the application process was a very much welcome surprise compared to other companies I have been through, two thumbs up from me!"{" "}
                                </p>
                                <div class="bottom">
                                  <div class="clien-image">
                                    <img
                                      // src="assets/images/testimonial/testi3.jpg"
                                      src={girlpic}
                                      alt="#"
                                    />
                                  </div>
                                  <h4 class="name">
                                   Sakshi Neelam
                                    {/* <span>CEO - Tredex</span> */}
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div class="carousel-item">
                              <div class="single-testimonial">
                                <div class="quote">
                                  <i class="lni lni-quotation"></i>
                                </div>
                                <p>
                                  " Seriously impressed with the level of support the team at Job Portal were able to provide myself when I was having technical issues applying for roles, very patient and friendly when it came to solving my problem."{" "}
                                </p>
                                <div class="bottom">
                                  <div class="clien-image">
                                    <img
                                      // src="assets/images/testimonial/testi4.jpg"
                                      src={logo}
                                      alt="#"
                                    />
                                  </div>
                                  <h4 class="name">
                                   Kartik Mahal
                                    {/* <span>CEO - Dream App</span> */}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                          <a
                            class="carousel-control-prev"
                            href="#carouselExampleControls"
                            role="button"
                            data-slide="prev"
                            style={{
                              position: "absolute",
                              bottom: "-300px",
                              left: "38%",
                            }}
                          >
                            <span
                              class="fa fa-long-arrow-left"
                              aria-hidden="true"
                              style={{
                                color: "white",
                                border: "2px solid white",
                                borderRadius: "25px",
                                padding: "8px",
                              }}
                            ></span>
                            <span class="sr-only">Previous</span>
                          </a>
                          <a
                            class="carousel-control-next"
                            href="#carouselExampleControls"
                            role="button"
                            data-slide="next"
                            style={{
                              position: "absolute",
                              bottom: "-300px",
                              right: "38%",
                            }}
                          >
                            <span
                              class="fa fa-long-arrow-right"
                              aria-hidden="true"
                              style={{
                                color: "white",
                                border: "2px solid white",
                                borderRadius: "25px",
                                padding: "8px",
                              }}
                            ></span>
                            <span class="sr-only">Next</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div
                    class="testimonial-right wow fadeInRight"
                    data-wow-delay=".5s"
                  >
                    <img
                      src="assets/images/testimonial/testimonial.png"
                      alt="image"
                      style={{ paddingRight: "40px" }}
                      height="500px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Client />
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return { employee: state.employee, candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestEmpLogin,
      requestLogin,
      requestCountLastweekJob,
      requestRecentlyJob,
      requestCategory,
      requestAddBookmark,
      userLogout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
