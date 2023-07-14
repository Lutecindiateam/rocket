import Footer from "./footer";
import Header from "./header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestLogin, requestGetJobAlert } from "../Redux/actions";
import image from "../images/extraLogo.png";
import WOW from "wowjs";
import Breadcrumbs from "../Section/breadcrumbsSection";

function JobAlerts(props) {
  
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
        props.requestGetJobAlert({
          token: loginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/jobAlerts");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/jobAlerts");
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let jobAlertData = props.candidate.jobAlertData;
    if (jobAlertData !== undefined) {
      if (jobAlertData?.data?.status == "success") {
        setData(jobAlertData.data.data.jobs);
      }
    }
  }, [props.candidate.jobAlertData]);

  function addData(){
    navigate('/jobList/1/10')
  }
  
  return (
    <>
      <Header />
      <Breadcrumbs title="Job Alerts" />
      <div class="bookmarked section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Alert" />
              <div class="col-lg-8 col-12">
                <div class="job-items">
                  {data.length > 0 ?
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
                                      {item.Company_name}
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
                                  {item.currency_name} {item.salary_from}-
                                  {item.salary_to}
                                </p>
                              </div>
                              <div class="col-lg-1 col-md-1">
                                <p>{item.shift_name}</p>
                              </div>
                              <div class="col-lg-2 col-md-2 col-12">
                                <p>
                                  <span class="time">
                                    Expire on {item.expiry_date}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }):
                    (
                      <>
                      <h6>You have not receive any job alert.<br /><br /></h6>
                      <button
                        type="submit"
                        onClick={addData}
                        class="btn btn-primary me-2"
                        style={{ color: "white" }}
                      >
                        Find jobs
                      </button>
                    </>
                    )
                  }
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
      requestGetJobAlert,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(JobAlerts);
