import Footer from "./footer";
import Header from "./header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestLogin,
  requestCandidateLogo,
  requestGetCandidate,
} from "../Redux/actions";
import WOW from "wowjs";
import camera from "../images/camera.png";
import img1 from "../images/profile.png";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { Storage } from 'aws-amplify';

function Picture(props) {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
    localStorage.removeItem("link");
  }, []);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});
  const [img, setimg] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setEmp(loginData.data.data);
        props.requestGetCandidate({
          id: loginData.data.data.id,
          token: loginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/picture");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/picture");
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  const onSelectFile = (e) => {
    setimg(URL.createObjectURL(e.target.files[0]));
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  const getImage = async () => {
    const s3Key = `candidateProfile/${emp.id}`;
    try {
      const url = await Storage.get(s3Key, { validateObjectExistence: true });
      if (url) {
        setimg(
          url
        );
      } else {
        setimg(img1);
      }
      //     const response = await Storage.list(s3Key);
      //     if (response.results.length > 0) {
      //       const imageUrl = await Storage.get(s3Key);
      //       if (imageUrl) {
      //         props.requestCandidateLogo({
      //           id: emp.id,
      //           data:{ imageUrl},
      //           token: emp.token,
      //         });
      //   setimg(
      //     imageUrl
      //   );
      // } else {
      //   setimg(img1);
      // }
      //     } else {
      // setimg(img1);
      //     }
    } catch (error) {
      setimg(img1);
      console.error(error.message)
      setimg(img1);
    }

  }

  //Uploading candidate image to aws s3 

  async function submitForm(e) {
    e.preventDefault();
    if (selectedFile) {
      // const formData = new FormData();
      // formData.append("profile", selectedFile);
      // props.requestCandidateLogo({
      //   id: emp.id,
      //   data: formData,
      //   token: emp.token,
      // });
      const s3Key = `candidateProfile/${emp.id}`;
      const result = await Storage.put(s3Key, selectedFile, {
        contentType: selectedFile.type,

      });
      if (result) {
        alert("successful");
        getImage();
        // const response = await Storage.list(s3Key);
        //     if (response.results.length > 0) {
        //       const imageUrl = await Storage.get(s3Key);
        //       if (imageUrl) {
        //         props.requestCandidateLogo({
        //           id: emp.id,
        //           data:{ imageUrl},
        //           token: emp.token,
        //         });
        //       } else {
        //         setimg(img1);
        //       }
        //     } else {
        //       setimg(img1);
        //     }
      } else {
        console.log("semething went wrong");
      }
    } else {
      Swal.fire(
        "Error!",
        "Please select png or jpg or jpeg file for profile picture.",
        "error"
      );
    }
  }

  useEffect(() => {
    let getCandidateData = props.candidate.getCandidateData;
    if (getCandidateData !== undefined) {
      if (getCandidateData?.data?.status == "success") {
        setData(getCandidateData.data.data);
        setimg(getCandidateData.data.data.logourl)
        
        getImage();

      }
    }
  }, [props.candidate.getCandidateData]);

  useEffect(() => {
    let candidatelogo = props.candidate.candidatePictureData;
    if (candidatelogo !== undefined) {
      if (candidatelogo?.data?.status == "success") {
        Swal.fire(
          "Good job!",
          "Profile picture updated Successfully.",
          "success"
        );
        props.candidate.candidatePictureData = undefined;
        props.requestGetCandidate({
          id: emp.id,
          token: emp.token,
        });
        navigate("/settings");
      } else {
        Swal.fire(
          "Error!",
          "Please select png or jpg or jpeg file for profile picture.",
          "error"
        );
        props.candidate.candidatePictureData = undefined;
        props.requestGetCandidate({
          id: emp.id,
          token: emp.token,
        });
      }
    }
  }, [props.candidate.candidatePictureData]);

  return (
    <>
      <Header />
      <Breadcrumbs title="Profile Picture" />
      <div class="resume section">
        <div class="container">
          <div class="resume-inner">
            <div class="row">
              <ManageAccount name="Settings" />

              <div class="col-lg-8 col-12">
                <div class="inner-content">
                  <div class="alerts-inner">
                    <div class="row">
                      <div class="col-lg-12 col-12">
                        <div class="job-items">
                          <div class="row">
                            <div class="col-md-4 col-12"></div>
                            <div class="col-md-4 col-12">
                              <form class="forms-sample" onSubmit={submitForm}>
                                <div class="form-group">
                                  <label>Profile &nbsp;&nbsp;</label>
                                  <br />
                                  <br />
                                  <div
                                    style={{
                                      position: "relative",
                                      left: "0px",
                                      top: "0px",
                                    }}
                                  >
                                    <img
                                      src={img}
                                      width="250"
                                      style={{
                                        position: "relative",
                                        top: "0px",
                                        border: "2px solid black",
                                        borderRadius: "25px",
                                      }}
                                    />

                                    <label for="file-input">
                                      <img
                                        src={camera}
                                        height="35"
                                        width="auto"
                                        style={{
                                          position: "absolute",
                                          top: "-12px",
                                          left: "230px",
                                          backgroundColor: "white",
                                          borderRadius: "25px",
                                          border: "1px solid black",
                                          padding: "3px",
                                        }}
                                      />
                                    </label>

                                    <input
                                      id="file-input"
                                      type="file"
                                      style={{ display: "none" }}
                                      name="profile"
                                      onChange={onSelectFile}
                                    />
                                  </div>
                                </div>
                                <br />
                                <button
                                  type="submit"
                                  class="btn btn-primary me-2"
                                  style={{ color: "white" }}
                                >
                                  Save
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
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
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestLogin, requestCandidateLogo, requestGetCandidate },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Picture);
