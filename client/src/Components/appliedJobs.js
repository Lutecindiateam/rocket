import Footer from "./footer";
import Header from "./header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestLogin,
  requestGetApplyJob,
  requestDeleteApplyJob,
} from "../Redux/actions";
import image from "../images/extraLogo.png";
import WOW from "wowjs";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";

function AppliedJobs(props) {
  
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    new WOW.WOW().init();
    localStorage.removeItem("link");
  }, []);
 
  useEffect(() => {
    let loginData = props.candidate.loginData;
    console.log(loginData);
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        props.requestGetApplyJob({
          token: loginData.data.data.token,
          id: loginData.data.data.id,
        });
      } else {
        localStorage.setItem("link", "/appliedJobs");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/appliedJobs");
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let getApplyJobData = props.candidate.getApplyJobData;
    if (getApplyJobData !== undefined) {
      if (getApplyJobData?.data?.status == "success") {
        setData(getApplyJobData.data.data.jobs);
      }
    }
  }, [props.candidate.getApplyJobData]);

  // function deleteJob(id) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       props.requestDeleteApplyJob({
  //         token: user.token,
  //         id: id,
  //       });
  //     }
  //   })
  // }

  // useEffect(() => {
  //   let deleteApplyJobData = props.candidate.deleteApplyJobData;
  //   if (deleteApplyJobData !== undefined) {
  //     if (deleteApplyJobData?.data?.status == "success") {
  //       Swal.fire("Good job!", "Applied job deleted successfully.", "success");
  //       props.candidate.deleteApplyJobData = undefined;
  //       props.requestGetApplyJob({
  //         token: user.token,
  //         id: user.id,
  //       });
  //     } else {
  //       Swal.fire(
  //         "Error!",
  //         "There is some error in deleting applied job.",
  //         "error"
  //       );
  //       props.candidate.deleteApplyJobData = undefined;
  //     }
  //   }
  // }, [props.candidate.deleteApplyJobData]);

  function addData(){
    navigate('/jobList/1/10')
  }
console.log(data);
  return (
    <>
      <Header />
      <Breadcrumbs title="Applied Jobs" />
      <div class="bookmarked section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Applied" />
              <div class="col-lg-8 col-12">
                <div class="job-items">
                  {data.length > 0 ? (
                    data.map((item, index) => {
                      const img = item.employee_logo
                        ? process.env.REACT_APP_API_HOST + item.employee_logo
                        : image;
                      return (
                        <>
                          <div class="manage-content" key={index}>
                            <div class="row align-items-center justify-content-center">
                              <div class="col-lg-1 col-md-1 col-12">
                                <div class="title-img">
                                  <div class="can-img">
                                    <Link to={`/jobDetails/${item.id}`}>
                                      <img src={img} alt="logo" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <div
                                  class="title-img"
                                  style={{ paddingLeft: "10px" }}
                                >
                                  <h3>
                                    <Link to={`/jobDetails/${item.id}`}>
                                      {" "}
                                      {item.company_name}
                                    </Link>
                                    <span>
                                      <i class="lni lni-map-marker"></i>
                                      {item.city_name}, {item.state_name}
                                      {/* ,{" "}
                                      {item.country_name} */}
                                    </span>
                                  </h3>
                                </div>
                              </div>

                              <div class="col-lg-3 col-md-3 col-12">
                                <div class="title-img">
                                  <Link to={`/jobDetails/${item.id}`}>
                                    <h3>
                                      {item.title}
                                      <span>{item.jobs_name}</span>
                                    </h3>
                                  </Link>
                                </div>
                              </div>
                              <div class="col-lg-3 col-md-2 col-12">
                                <p>
                                  <h3>INR {item.salary_from}-
                                  {item.salary_to}</h3>
                                </p>
                              </div>
                              <div class="col-lg-2 col-md-2 col-12">
                                {(() => {
                                  if (item.position_status === "Closed") {
                                    return (
                                      <p
                                        style={{
                                          color: "red",
                                          fontSize: "15px",
                                        }}
                                      >
                                        Position Closed
                                      </p>
                                    );
                                  } else
                                  //  if (item.position_status === "Closed")
                                    {
                                    return (
                                      <p
                                        style={{
                                          color: "green",
                                          fontSize: "15px",
                                        }}
                                      >
                                        Position Open
                                      </p>
                                    );
                                  }

                                  //  else {
                                  //   return (
                                  //     <>
                                  //       <div class="col-lg-1 col-md-1">
                                  //         <div
                                  //           style={{
                                  //             color: "red",
                                  //             cursor: "pointer",
                                  //           }}
                                  //           class="button"
                                  //           onClick={() => {
                                  //             deleteJob(item.applied_job_id);
                                  //           }}
                                  //         >
                                  //           <i
                                  //             class="fa fa-trash"
                                  //             aria-hidden="true"
                                  //           ></i>
                                  //         </div>
                                  //       </div>
                                  //     </>
                                  //   );
                                  // }
                                })()}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                        <h6>You have not applied for any job.<br /><br /></h6>
                        <button
                          type="submit"
                          onClick={addData}
                          class="btn btn-primary me-2"
                          style={{ color: "white" }}
                        >
                          Apply for job
                        </button>
                      </>
                  )}
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
      requestGetApplyJob,
      requestDeleteApplyJob,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AppliedJobs);
