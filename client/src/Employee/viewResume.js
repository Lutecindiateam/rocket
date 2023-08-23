import Footer from "../Components/footer";
import Header from "../Components/header";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestEmpGetCandidate, requestEmpLogin } from "../Redux/actions";
import WOW from "wowjs";
import ManageAccount from "./manageAccount";
import image from "../images/profile.png";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { Storage } from 'aws-amplify';

function ViewResume(props) {

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
  const [resume, setResume] = useState("");

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
        props.requestEmpGetCandidate({
          id: params.id,
        });
      } else {
        localStorage.setItem("link", `/empViewResume/${params._id}`);
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", `/empViewResume/${params.id}`);
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let empGetCandidateData = props.employee.empGetCandidateData;
    if (empGetCandidateData !== undefined) {
      if (empGetCandidateData?.data?.status == "success") {
        setData(empGetCandidateData.data.data[0]);
        const getResume = async () => {
          const s3Key = `candidateResume/${params.id}`;
          try {
            const url = await Storage.get(s3Key, { validateObjectExistence: true });
            if (url) {
              setResume(url);
            }
          } catch (error) {
            console.error(error.message)
          }
        }
        getResume();


        setImg(
          process.env.REACT_APP_API_HOST + empGetCandidateData.data.data[0].profile
        );
        // setResume(
        //   process.env.REACT_APP_API_HOST + empGetCandidateData.data.data[0].resume
        // );
      }
    }
  }, [props.employee.empGetCandidateData]);

  return (
    <>
      <Header />
      <Breadcrumbs title="Manage Applications" />
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
                        <a
                          href="/#"
                          style={{ borderRadius: "4px", overflow: "hidden" }}
                        >
                          {data.profile ? (
                            <img src={img} alt="Company Logo" width="60" />
                          ) : (
                            <img src={image} alt="Company Logo" width="60" />
                          )}
                        </a>
                      </div>
                      <div class="salary-type col-auto order-sm-3">
                        <span class="badge">
                          {data.career_level} {data.profile_title}
                        </span>
                        <span
                          class="salary-range"
                          style={{ backgroundColor: "transparent" }}
                        >
                          {data.total_experience
                            ? data.total_experience + " year experienced"
                            : "Fresher"}
                        </span>
                      </div>
                      <div class="content col">
                        <h5 class="title">
                          {data.first_name} {data.last_name}
                        </h5>
                        <ul class="meta">
                          <li>
                            <strong class="text-primary">
                              <i
                                class="fa fa-map-marker"
                                aria-hidden="true"
                              ></i>
                            </strong>
                            &nbsp;&nbsp;
                            {data.address && data.address + ", "}
                            {/* {data.city.name}, {data.state.name} */}
                            {/* ,{" "}
                            {data.country_name} */}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="row">
                      <b style={{ color: "black" }}>
                        Resume of {data.first_name} {data.last_name}:{" "}
                      </b>
                      <br />
                      <br />
                      {resume ? (
                        <iframe src={resume} width="790" height="1000" />
                      ) : (
                        <p>Resume is not Uploaded.</p>
                      )}
                    </div>
                  </div>
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
  return { employee: state.employee, candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestEmpLogin, requestEmpGetCandidate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewResume);
