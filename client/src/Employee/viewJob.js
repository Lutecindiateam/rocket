import Footer from "../Components/footer";
import Header from "../Components/header";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestJobDetails,
  requestEmpLogin,
  requestGetComment,
} from "../Redux/actions";
import WOW from "wowjs";
import ManageAccount from "../Employee/manageAccount";
import image from "../images/extraLogo.png";
import profile1 from "../images/profile.png";
import Breadcrumbs from "../Section/breadcrumbsSection";

function ViewJob(props) {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
    localStorage.removeItem("link");
  }, []);
  const params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});
  const [img, setImg] = useState("");
  const [publish, setpublish] = useState([]);
  const [candidatecomments, setcandidatecomments] = useState([]);
  const [employeecomments, setemployeecomments] = useState([]);

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
        props.requestJobDetails({
          id: params.id,
        });
        props.requestGetComment({
          id: params.id,
        });
      } else {
        localStorage.setItem("link", `/empViewJob/${params.id}`);
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", `/empViewJob/${params.id}`);
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let jobDetailsData = props.candidate.jobDetailsData;
    if (jobDetailsData !== undefined) {
      if (jobDetailsData?.data?.status == "success") {
        setData(jobDetailsData.data.data.job[0]);
        setImg(
          process.env.REACT_APP_API_HOST +
            jobDetailsData.data.data.job[0].employee_logo
        );
        setpublish(jobDetailsData.data.data.job[0].createdAt.split("T"));
      }
    }
  }, [props.candidate.jobDetailsData]);

  // useEffect(() => {
  //   let comments = props.candidate.commentsData;
  //   if (comments !== undefined) {
  //     if (comments?.data?.status === "success") {
  //       setcandidatecomments(comments.data.data.commentscandidate);
  //       setemployeecomments(comments.data.data.commentsemployers);
  //     }
  //   }
  // }, [props.candidate.commentsData]);
// console.log(data);
  return (
    <>
      <Header />
      <Breadcrumbs title="Manage Jobs" />
      <div class="manage-jobs section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Job" />

              <div class="col-lg-8 col-12 ">
                <div
                  class=" job-details section"
                  style={{ marginTop: "-100px" }}
                >
                  <div class="job-details-inner">
                    <div class="job-details-head row mx-0">
                      <div class="company-logo col-auto">
                        <a style={{ borderRadius: "4px", overflow: "hidden" }}>
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
                          {/* {data.currency_name} */}
                           <>INR {data.salary_from}-{data.salary_to} L</>
                        </span>
                        {/* <span class="badge">
                          {data.shift_name}
                        </span> */}
                      </div>
                      <div class="content col">
                        <h5 class="title">{data.title}</h5>
                        <ul class="meta">
                          <li>
                            <strong class="text-primary">
                              <i
                                class="fa fa-map-marker"
                                aria-hidden="true"
                              ></i>
                            </strong>
                          </li>
                          <li>
                            {data.city_name}, {data.state_name}
                            {/* ,{" "} */}
                            {/* {data.country_name} */}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="row">
                      <div class="job-details-body col-lg-8">
                        <p>
                          <b style={{ color: "black" }}>Job Category: </b>{" "}
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
                      </div>
                      <div class="sidebar-widget col-lg-4">
                        <div class="inner" style={{ color: "black" }}>
                          <h6 class="title">Job Overview</h6>
                          <br />
                          <ul class="job-overview list-unstyled">
                            <li>
                              <strong>Published on: </strong> {publish[0]}
                            </li>
                            <br />
                            {/* <li>
                              <strong>Employment Status:</strong>{" "}
                              {data.shift_name}
                            </li>
                            <br /> */}
                            <li>
                              <strong>Experience: </strong>{" "}
                              {data.experience
                                ? data.experience + " years"
                                : "Fresher or experienced"}
                            </li>
                            <br />
                            <li>
                              <strong>Salary: </strong> 
                              {/* {data.currency_name}{" "} */}
                              <>INR {data.salary_from}-{data.salary_to}</>
                            </li>
                            <br />
                            <li>
                              <strong>Gender: </strong>
                              {(() => {
                                if (data.gender === 1) {
                                  return <span> Male</span>;
                                } else if (data.gender === 0) {
                                  return <span> Female</span>;
                                } else {
                                  return <span> Any</span>;
                                }
                              })()}
                            </li>
                            <br />
                            <li>
                              <strong>Application Deadline:</strong>{" "}
                              {data.expiry_date.slice(0, 10)}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {candidatecomments.length > 0 || employeecomments > 0 ? (
                  <div class="job-items">
                    <div class="manage-list">
                      <div class="job-details-head row mx-0">
                        <div class="content col">
                          <h5 class="title">Comments</h5>
                        </div>
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
                                // overflow: "hidden",
                                overflowWrap: "break-word",
                              }}
                            >
                              <b>
                                {item.first_name} {item.last_name}
                              </b>
                              <p style={{ wordWrap: "break-word" }}>
                                {item.msg}
                              </p>
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
                              <p style={{ wordWrap: "break-word" }}>
                                {item.msg}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    <div class="job-items">
                      <div class="manage-list">
                        <div class="job-details-head row mx-0">
                          <div class="content col">
                            <h5 class="title">Comments</h5>
                            <br />
                            <p>No comments are added.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </> 
               )} */}
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
  return { employee: state.employee, candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestEmpLogin, requestJobDetails, requestGetComment },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewJob);
