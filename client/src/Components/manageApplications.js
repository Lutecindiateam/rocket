import Footer from "./footer";
import Header from "./header";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestEmpLogin, requestEmpJoblist } from "../Redux/actions";
import WOW from "wowjs";
import ManageAccount from "../Employee/manageAccount";
import Breadcrumbs from "../Section/breadcrumbsSection";

function ManageApplication(props) {
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
      if (empLoginData?.data?.status === "success") {
        setEmp(empLoginData.data.data);
        props.requestEmpJoblist({
          id: empLoginData.data.data.id,
          token: empLoginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/manageApplications");
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", "/manageApplications");
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let empJobListData = props.employee.empJobListData;
    if (empJobListData !== undefined) {
      if (empJobListData?.data?.status == "success") {
        setData(empJobListData.data.data.jobs);
      }
    }
  }, [props.employee.empJobListData]);

  function addData() {
    navigate('/postJob')
  }

  return (
    <>
      <Header />
      <Breadcrumbs title="Manage Applications" />
      <div class="manage-jobs section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Application" />

              <div class="col-lg-8 col-12">
                {data.length > 0 ? (
                  <div class="job-items">
                    <div class="manage-list">
                      <div class="row">
                        <div class="col-lg-3 col-md-3 col-12">
                          <p>Name</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <p>Expiry Date</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <p>Salary</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <p>Action</p>
                        </div>
                      </div>
                    </div>

                    {data.map((item, index) => {
                      if (item.deleted === false) {
                        return (
                          <div class="manage-content" key={index}>
                            <div class="row align-items-center justify-content-center">
                              <div class="col-lg-3 col-md-3 col-12">
                                <Link to={`/empViewApplication/${item.id}`}>
                                  {" "}
                                  <h3>{item.title}</h3>
                                </Link>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <p>
                                  <span class="time">{item.expiry_date.split("T")[0]}</span>
                                </p>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <p>
                                  INR {item.salary_from}-
                                  {item.salary_to} L
                                </p>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <Link to={`/empViewApplication/${item.id}`}>
                                  {" "}
                                  <button
                                    style={{
                                      border: "0px",
                                      padding: "2px 5px",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <i
                                      style={{ color: "blue", fontSize: "16px" }}
                                      class="fa fa-eye"
                                    ></i>
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div class="manage-content" key={index}>
                            <div class="row align-items-center justify-content-center">
                              <div class="col-lg-3 col-md-3 col-12">
                                {/* <Link to={`/empViewApplication/${item.id}`}> */}
                                  {" "}
                                  <h3>{item.title}</h3>
                                {/* </Link> */}
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <p>
                                  <span class="time">{item.expiry_date.split("T")[0]}</span>
                                </p>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                                <p>
                                  INR {item.salary_from}-
                                  {item.salary_to} L
                                </p>
                              </div>
                              <div class="col-lg-3 col-md-3 col-12">
                              <p style={{color:"red" , fontSize:"15px"}}>Blocked</p>
                                {/* <Link to={`/empViewApplication/${item.id}`}>
                                  {" "}
                                  <button
                                    style={{
                                      border: "0px",
                                      padding: "2px 5px",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <i
                                      style={{ color: "blue", fontSize: "16px" }}
                                      class="fa fa-eye"
                                    ></i>
                                  </button>
                                </Link> */}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div class="job-items">
                    <>
                      <h6>You have not added any job.<br /><br /></h6>
                      <button
                        type="submit"
                        onClick={addData}
                        class="btn btn-primary me-2"
                        style={{ color: "white" }}
                      >
                        Add job
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
  bindActionCreators({ requestEmpLogin, requestEmpJoblist }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplication);
