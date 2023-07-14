import Footer from "./footer";
import Header from "./header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestLogin,
  requestReadNotification,
  requestMarkAllNotification,
  requestMarkNotification,
  requestDeleteNotification,
  requestCountNotification,
  requestInterviewApprove,
  requestInterviewConfirm,
  requestInterviewNotConfirm,
} from "../Redux/actions";
import { jobDetails, interview } from "../Redux/api";
import image from "../images/extraLogo.png";
import WOW from "wowjs";
import Swal from "sweetalert2";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Breadcrumbs from "../Section/breadcrumbsSection";

function Notifications(props) {

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };
  const [modalData, setModalData] = useState();

  const [readData, setReadData] = useState([]);
  const [readDataJobDetails, setReadDataJobDetails] = useState([]);
  // const [readDataJobDetailsIds, setReadDataJobDetailsIds] = useState([]);
  const [readDataInterviewDetails, setReadDataInterviewDetails] = useState([]);
  // const [readDataInterviewDetailsIds, setReadDataInterviewDetailsIds] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [pagination, setpagination] = useState({});
  const [pages, setpages] = useState([]);
  const params = useParams();
  const [page, setpage] = useState(0);
  const [page_size, setpage_size] = useState(0);
  const [count, setcount] = useState(0);
  const [changeInNotification, setChangeInNotification] = useState(false);
  const [editmodal, seteditModal] = useState(false);

  useEffect(() => {
    new WOW.WOW().init();
    localStorage.removeItem("link");
  }, []);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        setpage_size(params.page_size);
        setpage(params.page);
        props.requestCountNotification({
          token: loginData.data.data.token,
        });
        props.requestReadNotification({
          token: loginData.data.data.token,
          page: params.page,
          page_size: params.page_size,
        });
      } else {
        localStorage.setItem(
          "link",
          `/notifications/${params.page}/${params.page_size}`
        );
        navigate("/login");
      }
    } else {
      localStorage.setItem(
        "link",
        `/notifications/${params.page}/${params.page_size}`
      );
      navigate("/login");
    }
  }, [props.candidate.loginData, params.page, params.page_size, changeInNotification,]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/notifications/1/${e.target.value}`);
    }
  }

  const onConfirmInterview = (interview_id, custom_id) => {
    props.requestInterviewConfirm({
      id: interview_id,
      data: {},
    });
    markData(custom_id);
    seteditModal(!editmodal);
  };
  const onNotConfirmInterview = (interview_id, custom_id) => {
    props.requestInterviewNotConfirm({
      id: interview_id,
      data: {},
    });
    markData(custom_id);
    seteditModal(!editmodal);
  };

  const edittoggle = (item) => {
    if (editmodal === true) {
      seteditModal(!editmodal);
    } else {
      if (item) {
        const types = item.type.split("\\");
        if (
          types[2] === "jobnotification" ||
          types[2] === "rejectnotification" ||
          types[2] === "approvenotification"
        ) {
          item.read_at === null && markData(item.custom_id);
        }
      }
      seteditModal(!editmodal);
      setModalData(item);
    }
  };

  useEffect(() => {
    let readNotificationData = props.candidate.readNotificationData;
    if (readNotificationData !== undefined) {
      if (readNotificationData?.data) {
        if (readNotificationData?.data?.data) {
          const jobdetails = async ()=>{
            for (let i = 0; i < readNotificationData.data.data.length; i++) {
              if (typeof readNotificationData.data.data[i].data === "string") {
                readNotificationData.data.data[i] = {
                  ...readNotificationData.data.data[i],
                  data: JSON.parse(readNotificationData.data.data[i].data),
                };
              }
              // if (!(readNotificationData.data.data[i].data.job_id in readDataJobDetailsIds)) {
               await jobDetails({ id: readNotificationData.data.data[i].data.job_id }).then(
                  (res) => {
                    setReadDataJobDetails(res.data.data.jobs[0]);
                    const jobdata = res.data.data.jobs[0];
                    readNotificationData.data.data[i].jobData = jobdata;
                  }
                );
              // }
              // if (
              //   !(readNotificationData.data.data[i].data.id in readDataInterviewDetailsIds)
              // ) {
                if(readNotificationData.data.data[i].data?.id){
                  await interview({ id: readNotificationData.data.data[i].data.id }).then((res) => {
                    setReadDataInterviewDetails(res.data.data.interview[0]);
                    const interviewdata = res.data.data.interview[0];
                    readNotificationData.data.data[i].interviewData = interviewdata;
                  });
                }               
              // }
            }
          }
          jobdetails()
          setReadData(readNotificationData.data.data);
          setpagination(readNotificationData.data);
          if (readNotificationData.data.last_page < 5) {
            let array = [];
            Array.from(Array(readNotificationData.data.last_page), (e, i) => 
              array.push(i + 1)
            );
            setpages(array);
          } else {
            let array = [];
            if (readNotificationData.data.current_page <= 3) {
              array.push(1, 2, 3, 4, 5);
              setpages(array);
            } else if (
              readNotificationData.data.last_page - readNotificationData.data.current_page <=
              2
            ) {
              array.push(
                readNotificationData.data.last_page - 4,
                readNotificationData.data.last_page - 3,
                readNotificationData.data.last_page - 2,
                readNotificationData.data.last_page - 1,
                readNotificationData.data.last_page
              );
              setpages(array);
            } else {
              array.push(
                Number(readNotificationData.data.current_page) - 2,
                Number(readNotificationData.data.current_page) - 1,
                readNotificationData.data.current_page,
                Number(readNotificationData.data.current_page) + 1,
                Number(readNotificationData.data.current_page) + 2
              );
              setpages(array);
            }
          }
        }
      }
    }
  }, [props.candidate.readNotificationData]);

  function markData(id) {
    props.requestMarkNotification({
      id: id,
      token: user.token,
    });
    setChangeInNotification(!changeInNotification);
  }

  function markAllData() {
    props.requestMarkAllNotification({
      token: user.token,
    });
    props.requestReadNotification({
      token: user.token,
      page: params.page,
      page_size: params.page_size,
    });

    setChangeInNotification(!changeInNotification);
  }

  function deleteNotification(id) {
    props.requestDeleteNotification({
      token: user.token,
      id: id,
    });

    setChangeInNotification(!changeInNotification);
  }

  useEffect(() => {
    let deleteNotificationData = props.candidate.deleteNotificationData;
    if (deleteNotificationData !== undefined) {
      if (deleteNotificationData?.data?.status === "success") {
        Swal.fire(
          "Good job!",
          "Notification is deleted successfully.",
          "success"
        );
        props.candidate.deleteNotificationData = undefined;
        props.requestReadNotification({
          token: user.token,
          page: params.page,
          page_size: params.page_size,
        });
        setpage_size(params.page_size);
      } else {
        Swal.fire(
          "Error!",
          "There is some error in deleting notification.",
          "error"
        );
        props.candidate.deleteNotificationData = undefined;
      }
    }
  }, [props.candidate.deleteNotificationData]);
  useEffect(() => {
    let countNotificationData = props.candidate.countNotificationData;
    if (countNotificationData !== undefined) {
      if (countNotificationData?.data?.status === "success") {
        setcount(countNotificationData.data.data);
      }
    }
  }, [props.candidate.countNotificationData, changeInNotification]);
  const timeDifference = (duration, updated_at) => {
    let duration1 = duration - 19800000;
    if (duration1 < 86400000) {
      let seconds = Math.floor((duration1 / 1000) % 60),
        minutes = Math.floor((duration1 / (1000 * 60)) % 60),
        hours = Math.floor((duration1 / (1000 * 60 * 60)) % 24);
      if (hours > 0) return hours + " hr ago";
      if (minutes > 0) return minutes + " min ago";
      if (seconds > 0) return seconds + " sec ago";
      else return "now";
    } else {
      return updated_at.substring(0, 10);
    }
  };

  const showModal = () => {
    const img = modalData.jobData?.employee_logo
      ? process.env.REACT_APP_API_HOST + modalData.jobData.employee_logo
      : image;
    const types = modalData.type.split("\\");

    return (
      <Modal isOpen={editmodal} toggle={edittoggle}>
        <ModalHeader toggle={edittoggle}>Confirmation of Interview</ModalHeader>
        <ModalBody>
          <div>
            <div class="row align-items-center justify-content-center">
              <div class="w-25">
                <div class="title-img">
                  <div class="can-img">
                    <a href={`/jobDetails/${modalData.jobData?.id}`}>
                      <img
                        src={img}
                        alt="logo"
                        style={{ width: "50px", margin: "5px 15px" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div class="w-50">
                <div class="title-img" style={{ paddingLeft: "10px" }}>
                  <p style={{ color: "black" }}>
                    {" "}
                    <b>
                      <a
                        href={`/jobDetails/${modalData.jobData?.id}`}
                        style={{ color: "black" }}
                      >
                        {modalData.jobData?.company_name}
                      </a>
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <br />
            <div class="m-1 p-1">
              <b style={{ color: "black" }}>Status</b> :{" "}
              {types[2] === "jobnotification" && (
                <b style={{ color: "green" }}>
                  We have Posted new Job, Are you interested?{" "}
                </b>
              )}
              {types[2] === "approvenotification" && (
                <b style={{ color: "green" }}>
                  Your Application Has Been Approved{" "}
                </b>
              )}
              {types[2] === "rejectnotification" && (
                <b style={{ color: "red" }}>
                  Your Application Has Been Rejected{" "}
                </b>
              )}
              {types[2] === "scheduleinterviewnotification" && (
                <b style={{ color: "green" }}>
                  {" "}
                  Your Interview Has Been Scheduled on{" "}
                  {modalData.interviewData?.interview_date} via{" "}
                  {modalData.interviewData?.mode} mode.
                </b>
              )}
              {types[2] === "rescheduleinterviewnotification" && (
                <b style={{ color: "green" }}>
                  Your Interview Has Been Rescheduled on{" "}
                  {modalData.interviewData?.interview_date} via{" "}
                  {modalData.interviewData?.mode} mode.
                </b>
              )}
            </div>
            <div class="m-1 p-1">
              <b style={{ color: "black" }}>For</b> :{" "}
              <b style={{ color: "darkblue" }}>{modalData.jobData?.title}</b>
            </div>
          </div>
          <br />
          <br />
          {types[2] !== "jobnotification" &&
            types[2] !== "rejectnotification" &&
            types[2] !== "approvenotification" && (
              <>
                {((types[2] === "scheduleinterviewnotification" && modalData.interviewData?.conform === "notconform") || (types[2] === "rescheduleinterviewnotification" && modalData.interviewData?.conform === "reschedule")) &&
                  <>
                    {console.log("modal data=", modalData.interviewData.conform)}
                    <button
                      class="btn btn-primary me-2"
                      onClick={() =>
                        onConfirmInterview(
                          modalData.interviewData?.id,
                          modalData.custom_id
                        )
                      }
                    >
                      Confirm
                    </button>
                    <button
                      class="btn btn-warning me-2"
                      onClick={() =>
                        onNotConfirmInterview(
                          modalData.interviewData?.id,
                          modalData.custom_id
                        )
                      }
                    >
                      Not Confirm
                    </button>
                  </>
                }
              </>
            )}
          <button class="btn btn-danger me-2" onClick={edittoggle}>
            Cancel
          </button>
        </ModalBody>
      </Modal>
    );
  };
  return (
    <>
      <Header />
      <Breadcrumbs title="Notifications" />
      <div class="bookmarked section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Notification" notificationCount={count} />
              <div class="col-lg-8 col-12">
                <div class="job-items">
                  {readData.length > 0 && (
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        style={{ marginLeft: "20px" }}
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={markAllData}
                      />
                      <p style={{ color: "black", marginLeft: "40px" }}>Mark as All Read</p>
                    </div>
                  )}
                  {readData.length > 0 ? (
                    readData.map((item, index) => {
                      const img = item.jobData?.employee_logo
                        ? process.env.REACT_APP_API_HOST + item.jobData.employee_logo
                        : image;
                      const types = item.type.split("\\");

                      const date = new Date(item.updated_at).getTime();
                      const Now = Date.now();
                      const difference = timeDifference(Now - date, item.updated_at);
                      return (
                        <>
                          <div class="manage-content" key={index}>
                            <div class="row align-items-center justify-content-center">
                              <div class="col-lg-1 col-md-1 col-12">

                                <div class="form-group">
                                  <div class="form-check">
                                    {item.read_at !== null ? (
                                      <input
                                        class="form-check-input"
                                        style={{ marginLeft: "20px" }}
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        checked
                                      />
                                    ) : (
                                      <input
                                        class="form-check-input"
                                        style={{ marginLeft: "20px" }}
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        onChange={() => {
                                          markData(item.custom_id);
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>

                              </div>
                              <div class="col-lg-7 col-md-6 col-12">
                                <div class="title-img">
                                  <div class="can-img">
                                    <a
                                      href={`/jobDetails/${item.jobData?.id}`}
                                    >
                                      <img src={img} alt="logo" />
                                    </a>
                                  </div>
                                </div>
                                <div
                                  class="title-img"
                                  style={{ paddingLeft: "60px" }}
                                >
                                  <p style={{ color: "black" }}>
                                    {" "}
                                    <b>
                                      <a
                                        href={`/jobDetails/${item.jobData?.id}`}
                                        style={{ color: "black" }}
                                      >
                                        {item.jobData?.company_name}
                                      </a>
                                    </b>
                                    {types[2] === "jobnotification" &&
                                      " Posted a new job : "}
                                    {types[2] === "approvenotification" &&
                                      " approved your application for "}
                                    {types[2] === "rejectnotification" &&
                                      " rejected your application for "}
                                    {types[2] ===
                                      "scheduleinterviewnotification" &&
                                      " has scheduled your interview for "}
                                    {types[2] ===
                                      "rescheduleinterviewnotification" &&
                                      " has rescheduled your interview for "}
                                    {"  "} <b>{item.jobData?.title}</b>
                                  </p>
                                </div>
                              </div>

                              <div class="col-lg-2 col-md-1 col-12">
                                <center>{difference}</center>
                              </div>
                              <div class="col-lg-1 col-md-1 col-12">
                                <button
                                  style={{
                                    border: "0px",
                                    padding: "2px 5px",
                                    backgroundColor: "transparent",
                                  }}
                                  title="View Notification"
                                  onClick={() => {
                                    edittoggle(item);
                                  }}
                                >
                                  <i
                                    style={{
                                      color: "blue",
                                      fontSize: "16px",
                                    }}
                                    class="fa fa-eye"
                                  ></i>
                                </button>
                                {editmodal === true && showModal()}
                              </div>
                              <div class="col-lg-1 col-md-1 col-12">
                                <div
                                  style={{ color: "red", cursor: "pointer" }}
                                  class="button"
                                  onClick={() => {
                                    deleteNotification(item.custom_id);
                                  }}
                                >
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <h6>No data</h6>
                  )}
                </div>
                {readData.length > 0 && (
                  <div class="row">
                    <div class="col-10">
                      <div class="pagination center">
                        <ul class="pagination-list">
                          {pagination.current_page !== 1 && (
                            <li>
                              <Link
                                to={`/notifications/${params.page - 1}/${params.page_size
                                  }`}
                              >
                                <i class="fa fa-long-arrow-left"></i>
                              </Link>
                            </li>
                          )}
                          {pages.map((i) => {
                            return pagination.current_page === i ? (
                              <li class="active">
                                <Link
                                  to={`/notifications/${i}/${params.page_size}`}
                                >
                                  {i}
                                </Link>
                              </li>
                            ) : (
                              <li>
                                <Link
                                  to={`/notifications/${i}/${params.page_size}`}
                                >
                                  {i}
                                </Link>
                              </li>
                            );
                          })}
                          {pagination.current_page !== pagination.last_page && (
                            <li>
                              <Link
                                to={`/notifications/${Number(params.page) + 1
                                  }/${params.page_size}`}
                              >
                                <i class="fa fa-long-arrow-right"></i>
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="pagination center">
                        <form onSubmit={onChangePageSize}>
                          <div class="form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder={page_size}
                              name="page_size"
                              value={page_size}
                              onChange={onChangePageSize}
                              style={{ width: "100px" }}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
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
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestLogin,
      requestReadNotification,
      requestMarkAllNotification,
      requestMarkNotification,
      requestDeleteNotification,
      requestCountNotification,
      requestInterviewApprove,
      requestInterviewConfirm,
      requestInterviewNotConfirm,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
