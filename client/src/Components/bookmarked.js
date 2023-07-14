import Footer from "./footer";
import Header from "./header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestLogin,
  requestBookmark,
  requestDeleteBookmark,
  requestApplyJob,
} from "../Redux/actions";
import image from "../images/extraLogo.png";
import WOW from "wowjs";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";

function BookmarkedJobs(props) {
  
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    new WOW.WOW().init();
    localStorage.removeItem("link");
  }, []);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        props.requestBookmark({
          token: loginData.data.data.token,
          id: loginData.data.data.id,
        });
      } else {
        localStorage.setItem("link", "/bookmarked");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/bookmarked");
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let bookmarkedData = props.candidate.bookmarkedData;
    if (bookmarkedData !== undefined) {
      if (bookmarkedData?.data?.status == "success") {
        setData(bookmarkedData.data.data.jobs);
      }
    }
  }, [props.candidate.bookmarkedData]);

  function deleteJob(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.requestDeleteBookmark({
          token: user.token,
          id: id,
        });
      }
    })    
  }

  function applyJobs(id) {
    props.requestApplyJob({
      token: user.token,
      id: id,
    });
  }

  useEffect(() => {
    let deleteBookmarkedData = props.candidate.deleteBookmarkedData;
    if (deleteBookmarkedData !== undefined) {
      if (deleteBookmarkedData?.data?.status == "success") {
        Swal.fire("Good job!", "Deleted bookmark job successfully.", "success");
        props.candidate.deleteBookmarkedData = undefined;
        props.requestBookmark({
          token: user.token,
          id: user.id,
        });
      } else {
        Swal.fire(
          "Error!",
          "There is some error in deleting bookmark job.",
          "error"
        );
        props.candidate.deleteBookmarkedData = undefined;
      }
    }
  }, [props.candidate.deleteBookmarkedData]);

  useEffect(() => {
    let applyJobData = props.candidate.applyJobData;
    if (applyJobData !== undefined) {
      if (applyJobData?.data?.status == "success") {
        Swal.fire("Good job!", "Applied for Job successfully.", "success");
        props.candidate.applyJobData = undefined;
        props.requestBookmark({
          token: user.token,
          id: user.id,
        });
      } else {
        Swal.fire("Error!", "Already applied for the job.", "error");
        props.candidate.applyJobData = undefined;
      }
    }
  }, [props.candidate.applyJobData]);

  function addData(){
    navigate('/jobList/1/10')
  }
  return (
    <>
      <Header />
      <Breadcrumbs title="Bookmarked Jobs" />
      <div class="bookmarked section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Bookmarked" />
              <div class="col-lg-8 col-12">
                <div class="job-items">
                  {data.length > 0 ? (
                    data.map((item, index) => {
                      const img = item.logo
                        ? process.env.REACT_APP_API_HOST + item.logo
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
                                      {item.Company_name}{" "}
                                    </Link>
                                    <span>
                                      <i class="lni lni-map-marker"></i>
                                      {item.city_name}, {item.state_name},{" "}
                                      {item.country_name}
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
                              <div class="col-lg-2 col-md-2 col-12">
                                <p>
                                  <span class="time">{item.shift_name}</span>
                                </p>
                              </div>
                              <div class="col-lg-2 col-md-2 col-12">
                                <div
                                  style={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                    padding: "4px 0px",
                                    backgroundColor: "#2042e3",
                                    color: "white",
                                  }}
                                  class="button btn-md "
                                  onClick={() => {
                                    applyJobs(item.id);
                                  }}
                                >
                                  Apply Now
                                </div>
                              </div>
                              <div class="col-lg-1 col-md-1">
                                <div
                                  style={{ color: "red", cursor: "pointer" }}
                                  class="button"
                                  onClick={() => {
                                    deleteJob(item.id);
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
                      <>
                        <h6>You have not bookmarked any job.<br /><br /></h6>
                        <button
                          type="submit"
                          onClick={addData}
                          class="btn btn-primary me-2"
                          style={{ color: "white" }}
                        >
                          Add Bookmark Jobs
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
    { requestLogin, requestBookmark, requestDeleteBookmark, requestApplyJob },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedJobs);
