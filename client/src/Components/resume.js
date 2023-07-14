import Footer from "./footer";
import Header from "./header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestLogin, requestGetCandidate } from "../Redux/actions";
import { Document, Page, pdfjs } from "react-pdf";
// import pdf from './nency.pdf'
import WOW from "wowjs";
import Breadcrumbs from "../Section/breadcrumbsSection";

function Resume(props) {
  
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [data, setData] = useState({});
  const [pdf, setPdf] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
        setPdf(process.env.REACT_APP_API_HOST + getCandidateData.data.data.resume);
      }
    }
  }, [props.candidate.getCandidateData]);

  function addResume(){
    navigate("/addResumeForm")
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
                  {data.resume ? (
                    <iframe src={pdf} width="100%" height="1000" />
                  ) : (
                    <>
                    <h6>Resume is not Uploaded.</h6>
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
