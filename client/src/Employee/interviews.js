import Footer from "../Components/footer";
import Header from "../Components/header";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestEmpLogin,
  requestGetInterview,
  requestInterviewApprove,
  requestInterviewReject,
} from "../Redux/actions";
import WOW from "wowjs";
import ManageAccount from "../Employee/manageAccount";
import profile1 from "../images/profile.png";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";

function Interview(props) {
  
  useEffect(() => {
    new WOW.WOW().init();
    localStorage.removeItem("link");
  }, []);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
        props.requestGetInterview({
          token: empLoginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/interviews");
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", "/interviews");
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let getInterviewData = props.employee.getInterviewData;
    if (getInterviewData !== undefined) {
      if (getInterviewData?.data?.status === "success") {
        setData(getInterviewData.data.data.interview);
      }
    }
  }, [props.employee.getInterviewData]);

  function approveCandidate(applied_id, interview_id) {
    props.requestInterviewApprove({
      token: emp.token,
      data: {
        interview_id: interview_id,
        applied_id: applied_id,
      },
    });
  }
  useEffect(() => {
    let interviewApproveData = props.employee.interviewApproveData;
    if (interviewApproveData !== undefined) {
      if (interviewApproveData?.data?.status === "success") {
        Swal.fire("Good job!", "Candidate Approved successfully.", "success");
        props.employee.interviewApproveData = undefined;
        props.requestGetInterview({
          token: emp.token,
        });
      } else {
        Swal.fire("Error!", `Something went wrong while approving candidate.`, "error");
        props.employee.interviewApproveData = undefined;
      }
    }
  }, [props.employee.interviewApproveData]);

  function rejectCandidate(applied_id, interview_id) {
    props.requestInterviewReject({
      token: emp.token,
      data: {
        interview_id: interview_id,
        applied_id: applied_id,
      },
    });
  }
  useEffect(() => {
    let interviewRejectData = props.employee.interviewRejectData;
    if (interviewRejectData !== undefined) {
      if (interviewRejectData?.data?.status == "success") {
        Swal.fire("Good job!", "Candidate Rejected successfully.", "success");
        props.employee.interviewRejectData = undefined;
        props.requestGetInterview({
          token: emp.token,
        });
      } else {
        Swal.fire("Error!", `Something went wrong while rejecting candidate.`, "error");
        props.employee.interviewRejectData = undefined;
      }
    }
  }, [props.employee.interviewRejectData]);

  function addData(){
    navigate('/manageApplications')
  }

  return (
    <>
      <Header />
      <Breadcrumbs title="Manage Interviews" />
      <div class="manage-jobs section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Interview" />

              <div class="col-lg-8 col-12">
                {data.length > 0 ? (
                  <div class="job-items">
                    <div class="manage-list">
                      <div class="row">
                        <div class="col-lg-4 col-md-4 col-12">
                          <p>Name</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <p>Job</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <p>Date and Time</p>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <p>Action</p>
                        </div>
                      </div>
                    </div>

                    {data.map((item, index) => {
                      const profile = item.profile
                        ? process.env.REACT_APP_API_HOST + item.profile
                        : profile1;
                      return (
                        <div class="manage-content" key={index}>
                          <div class="row align-items-center ">
                            <div class="col-lg-1 col-md-1 col-12">
                              <div class="title-img">
                                <div class="can-img">
                                  <img
                                    src={profile}
                                    alt="logo"
                                    style={{
                                      borderRadius: "5px",
                                      marginLeft: "-5px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-12">
                              <div class="title-img">
                                <h3>
                                  <a href={`/empViewResume/${item.id}`}>
                                    {" "}
                                    {item.first_name} {item.last_name}
                                  </a>
                                </h3>
                                <span>
                                  <a
                                    href={`mailto:${item.email}`}
                                    style={{ color: "black" }}
                                  >
                                    {" "}
                                    {item.email}{" "}
                                  </a>
                                  <br />
                                  <a
                                    href={`callto:${item.phone}`}
                                    style={{ color: "black" }}
                                  >
                                    {" "}
                                    {item.phone}
                                  </a>
                                </span>
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-12">
                              <div class="title-img">
                                <h3>{item.title}</h3>
                                <span>
                                  {item.salary_from}-{item.salary_to}
                                </span>
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-12">
                              <div class="title-img">
                                <h3>{item.interview_date}</h3>
                                <span>{item.mode}</span>
                              </div>
                            </div>
                            <div class="col-lg-2 col-md-2 col-12">
                              <button
                                style={{
                                  border: "0px",
                                  padding: "2px 5px",
                                  backgroundColor: "transparent",
                                }}
                                title="Approve"
                                onClick={() => {
                                  approveCandidate(
                                    item.applied_id,
                                    item.interview_id
                                  );
                                }}
                              >
                                <i
                                  style={{ color: "green", fontSize: "16px" }}
                                  class="fa fa-check"
                                ></i>
                              </button>
                              <button
                                style={{
                                  border: "0px",
                                  padding: "2px 5px",
                                  backgroundColor: "transparent",
                                }}
                                title="Reject"
                                onClick={() => {
                                  rejectCandidate(
                                    item.applied_id,
                                    item.interview_id
                                  );
                                }}
                              >
                                <i
                                  style={{ color: "red", fontSize: "16px" }}
                                  class="fa fa-times"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div class="job-items">
                     <>
                        <h6>You have not scheduled any interview.<br /><br /></h6>
                        <button
                          type="submit"
                          onClick={addData}
                          class="btn btn-primary me-2"
                          style={{ color: "white" }}
                        >
                          View Applications
                        </button>
                      </>
                  </div>
                )}
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
      requestGetInterview,
      requestInterviewApprove,
      requestInterviewReject,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Interview);
