import Footer from "./footer";
import Header from "./header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestLogin, requestGetCandidate } from "../Redux/actions";
import { Document, Page, pdfjs } from "react-pdf";
import camera from "../images/camera.png";
import Swal from "sweetalert2";
// import pdf from './nency.pdf'
import WOW from "wowjs";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { Storage } from 'aws-amplify';

function Resume(props) {

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [data, setData] = useState({});
  const [pdf, setPdf] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [img, setimg] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const onSelectFile = (e) => {
    setimg(URL.createObjectURL(e.target.files[0]));
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    new WOW.WOW().init();
    localStorage.removeItem("link");
  }, []);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        props.requestGetCandidate({
          token: loginData.data.data.token,
          id: loginData.data.data.id,
        });
      } else {
        localStorage.setItem("link", "/resume");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/resume");
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let getCandidateData = props.candidate.getCandidateData;
    if (getCandidateData !== undefined) {
      if (getCandidateData?.data?.status === "success") {
        setData(getCandidateData.data.data);
        // setPdf(process.env.REACT_APP_API_HOST + getCandidateData.data.data.resume);
        const getResume = async () => {
          const s3Key = `candidateResume/${user.id}`;
          try {
            // List objects in the S3 bucket with the specified s3Key
            const response = await Storage.list(s3Key);
            // If the response is an array and it's not empty, the object exists
            if (response.results.length > 0) {
              // Fetch the object using the get method
              const pdfUrl = await Storage.get(s3Key);
              
              if (pdfUrl) {
                console.log("hello");
                setPdf(pdfUrl);
              }
            } else {
              // Handle the case when the object is not present in S3
              console.error("PDF object not found in S3.");
              // Perform any necessary actions for handling the absence of the object
              // For example, you can set the pdfUrl to null or display an error message to the user.
            }
          } catch (error) {
            // Handle errors
            console.error("Error fetching the PDF from S3:", error);
          }
        }
        getResume();
      }
    }
  }, [props.candidate.getCandidateData, addResume]);

  // function addResume(){
  //   navigate("/addResumeForm")
  // }

  async function addResume(e) {
    e.preventDefault();
    if (selectedFile) {
      const s3Key = `candidateResume/${user.id}`;
      const result = await Storage.put(s3Key, selectedFile, {
        contentType: selectedFile.type,
      });
      if (result) {
        alert("successful");
        setPdf(result)
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

  return (
    <>
      <Header />
      <Breadcrumbs title="My Resume" />
      <div class="bookmarked section">
        <div class="container">
          <div class="alerts-inner">
            <div class="row">
              <ManageAccount name="Resume" />
              <div class="col-lg-8 col-12">
                <div class="job-items">

                  <b style={{ color: "black" }}>
                    Resume of {data.first_name} {data.last_name}:{" "}
                    {/* <a href={pdf}>Load pdf</a> */}
                  </b>
                  <br />
                  <br />
                  {pdf ? (
                    <>
                      <h6>Change your Resume.</h6>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={onSelectFile} />

                      <button
                        type="submit"
                        onClick={addResume}
                        class="btn btn-primary me-2"
                        style={{ color: "white" }}
                      >
                        Add Rresume
                      </button>

                      <br />
                      <iframe src={pdf} width="100%" height="1000" />
                    </>
                  ) : (
                    <>
                      <h6>Resume is not Uploaded.</h6>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={onSelectFile} />

                      <button
                        type="submit"
                        onClick={addResume}
                        class="btn btn-primary me-2"
                        style={{ color: "white" }}
                      >
                        Add Rresume
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
      requestGetCandidate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
