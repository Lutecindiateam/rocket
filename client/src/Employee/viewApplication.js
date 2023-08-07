import Footer from "../Components/footer";
import Header from "../Components/header";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestJobDetails,
  requestEmpLogin,
  requestCandidateForJob,
  requestApprove,
  requestReject,
  requestSchedule,
  requestScheduleInterview,
  requestInterview,
  requestRescheduleInterview,
} from "../Redux/actions";
import WOW from "wowjs";
import ManageAccount from "../Employee/manageAccount";
import image from "../images/extraLogo.png";
import profile1 from "../images/profile.png";
import Breadcrumbs from "../Section/breadcrumbsSection";
import Swal from "sweetalert2";


function ViewApplication(props) {

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
    localStorage.removeItem("link");
  }, []);
  const params = useParams();
  const [data, setData] = useState([]);
  const [id, setid] = useState(0);
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});
  const [img, setImg] = useState("");
  const [application, setApplication] = useState([]);
  const [editmodal, seteditModal] = useState(false);
  const [editdata, seteditdata] = useState({
    interview_date: "",
    mode: "",
  });
  const [errormode, seterrormode] = useState("");
  const [errordate, seterrordate] = useState("");
  const [editreschedulemodal, seteditrescheduleModal] = useState(false);
  const [editrescheduleData, seteditrescheduleData] = useState({});
  const [errorreschedulemode, seterrorreschedulemode] = useState("");
  const [errorrescheduledate, seterrorrescheduledate] = useState("");
  const [publish, setpublish] = useState([]);
  const [error, setError] = useState(false);

  function onchangeeditdata(e) {
    seteditdata((editdata) => ({
      ...editdata,
      [e.target.name]: e.target.value,
    }));
  }

  function onchangeeditscheduleData(e) {
    seteditrescheduleData((editrescheduleData) => ({
      ...editrescheduleData,
      [e.target.name]: e.target.value,
    }));
  }

  const edittoggle = (id) => {
    if (editmodal === true) {
      seteditModal(!editmodal);
    } else {
      seteditModal(!editmodal);
      setid(id);
      seteditdata({
        interview_date: "",
        mode: "",
      });
    }
  };

  const editrescheduletoggle = (id) => {
    if (editreschedulemodal === true) {
      seteditrescheduleModal(false);
    } else {
      seteditrescheduleModal(true);
      props.requestInterview({
        id: id,
      });
    }
  };

  function validateMode() {
    let formIsValid = false;
    if (typeof editdata["mode"] === "undefined") {
      formIsValid = false;
      seterrormode("*Select mode for interview.");
    } else if (editdata["mode"] === "") {
      formIsValid = false;
      seterrormode("*Select mode for interview.");
    } else {
      formIsValid = true;
      seterrormode("");
    }
    return formIsValid;
  }
  function validateDate() {
    let formIsValid = false;
    var Today = new Date();
    if (typeof editdata["interview_date"] !== "undefined") {
      if (new Date(editdata["interview_date"]).getTime() <= Today.getTime()) {
        formIsValid = false;
        seterrordate("*Please select proper date and time.");
      } else if (editdata["interview_date"] === "") {
        formIsValid = false;
        seterrordate("*Please select date and time.");
      } else {
        formIsValid = true;
        seterrordate("");
      }
    } else {
      formIsValid = false;
      seterrordate("*Select date and time for interview.");
    }
    return formIsValid;
  }
  function validateForm() {
    let date = validateDate();
    let mode = validateMode();
    let valid = date && mode;
    return valid;
  }

  const saveedittoggle = (e) => {
    e.preventDefault();
    if (validateForm()) {
      props.requestScheduleInterview({
        token: emp.token,
        data: {
          interview_date: editdata.interview_date,
          mode: editdata.mode,
          applied_id: id,
        },
      });
      scheduleCandidate(id);
      seteditdata({
        interview_date: "",
        mode: "",
      });
      setid(0);
      edittoggle();
      setError(false)
    }else{
      setError(true)
    }
  };

  useEffect(() => {
    let scheduleInterviewData = props.employee.scheduleInterviewData;
    if (scheduleInterviewData !== undefined) {
      if (scheduleInterviewData?.data?.status === "success") {
        Swal.fire("Good job!", "Interview scheduled successfully.", "success");
        props.employee.scheduleInterviewData = undefined;
        props.requestCandidateForJob({
          id: params.id,
        });
      } else {
        Swal.fire("Error!", `Something went wrong while scheduling interview.`, "error");
        props.employee.scheduleInterviewData = undefined;
      }
    }
  }, [props.employee.scheduleInterviewData]);

  function validaterescheduleMode() {
    let formIsValid = false;
    if (typeof editrescheduleData["mode"] === "undefined") {
      formIsValid = false;
      seterrorreschedulemode("*Select mode for interview.");
    } else if (editrescheduleData["mode"] === "") {
      formIsValid = false;
      seterrorreschedulemode("*Select mode for interview.");
    } else {
      formIsValid = true;
      seterrorreschedulemode("");
    }
    return formIsValid;
  }
  function validaterescheduleDate() {
    let formIsValid = false;
    var Today = new Date();
    if (typeof editrescheduleData["interview_date"] !== "undefined") {
      if (
        new Date(editrescheduleData["interview_date"]).getTime() <=
        Today.getTime()
      ) {
        formIsValid = false;
        seterrorrescheduledate("*Please select proper date and time.");
      } else if (editrescheduleData["interview_date"] === "") {
        formIsValid = false;
        seterrorrescheduledate("*Please select date and time.");
      } else {
        formIsValid = true;
        seterrorrescheduledate("");
      }
    } else {
      formIsValid = false;
      seterrorrescheduledate("*Select date and time for interview.");
    }
    return formIsValid;
  }
  function validaterescheduleForm() {
    let date = validaterescheduleDate();
    let mode = validaterescheduleMode();
    let valid = date && mode;
    return valid;
  }

  const saveeditrescheduletoggle = (e) => {
    e.preventDefault();
    if (validaterescheduleForm()) {
      props.requestRescheduleInterview({
        token: emp.token,
        id: editrescheduleData.id,
        data: {
          interview_date: editrescheduleData.interview_date,
          mode: editrescheduleData.mode,
          applied_id: editrescheduleData.applied_id,
          conform: editrescheduleData.conform,
        },
      });
      editrescheduletoggle();
      setError(false)
    }else{
      setError(true)
    }
  };

  useEffect(() => {
    let rescheduleInterviewData = props.employee.rescheduleInterviewData;
    if (rescheduleInterviewData !== undefined) {
      if (rescheduleInterviewData?.data?.status === "success") {
        Swal.fire(
          "Good job!",
          "Interview rescheduled successfully.",
          "success"
        );
        props.employee.rescheduleInterviewData = undefined;
        props.requestCandidateForJob({
          id: params.id,
        });
      } else {
        Swal.fire("Error!", `Something went wrong while rescheduling interview.`, "error");
        props.employee.rescheduleInterviewData = undefined;
      }
    }
  }, [props.employee.rescheduleInterviewData]);


  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    // console.log(empLoginData);
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
        props.requestJobDetails({
          id: params.id,
        });
        props.requestCandidateForJob({
          id: params.id,
        });
      } else {
        localStorage.setItem("link", `/empViewApplication/${params.id}`);
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", `/empViewApplication/${params.id}`);
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

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


  useEffect(() => {
    let candidateForJobData = props.employee.candidateForJobData;
    if (candidateForJobData !== undefined) {
      if (candidateForJobData?.data?.status == "success") {
        setApplication(candidateForJobData.data.data.jobs);
      }
    }
  }, [props.employee.candidateForJobData]);


  useEffect(() => {
    let interview = props.employee.interviewData;
    if (interview !== undefined) {
      if (interview?.data?.status == "success") {
        seteditrescheduleData(interview.data.data.interview[0]);
      }
    }
  }, [props.employee.interviewData]);

  function approveCandidate(id) {
    props.requestApprove({
      id: id,
      token: emp.token,
    });
  }

  useEffect(() => {
    let approveData = props.employee.approveData;
    if (approveData !== undefined) {
      if (approveData?.data?.status === "success") {
        Swal.fire("Good job!", "Candidate Approved successfully.", "success");
        props.employee.approveData = undefined;
        props.requestCandidateForJob({
          id: params.id,
        });
      } else {
        Swal.fire("Error!", `Something went wrong while approving candidate.`, "error");
        props.employee.approveData = undefined;
      }
    }
  }, [props.employee.approveData]);

  function scheduleCandidate(id) {
    props.requestSchedule({
      id: id,
      token: emp.token,
    });
  }

  function rejectCandidate(id) {
    props.requestReject({
      id: id,
      token: emp.token,
    });
  }
  useEffect(() => {
    let rejectData = props.employee.rejectData;
    if (rejectData !== undefined) {
      if (rejectData?.data?.status === "success") {
        Swal.fire("Good job!", "Candidate Rejected successfully.", "success");
        props.employee.rejectData = undefined;
        props.requestCandidateForJob({
          id: params.id,
        });
      } else {
        Swal.fire("Error!", `Something went wrong while rejecting candidate.`, "error");
        props.employee.rejectData = undefined;
      }
    }
  }, [props.employee.rejectData]);

  useEffect(() => {
    if (error) {
      if(errordate){
        document.getElementById("interview_date").focus();
      }else if(errormode){
        document.getElementById("online").focus();
      }else if(errorrescheduledate){
        document.getElementById("interview_date_reschedule").focus();
      }else if(errorreschedulemode){
        document.getElementById("onlinereschedule").focus();
      }
      setError(false)
    }
  },[error]);

  return (
    <>
      <Header />
      <Breadcrumbs title="Manage Jobs" />
      <div class="manage-jobs section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Application" />

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
                          {/* {data.currency_name}  */}
                         <>INR {data.salary_from}- {data.salary_to}</>
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
                            {/* ,{" "}
                            {data.country_name} */}
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
                          <b style={{ color: "black" }}>Required Skills: </b>{" "}
                          {data.skill_name}
                        </p>
                        <p>
                          <b style={{ color: "black" }}>Recruiter Name: </b>{" "}
                          {data.Recruiter_name}
                        </p>
                        <p>
                          <b style={{ color: "black" }}>Recruiter E-mail: </b>{" "}
                          {data.Recruiter_email}
                        </p>
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
                              <strong>Published on:</strong> {publish[0]}
                            </li>
                            <br />
                            {/* <li>
                              <strong>Employment Status:</strong>{" "}
                              {data.shift_name}
                            </li>
                            <br /> */}
                            <li>
                              <strong>Experience:</strong>{" "}
                              {data.experience
                                ? data.experience + " years"
                                : "Fresher or experienced"}
                            </li>
                            <br />
                            <li>
                              <strong>Salary:</strong> 
                              {/* {data.currency_name}{" "} */}
                             <>INR {data.salary_from}-{data.salary_to}</>
                            </li>
                            <br />
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
                            <br />
                            <li>
                              <strong>Application Deadline:</strong>{" "}
                              {data.expiry_date}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {application.length > 0 && (
                  <div class="job-items">
                    <div class="manage-list">
                      <div class="job-details-head row mx-0">
                        <div class="salary-type col-auto order-sm-3">
                          <span
                            style={{
                              padding: "2px",
                              border: "1px solid black",
                              borderRadius: "10px",
                              color: "black",
                            }}
                          >
                            {application.length && (
                              <p style={{ marginBottom: "-3px" }}>
                                {" "}
                                {application.length} Application
                              </p>
                            )}
                            {data.vacancy && (
                              <p style={{ marginBottom: "-3px" }}>
                                {" "}
                                {data.vacancy} Vacancy
                              </p>
                            )}
                          </span>
                        </div>
                        <div class="content col">
                          <h5 class="title">Candidate List</h5>
                        </div>
                      </div>
                      <br />
                      <div class="row">
                        <div class="col-lg-4 col-md-4 col-12">
                          <p>Name</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <p>Contact</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <p>Profile Title</p>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <p>Action</p>
                        </div>
                      </div>
                    </div>

                    {application.length > 0 &&
                      application.map((item, index) => {
                        const profile = item.profile
                          ? process.env.REACT_APP_API_HOST + item.profile
                          : profile1;
                        return (
                          <div class="manage-content" key={index}>
                            <div class="row align-items-center justify-content-center">
                              <div class="col-lg-1 col-md-1 col-12">
                                <div class="title-img">
                                  <div class="can-img">
                                    <a href={`/empViewResume/${item._id}`}>
                                      <img
                                        src={profile}
                                        alt="logo"
                                        style={{
                                          borderRadius: "5px",
                                          marginLeft: "-5px",
                                        }}
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <div class="title-img">
                                  <h3>
                                    <a href={`/empViewResume/${item._id}`}>
                                      {" "}
                                      {item.first_name} {item.last_name}
                                    </a>
                                  </h3>
                                  <span>
                                    <i class="fa fa-map-marker"> </i>{" "}
                                    {item.city}, {item.state}
                                  </span>
                                </div>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <p>
                                  <a
                                    href={`mailto:${item.email}`}
                                    style={{ color: "black" }}
                                  >
                                    {item.email}
                                  </a>{" "}
                                  <br />
                                  <a
                                    href={`callto:${item.phone}`}
                                    style={{ color: "black" }}
                                  >
                                    {item.phone}
                                  </a>
                                </p>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <p>
                                  <span style={{ color: "black" }}>
                                    {item.profile_title}
                                  </span>
                                </p>
                              </div>

                              <div class="col-lg-2 col-md-2 col-12">
                                {(() => {
                                  if (item.status === "approve") {
                                    return (
                                      <p
                                        style={{
                                          color: "green",
                                          background: "#ccffcc",
                                          padding: "5px 14px",
                                          borderRadius: "3px",
                                          fontSize: "13px",
                                        }}
                                      >
                                        <center>Approved</center>
                                      </p>
                                    );
                                  } else if (item.status === "reject") {
                                    return (
                                      <p
                                        style={{
                                          color: "red",
                                          background: "#ffc2b3",
                                          padding: "5px 14px",
                                          borderRadius: "3px",
                                          fontSize: "13px",
                                        }}
                                      >
                                        <center>Rejected</center>
                                      </p>
                                    );
                                  } else if (
                                    item.status === "schedule" &&
                                    item.schedule_status === "notconform"
                                  ) {
                                    return (
                                      <p
                                        style={{
                                          color: "blue",
                                          background: "#b3d9ff",
                                          padding: "5px 14px",
                                          borderRadius: "3px",
                                          fontSize: "13px",
                                        }}
                                      >
                                        <center>
                                          {" "}
                                          Scheduled on{" "}
                                          {item.interview_date.substring(
                                            0,
                                            10
                                          )}{" "}
                                        </center>
                                      </p>
                                    );
                                  } else if (
                                    item.status === "schedule" &&
                                    item.schedule_status === "reschedule"
                                  ) {
                                    return (
                                      <p
                                        style={{
                                          color: "#b38600",
                                          background: "#ffffcc",
                                          padding: "5px 14px",
                                          borderRadius: "3px",
                                          fontSize: "13px",
                                        }}
                                      >
                                        <center>
                                          {" "}
                                          Reschedule
                                          <button
                                            style={{
                                              border: "0px",
                                              padding: "2px 5px",
                                              backgroundColor: "transparent",
                                            }}
                                            title="Reschedule Interview"
                                            onClick={() => {
                                              editrescheduletoggle(
                                                item.applied_id
                                              );
                                            }}
                                          >
                                            <i
                                              style={{
                                                color: "#b38600",
                                                fontSize: "16px",
                                              }}
                                              class="fa fa-calendar"
                                            ></i>
                                          </button>
                                          {editreschedulemodal === true && (
                                            <Modal
                                              isOpen={editreschedulemodal}
                                              toggle={editrescheduletoggle}
                                            >
                                              <ModalHeader
                                                toggle={editrescheduletoggle}
                                              >
                                                Reschedule Interview
                                              </ModalHeader>
                                              <ModalBody>
                                                <form class="forms-sample">
                                                  <div class="form-group">
                                                    <label>Date and Time</label>
                                                    <input
                                                      type="datetime-local"
                                                      class="form-control"
                                                      placeholder=""
                                                      name="interview_date"
                                                      id="interview_date_reschedule"
                                                      value={editrescheduleData.interview_date.replace(
                                                        " ",
                                                        "T"
                                                      )}
                                                      onBlur={
                                                        validaterescheduleDate
                                                      }
                                                      onChange={
                                                        onchangeeditscheduleData
                                                      }
                                                    />
                                                    {errorrescheduledate && (
                                                      <div style={mystyle}>
                                                        {errorrescheduledate}
                                                      </div>
                                                    )}
                                                    <label>
                                                      <br />
                                                      Mode
                                                    </label>
                                                    <div class="form-check ">
                                                      <input
                                                        class="form-check-input"
                                                        type="radio"
                                                        style={{ margin: "0px 5px" }}
                                                        id="onlinereschedule"
                                                        name="mode"
                                                        value="online"
                                                        onBlur={
                                                          validaterescheduleMode
                                                        }
                                                        onChange={
                                                          onchangeeditscheduleData
                                                        }
                                                        checked={
                                                          editrescheduleData.mode ===
                                                          "online"
                                                        }
                                                      />
                                                      <label
                                                        class="form-check-label"
                                                        for="online"
                                                      >
                                                        Online
                                                      </label>
                                                    </div>
                                                    <div class="form-check">
                                                      <input
                                                        class="form-check-input"
                                                        type="radio"
                                                        style={{ margin: "0px 5px" }}
                                                        id="offlinereschedule"
                                                        name="mode"
                                                        value="offline"
                                                        onBlur={
                                                          validaterescheduleMode
                                                        }
                                                        onChange={
                                                          onchangeeditscheduleData
                                                        }
                                                        checked={
                                                          editrescheduleData.mode ===
                                                          "offline"
                                                        }
                                                      />
                                                      <label
                                                        class="form-check-label"
                                                        for="offline"
                                                      >
                                                        Offline
                                                      </label>
                                                    </div>

                                                    {errorreschedulemode && (
                                                      <div style={mystyle}>
                                                        {errorreschedulemode}
                                                      </div>
                                                    )}
                                                  </div>
                                                  <br />
                                                  <br />
                                                  <button
                                                    type="submit"
                                                    class="btn btn-primary me-2"
                                                    onClick={
                                                      saveeditrescheduletoggle
                                                    }
                                                  >
                                                    Submit
                                                  </button>
                                                  <button
                                                    class="btn btn-light"
                                                    onClick={
                                                      editrescheduletoggle
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
                                                </form>
                                              </ModalBody>
                                            </Modal>
                                          )}
                                        </center>
                                      </p>
                                    );
                                  } else if (
                                    item.status === "schedule" &&
                                    item.schedule_status === "conform"
                                  ) {
                                    return (
                                      <p
                                        style={{
                                          color: "#6600cc",
                                          background: "#ccccff",
                                          padding: "5px 14px",
                                          borderRadius: "3px",
                                          fontSize: "13px",
                                        }}
                                      >
                                        <center>
                                          {" "}
                                          Interview on{" "}
                                          {item.interview_date.substring(
                                            0,
                                            10
                                          )}{" "}
                                        </center>
                                      </p>
                                    );
                                  } else {
                                    return (
                                      <>
                                        {/* <button
                                          style={{
                                            border: "0px",
                                            padding: "2px 5px",
                                            backgroundColor: "transparent",
                                          }}
                                          title="Approve"
                                          onClick={() => {
                                            approveCandidate(item.applied_id);
                                          }}
                                        >
                                          <i
                                            style={{
                                              color: "green",
                                              fontSize: "16px",
                                            }}
                                            class="fa fa-check"
                                          ></i>
                                        </button> */}

                                        <button
                                          style={{
                                            border: "0px",
                                            padding: "2px 5px",
                                            backgroundColor: "transparent",
                                          }}
                                          title="Schedule Interview"
                                          onClick={() => {
                                            edittoggle(item.applied_id);
                                          }}
                                        >
                                          <i
                                            style={{
                                              color: "blue",
                                              fontSize: "16px",
                                            }}
                                            class="fa fa-calendar"
                                          ></i>
                                        </button>
                                        {editmodal === true && (
                                          <Modal
                                            isOpen={editmodal}
                                            toggle={edittoggle}
                                          >
                                            <ModalHeader toggle={edittoggle}>
                                              Schedule Interview
                                            </ModalHeader>
                                            <ModalBody>
                                              <form class="forms-sample">
                                                <div class="form-group">
                                                  <label>Date and Time</label>
                                                  <input
                                                    type="datetime-local"
                                                    class="form-control"
                                                    placeholder=""
                                                    name="interview_date"
                                                    id="interview_date"
                                                    value={
                                                      editdata.interview_date
                                                    }
                                                    onBlur={validateDate}
                                                    onChange={onchangeeditdata}
                                                  />
                                                  {errordate && (
                                                    <div style={mystyle}>
                                                      {errordate}
                                                    </div>
                                                  )}
                                                  <label>
                                                    <br />
                                                    Mode
                                                  </label>
                                                  <div class="form-check ">
                                                    <input
                                                      class="form-check-input"
                                                      type="radio"
                                                      style={{ margin: "0px 5px" }}
                                                      id="online"
                                                      name="mode"
                                                      value="online"
                                                      onBlur={validateMode}
                                                      onChange={
                                                        onchangeeditdata
                                                      }
                                                    />
                                                    <label
                                                      class="form-check-label"
                                                      for="online"
                                                    >
                                                      Online
                                                    </label>
                                                  </div>
                                                  <div class="form-check">
                                                    <input
                                                      class="form-check-input"
                                                      type="radio"
                                                      style={{ margin: "0px 5px" }}
                                                      id="offline"
                                                      name="mode"
                                                      value="offline"
                                                      onBlur={validateMode}
                                                      onChange={
                                                        onchangeeditdata
                                                      }
                                                    />
                                                    <label
                                                      class="form-check-label"
                                                      for="offline"
                                                    >
                                                      Offline
                                                    </label>
                                                  </div>

                                                  {errormode && (
                                                    <div style={mystyle}>
                                                      {errormode}
                                                    </div>
                                                  )}
                                                </div>
                                                <br />
                                                <br />
                                                <button
                                                  type="submit"
                                                  class="btn btn-primary me-2"
                                                  onClick={saveedittoggle}
                                                >
                                                  Submit
                                                </button>
                                                <button
                                                  class="btn btn-light"
                                                  onClick={edittoggle}
                                                >
                                                  Cancel
                                                </button>
                                              </form>
                                            </ModalBody>
                                          </Modal>
                                        )}

                                        <button
                                          style={{
                                            border: "0px",
                                            padding: "2px 5px",
                                            backgroundColor: "transparent",
                                          }}
                                          title="Reject"
                                          onClick={() => {
                                            rejectCandidate(item.applied_id);
                                          }}
                                        >
                                          <i
                                            style={{
                                              color: "red",
                                              fontSize: "16px",
                                            }}
                                            class="fa fa-times"
                                          ></i>
                                        </button>
                                      </>
                                    );
                                  }
                                })()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
  return { employee: state.employee, candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestEmpLogin,
      requestJobDetails,
      requestCandidateForJob,
      requestApprove,
      requestReject,
      requestSchedule,
      requestScheduleInterview,
      requestInterview,
      requestRescheduleInterview,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewApplication);
