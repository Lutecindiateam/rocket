import { useNavigate, useParams } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestJobDetails,
  requestLogin,
  requestApplyJob,
  requestAddBookmark,
  requestCheckBookmarkApplied,
  requestEmpLogin,
  requestAddComment,
  requestGetComment,
  requestGetCandidate
} from "../Redux/actions";
import { useEffect, useState } from "react";
import WOW from "wowjs";
import image from "../images/extraLogo.png";
import Swal from "sweetalert2";
import profile1 from "../images/profile.png";
import Breadcrumbs from "../Section/breadcrumbsSection";
import Geocode from "react-geocode";
import dashboard from '../../src/assets/images/advertisement/add1.png'


function JobDetails(props) {

  const [data, setData] = useState({});
  const [check, setCheck] = useState({});
  const [img, setImg] = useState("");
  const [user, setuser] = useState({});
  const[profile , setprofile] = useState({});
  const [emp, setEmp] = useState({});
  const [publish, setpublish] = useState([]);
  const [msg, setmsg] = useState("");
  const params = useParams();
  const [candidatecomments, setcandidatecomments] = useState([]);
  const [employeecomments, setemployeecomments] = useState([]);
  const [lat, setlat] = useState(0);
  const [lng, setlng] = useState(0);
  const [address, setaddress] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   new WOW.WOW().init();
  //   if (localStorage.getItem("comment")) {
  //     const element = document.getElementById("commentid");
  //     // element.scrollIntoView();
  //     window.scrollTo(0, element.offsetTop);
  //     localStorage.removeItem("comment");
  //   } else {
  //     window.scrollTo(0, 0);
  //   }
  //   localStorage.removeItem("link");
  // }, []);
  useEffect(() => {
    new WOW.WOW().init();
    // localStorage.removeItem("link");
    localStorage.removeItem("link1")
  }, []);

  useEffect(() => {
    let comments = props.candidate.commentsData;
    if (comments !== undefined) {
      if (comments?.data?.status === "success") {
        setcandidatecomments(comments.data.data.commentscandidate);
        setemployeecomments(comments.data.data.commentsemployers);
      }
    }
  }, [props.candidate.commentsData]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    // console.log(props);
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setuser(loginData.data.data);
      }
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let candidateData = props.candidate.getCandidateData;
    if (candidateData !== undefined) {
      if (candidateData?.data?.status === "success") {
        setprofile(candidateData.data.data);
      }
    }
  }, [props.candidate.getCandidateData]);
// console.log(user);
  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status === "success") {
        setEmp(empLoginData.data.data);
      }
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    props.requestJobDetails({
      id: params.id,
    });
    props.requestGetComment({
      id: params.id,
    });
  }, []);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setuser(loginData.data.data);
        props.requestCheckBookmarkApplied({
          data: {
            candidate_id: loginData.data.data.id,
            job_id: params.id,
          },
        });
        props.requestGetCandidate({
          id: loginData.data.data.id,
          token: loginData.data.data.token,
        });
      }
    }
  }, [props.candidate.loginData]);
  useEffect(() => {
    let check = props.candidate.checkData;
    if (check !== undefined) {
      if (check?.data?.status == "success") {
        setCheck(check.data.data);
      }
    }
  }, [props.candidate.checkData]);

  useEffect(() => {
    let jobDetailsData = props.candidate.jobDetailsData;
    if (jobDetailsData !== undefined) {
      if (jobDetailsData?.data?.status == "success") {
        setData(jobDetailsData.data.data.job[0]);
        setpublish(jobDetailsData.data.data.job[0].createdAt.split("T"));
        setImg(
          process.env.REACT_APP_API_HOST +
          jobDetailsData.data.data.job[0].employee_logo
        );
      }
    }
  }, [props.candidate.jobDetailsData]);


  function applyJobs(id) {
    if (user.id) {
      if(profile.status === true){
      props.requestApplyJob({
        token: user.token,
        id: id,
        data: {},
      });
    }else{
      localStorage.setItem("link1", `/jobDetails/${params.id}`);
      Swal.fire("Alert!", "Please complete your profile.", "error");
      navigate("/profile");
    }
    } else {
      localStorage.setItem("link", `/jobDetails/${params.id}`);
      Swal.fire("Alert!", "Please register your account.", "error");
      navigate("/login");
    }
  }

  // function bookmarkJobs(id) {
  //   let loginData = props.candidate.loginData;
  //   if (loginData !== undefined) {
  //     if (loginData?.data?.status == "success") {
  //       setuser(loginData.data.data);
  //       props.requestAddBookmark({
  //         token: loginData.data.data.token,
  //         id: id,
  //         data: {},
  //       });
  //     } else {
  //       localStorage.setItem("link", `/jobDetails/${params.id}`);
  //       navigate("/login");
  //     }
  //   } else {
  //     localStorage.setItem("link", `/jobDetails/${params.id}`);
  //     navigate("/login");
  //   }
  // }

  useEffect(() => {
    let applyJobData = props.candidate.applyJobData;
    if (applyJobData !== undefined) {
      if (applyJobData?.data?.status == "success") {
        Swal.fire("Good job!", "Applied for Job successfully.", "success");
        props.candidate.applyJobData = undefined;
        navigate("/appliedJobs");
      } else {
        Swal.fire("Alert!", "Already applied for the job.", "error");
        props.candidate.applyJobData = undefined;
      }
    }
  }, [props.candidate.applyJobData]);

  // useEffect(() => {
  //   let addBookmarkedData = props.candidate.addBookmarkedData;
  //   if (addBookmarkedData !== undefined) {
  //     if (addBookmarkedData?.data?.status == "success") {
  //       Swal.fire("Good job!", "Bookmarked for Job successfully.", "success");
  //       props.candidate.addBookmarkedData = undefined;
  //       navigate("/bookmarked");
  //     } else {
  //       Swal.fire("Error!", "Already bookmarked for the job.", "error");
  //       props.candidate.addBookmarkedData = undefined;
  //     }
  //   }
  // }, [props.candidate.addBookmarkedData]);

  // function changemsg(e) {
  //   setmsg(e.target.value);
  // }

  // function addCommentDatabtn() {
  //   let loginData = props.candidate.loginData;
  //   let empLoginData = props.employee.empLoginData;
  //   if (loginData) {
  //     props.requestAddComment({
  //       data: {
  //         job_id: params.id,
  //         msg: msg,
  //         user_id: user.id,
  //         type: "candidate",
  //       },
  //     });
  //   } else if (empLoginData) {
  //     props.requestAddComment({
  //       data: {
  //         job_id: params.id,
  //         msg: msg,
  //         user_id: emp.id,
  //         type: "employee",
  //       },
  //     });
  //   } else {
  //     Swal.fire(
  //       "Error!",
  //       "You have to first login for giving comment.",
  //       "error"
  //     );
  //   }
  // }

  // useEffect(() => {
  //   let addCommentData = props.candidate.addCommentData;
  //   if (addCommentData !== undefined) {
  //     if (addCommentData?.data?.status === "success") {
  //       Swal.fire("Good job!", "Comment added successfully.", "success");
  //       props.candidate.addCommentData = undefined;
  //       setmsg("");
  //       props.requestGetComment({
  //         id: params.id,
  //       });
  //       const element = document.getElementById("commentid");
  //       element.scrollIntoView();
  //     } else {
  //       Swal.fire("Error!", "There is some error in adding comment.", "error");
  //       props.candidate.addCommentData = undefined;
  //     }
  //   }
  // }, [props.candidate.addCommentData]);

  Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY);
  useEffect(() => {
    setaddress(
      data.company_name +
      "," +
      data.employee_location +
      "," +
      data.city_name +
      "," +
      data.state_name +
      "," +
      data.country_name
    );
    Geocode.fromAddress(`${address}`).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setlat(lat);
        setlng(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [params.id, data]);

  return (
    <>
      <Header />
      <Breadcrumbs title="Job Details" />
      <div class="job-details section">
        <div class="container">
          <div class="row mb-n5">
            <div class="col-lg-8 col-12">
              <div class="job-details-inner">
              <h3 class="title">{data.company_name}</h3>
<br />
                <div class="job-details-head row mx-0">
                  <div class="company-logo col-auto">               
                    <a
                      href="/#"
                      style={{ borderRadius: "4px", overflow: "hidden" }}
                    >
                      {data.employee_logo ? (
                        <img
                          src={img}
                          alt="Company Logo"
                          height="60"
                          width="60"
                        />
                      ) : (
                        <img
                          src={image}
                          alt="Company Logo"
                          height="60"
                          width="60"
                        />
                      )}
                    </a>
                  </div>
                  <div class="salary-type col-auto order-sm-3">
                    <span
                      class="salary-range"
                      style={{ backgroundColor: "transparent" }}
                    >
                      {/* {data.currency_name}  */}
                    <h5>INR {data.salary_from}-{data.salary_to}</h5>
                    </span>
                    {/* <span class="badge ">{data.shift_name}</span> */}
                  </div>
                  <div class="content col">
                    <h5 class="title">{data.title}</h5>
                    <ul class="meta">
                      <li>
                        <strong class="text-primary">
                          <i class="fa fa-map-marker" aria-hidden="true"></i>
                        </strong>
                      </li>
                      <li>
                        {data.city_name}, {data.state_name}
                        {/* , {data.country_name} */}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="job-details-body">
                  <p>
                    <b style={{ color: "black" }}>Job Position: </b>{" "}
                    {data.category}
                  </p>
                  <p>
                    <b style={{ color: "black" }}>Qualification: </b>{" "}
                    {data.degree_level}
                  </p>
                  <p>
                    <b style={{ color: "black" }}>Total Vacancy: </b>{" "}
                    {data.vacancy}
                  </p>
                  {/* <p>
                    <b style={{ color: "black" }}>Recruiter E-mail: </b>{" "}
                    {data.Recruiter_email}
                  </p> */}
                  <h6>Job Description :</h6>
                  <br />
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      fontStyle: "normal",
                      color: "#7E8890",
                      fontSize: "14px",
                    }}
                  >
                    {data.description}
                  </pre>
                  <ul class="job-overview list-unstyled">
                      <li>
                        <strong>Published on:</strong> {publish[0]}
                      </li>
                      {/* <li>
                        <strong>Employment Status:</strong> {data.shift_name}
                      </li> */}
                      <li>
                        <strong>Experience:</strong>{" "}
                        {data.experience
                          ? data.experience + " years"
                          : "Fresher or experienced"}
                      </li>
                      <li>
                        <strong>Job Location:</strong> {data.city_name},{" "}
                        {data.state_name}, {data.country_name}
                      </li>
                      <li>
                        <strong>Salary:</strong> {data.currency_name}{" "}
                        {data.salary_from}-{data.salary_to}
                      </li>
                      <li>
                        <strong>Gender:</strong>
                        {(() => {
                          if (data.gender === 1) {
                            return <span>Male</span>;
                          } else if (data.gender === 0) {
                            return <span>Female</span>;
                          } else {
                            return <span>Any</span>;
                          }
                        })()}
                      </li>
                      <li>
                        <strong>Application Deadline:</strong>{" "}
                        {data.expiry_date}
                      </li>
                    </ul>
                </div>
              </div>
              <br />

              <div class="job-details-inner">
                <div class="job-details-head row mx-0">
                  <div class="company-logo col-auto">
                    <a
                      href="/#"
                      style={{ borderRadius: "4px", overflow: "hidden" }}
                    >
                      {data.employee_logo ? (
                        <img
                          src={img}
                          alt="Company Logo"
                          height="60"
                          width="60"
                        />
                      ) : (
                        <img
                          src={image}
                          alt="Company Logo"
                          height="60"
                          width="60"
                        />
                      )}
                    </a>
                  </div>

                  <div class="content col">
                    <h5 class="title">{data.company_name}</h5>
                    <ul class="meta">
                      <li>
                        <strong class="text-primary">
                          <i class="fa fa-map-marker" aria-hidden="true"></i>
                        </strong>
                      </li>
                      <li>
                        {data.city_name}, {data.state_name}
                        {/* , {data.country_name} */}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="job-details-body">
                  {/* <p>
                    <b style={{ color: "black" }}>CEO: </b> {data.employee_ceo}
                  </p> */}
                  <p>
                    <b style={{ color: "black" }}>E-mail: </b>{" "}
                    {data.employee_email}
                  </p>
                  <p>
                    <b style={{ color: "black" }}>Website: </b>{" "}
                    {data.employee_website}
                  </p>

                  <h6>Company Details :</h6>
                  <p>{data.employee_details}</p>
                  <h6>Company About Us :</h6>
                  <p>{data.employee_about_us}</p>
                </div>
              </div>
            </div>
            

            <div class="col-lg-4 col-12">
              <div class="job-details-sidebar">
                <div class="sidebar-widget">
                  <div class="inner">
                    <div class="row m-n2 button">
                      {/* <div
                        class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2"
                        onClick={() => {
                          bookmarkJobs(data.id);
                        }}
                      >
                        <a class="d-block btn">
                          {check.bookmarkJob === true ? (
                            <>
                              <i class="fa fa-heart mr-1"></i>Bookmarked
                            </>
                          ) : (
                            <>
                              <i class="fa fa-heart-o mr-1"></i> Save Job
                            </>
                          )}
                        </a>
                      </div> */}
                      <div
                        class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2"
                        onClick={() => {
                          applyJobs(data._id);
                        }}
                      >
                        <a class="d-block btn btn-alt">
                          {check.appliedJob === true ? "Applied" : "Apply Now"}{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="sidebar-widget">
                  {/* <div class="inner"> */}
                    <img src={dashboard} style={{width: "100%"}}/>
                     {/*<h6 class="title">Job Overview</h6>
                    <ul class="job-overview list-unstyled">
                      <li>
                        <strong>Published on:</strong> {publish[0]}
                      </li>
                      <li>
                        <strong>Employment Status:</strong> {data.shift_name}
                      </li>
                      <li>
                        <strong>Experience:</strong>{" "}
                        {data.experience
                          ? data.experience + " years"
                          : "Fresher or experienced"}
                      </li>
                      <li>
                        <strong>Job Location:</strong> {data.city_name},{" "}
                        {data.state_name}, {data.country_name}
                      </li>
                      <li>
                        <strong>Salary:</strong> {data.currency_name}{" "}
                        {data.salary_from}-{data.salary_to}
                      </li>
                      <li>
                        <strong>Gender:</strong>
                        {(() => {
                          if (data.gender === 1) {
                            return <span>Male</span>;
                          } else if (data.gender === 0) {
                            return <span>Female</span>;
                          } else {
                            return <span>Any</span>;
                          }
                        })()}
                      </li>
                      <li>
                        <strong>Application Deadline:</strong>{" "}
                        {data.expiry_date}
                      </li>
                    </ul>
                    */}
                  {/* </div>  */}
                </div>

                <div class="sidebar-widget">
                  <div class="inner">
                    <h6 class="title">Job Location</h6>
                    <div class="mapouter">
                      <div class="gmap_canvas">
                        <iframe
                          width="100%"
                          height="300"
                          id="gmap_canvas"
                          src={`https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&center=${lat},${lng}&output=embed`}
                          frameborder="0"
                          scrolling="no"
                          marginheight="0"
                          marginwidth="0"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div class="sidebar-widget" id="commentid">
                  <div class="inner">
                    <h6 class="title">Comment</h6>
                    <div style={{ position: "relative" }}>
                      <input
                        class="form-control"
                        type="text"
                        name="msg"
                        value={msg}
                        onChange={changemsg}
                        placeholder="Comments here"
                      />

                      <button
                        onClick={addCommentDatabtn}
                        type="button"
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid green",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                          padding: "5.5px 4px"
                        }}
                      >
                        <i
                          class="fa fa-paper-plane"
                          style={{ color: "green", transform: "rotate(45deg)" }}
                        ></i>
                      </button>
                    </div>
                    <br />
                    {candidatecomments.map((item, index) => {
                      const profile = item.profile
                        ? process.env.REACT_APP_API_HOST + item.profile
                        : profile1;
                      return (
                        <div class="row">
                          <div style={{ width: "20%", float: "left" }}>
                            <img src={`${profile}`} height="50" width="50" />
                          </div>
                          <div
                            style={{
                              width: "80%",
                              float: "right",
                              overflowWrap: "break-word",
                            }}
                          >
                            <b>
                              {item.first_name} {item.last_name}
                            </b>
                            <p style={{ wordWrap: "break-word" }}>{item.msg}</p>
                          </div>
                        </div>
                      );
                    })}
                    {employeecomments.map((item, index) => {
                      const profile = item.logo
                        ? process.env.REACT_APP_API_HOST + item.logo
                        : image;
                      return (
                        <div class="row">
                          <div style={{ width: "20%", float: "left" }}>
                            <img src={`${profile}`} height="50" width="50" />
                          </div>
                          <div
                            style={{
                              width: "80%",
                              float: "right",
                              overflowWrap: "break-word",
                            }}
                          >
                            <b>{item.name}</b>
                            <p style={{ wordWrap: "break-word" }}>{item.msg}</p>
                          </div>
                        </div>
                      );
                    })}

                  </div> 
                   </div> */}
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
  return { candidate: state.candidate, employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestJobDetails,
      requestLogin,
      requestApplyJob,
      requestAddBookmark,
      requestCheckBookmarkApplied,
      requestEmpLogin,
      requestAddComment,
      requestGetComment,
      requestGetCandidate
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
