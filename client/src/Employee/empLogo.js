import Footer from "../Components/footer";
import Header from "../Components/header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestEmpLogin,
  requestEmpLogo,
  requestGetEmp,
} from "../Redux/actions";
import WOW from "wowjs";
import camera from "../images/camera.png";
import img1 from "../images/extraLogo.png";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { Storage } from 'aws-amplify';

function Logo(props) {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
    localStorage.removeItem("link");
  }, []);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});
  const [img, setimg] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
        props.requestGetEmp({
          id: empLoginData.data.data.id,
          token: empLoginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/empLogo");
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", "/empLogo");
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

  const onSelectFile = (e) => {
    setimg(URL.createObjectURL(e.target.files[0]));
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  // function submitForm(e) {
  //   e.preventDefault();
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append("logo", selectedFile);
  //     props.requestEmpLogo({
  //       id: emp.id,
  //       data: formData,
  //       token: emp.token,
  //     });
  //   } else {
  //     Swal.fire(
  //       "Error!",
  //       "Please select png or jpg or jpeg file for company logo.",
  //       "error"
  //     );
  //   }
  // }
  async function submitForm(e) {
    e.preventDefault();
    if (selectedFile) {
      const s3Key = `employerProfile/${emp.id}`;
      const result = await Storage.put(s3Key, selectedFile, {
        contentType: selectedFile.type,

      });
      if (result) {
        Swal.fire("Good job!", "Company logo upload Successfully.", "success");
      } else {
        console.log("semething went wrong");
      }
    } else {
      Swal.fire(
        "Error!",
        "Please select png or jpg or jpeg file for company logo.",
        "error"
      );
    }
  }

  useEffect(() => {
    let empData = props.employee.empData;
    if (empData !== undefined) {
      if (empData?.data?.status == "success") {
        setData(empData.data.data);
        const getImage = async () => {
          const s3Key = `employerProfile/${emp.id}`;
          try {
            const response = await Storage.list(s3Key);
            if (response.results.length > 0) {
              const imageUrl = await Storage.get(s3Key);
              if (imageUrl) {
                setimg(
                  imageUrl
                );
              } else {
                setimg(img1);
              }
            } else {
              setimg(img1);
            }
          } catch (error) {
            setimg(img1);
            console.error(error.message)
          }

        }
        getImage();

      }
    }
  }, [props.employee.empData]);

  useEffect(() => {
    let empLogoData = props.employee.empLogoData;
    if (empLogoData !== undefined) {
      if (empLogoData?.data?.status == "success") {
        Swal.fire("Good job!", "Company logo updated Successfully.", "success");
        props.employee.empLogoData = undefined;
        props.requestGetEmp({
          id: emp.id,
          token: emp.token,
        });
      } else {
        Swal.fire(
          "Error!",
          "Please select png or jpg or jpeg file for resume.",
          "error"
        );
        props.employee.empLogoData = undefined;
        props.requestGetEmp({
          id: emp.id,
          token: emp.token,
        });
      }
    }
  }, [props.employee.empLogoData]);

  return (
    <>
      <Header />
      <Breadcrumbs title="Company Logo" />
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
                                      alt=""
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
                                        alt=""
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
                                      name="logo"
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
  return { employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestEmpLogin, requestEmpLogo, requestGetEmp },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
