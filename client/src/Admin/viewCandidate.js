import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { RWebShare } from "react-web-share";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminCandidateDetails, requestAdminEditShift, requestAdminShift } from "../Redux/actions";
import image from "../images/profile.png";
import { Storage } from 'aws-amplify';
import Swal from "sweetalert2";

function ViewCandidate(props) {

  const params = useParams();
  const [data, setdata] = useState({});
  const [img, setimg] = useState("");
  const [resume, setresume] = useState("");
  const [block, setBlock] = useState("")

  useEffect(() => {
    props.requestAdminCandidateDetails({
      id: params.id,
    });
  }, []);

  function adminCandidateBlock() {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block it!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.requestAdminEditShift({
          id: params.id,
          data: {
            action: true
          }
        });
      }
    })
  }
  function adminCandidateUnblock() {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Unblock it!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.requestAdminEditShift({
          id: params.id,
          data: {
            action: false
          }
        });
      }
    })
  }



  useEffect(() => {
    let candidateDeatilsData = props.data.candidateDeatilsData;
    if (candidateDeatilsData !== undefined) {
      setdata(candidateDeatilsData?.data?.data[0]);
      props.requestAdminShift({
        id: params.id,
      });
      // if (candidateDeatilsData.data.data[0].profile) {
      //   setimg(
      //     process.env.REACT_APP_API_HOST + candidateDeatilsData.data.data[0].profile
      //   );
      // } else {
      setimg(image);
      // }

      // setresume(
      //   process.env.REACT_APP_API_HOST + candidateDeatilsData.data.data[0].resume
      // );
    }
  }, [props.data.candidateDeatilsData]);

  const viewResume = async () => {
    const s3Key = `candidateResume/${data._id}`;
    try { 
        const pdfUrl = await Storage.get(s3Key, { validateObjectExistence: true });
        if (pdfUrl) {
          console.log("hello");
          setresume(pdfUrl);
        }
    
    } catch (error) {
      // Handle errors
      console.error("Error fetching the PDF from S3:", error);
    }
  }

  useEffect(() => {
    const editShiftData = props.data.editShiftData;
    if (editShiftData !== undefined) {
      if (editShiftData.data.status == "success") {
        setBlock(editShiftData.data.data)
      } else {
        setBlock(undefined)
      }
    }
  }, [props.data.editShiftData])

  useEffect(() => {
    const shiftData = props.data.shiftData;
    if (shiftData !== undefined) {
      if (shiftData.data.status == "success") {
        setBlock(shiftData.data.data)
      } else {
        setBlock(undefined)
      }
    }
  }, [props.data.shiftData])

  function printPage() {
    var printContents =
      "<br/><center><h3>Candidate Details</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Candidate Details" />
        <div class="container-fluid page-body-wrapper">
          <Sidebar name="Candidates" />

          <div class="main-panel">
            <div class="content-wrapper">
              <div class="row">
                <div class="col-sm-12">
                  <div class="home-tab">
                    <div class="row flex-grow">
                      <div class="col-12 grid-margin stretch-card">
                        <div class="card card-rounded">
                          <div class="card-body">
                            <div class="d-sm-flex justify-content-between align-items-start">
                              <div class="btn-wrapper">
                                <RWebShare
                                  data={{
                                    text: "Job Portal",
                                    url: `${window.location.protocol}//${window.location.host}/viewCandidate/${params.id}`,
                                    title: "Job Portal",
                                  }}
                                >
                                  <p class="btn btn-otline-dark align-items-center">
                                    <i class="icon-share"></i> Share
                                  </p>
                                </RWebShare>
                                <button
                                  onClick={printPage}
                                  class="btn btn-otline-dark"
                                >
                                  <i class="icon-printer"></i> Print
                                </button>
                                {block === true ? (
                                  <button
                                    onClick={adminCandidateUnblock}
                                    class="btn btn-otline-dark"
                                  >
                                    <i class="icon-printer"></i> Unblock
                                  </button>
                                ) : (
                                  <button
                                    onClick={adminCandidateBlock}
                                    class="btn btn-otline-dark"
                                  >
                                    <i class="icon-printer"></i> Block
                                  </button>
                                )
                                }
                              </div>
                              {/* <div>
                                <a href={data.facebook_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{ padding: "6px 8px" }}
                                  >
                                    <i class="fa fa-facebook"></i>
                                  </button>
                                </a>
                                <a href={data.twitter_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{
                                      padding: "6px 5px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <i class="fa fa-twitter"></i>
                                  </button>
                                </a>
                                <a href={data.linkedin_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{
                                      padding: "6px 6px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <i class="fa fa-linkedin"></i>
                                  </button>
                                </a>
                                <a href={data.google_plus_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{
                                      padding: "6px 2px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <i class="fa fa-google-plus"></i>
                                  </button>
                                </a>
                                <a href={data.pinterest_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{
                                      padding: "6px 7px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <i class="fa fa-pinterest-p"></i>
                                  </button>
                                </a>
                              </div> */}
                            </div>
                            <br />
                            <div id="printme">
                              <div class="d-flex ">
                                <img src={img} alt="" height="60" width="60" />
                                <div style={{ paddingLeft: "15px" }}>
                                  <h4>
                                    {data.first_name} {data.last_name}
                                  </h4>
                                  <p>
                                    <i class="fa fa-map-marker"></i>{" "}
                                    {data.address}, {data.city},{" "}
                                    {data.state}
                                    {/* , {data.country_name} */}
                                  </p>
                                </div>
                              </div>

                              <hr />
                              <p>
                                <b>Email: </b>
                                <a href={`mailto:${data.email}`}>
                                  {data.email}
                                </a>
                              </p>
                              <p>
                                <b>Phone: </b>
                                <a href={`callto:${data.phone}`}>
                                  {data.phone}
                                </a>
                              </p>
                              <p>
                                <b>Experience: </b>
                                {data.experience > 0
                                  ? data.experience + " year experienced in "
                                  : "Fresher in "}
                                {data.functional_area1}
                              </p>
                              <p>
                                <button
                                  onClick={viewResume}
                                  class="btn btn-primary me-2"
                                  style={{ color: "white" }}
                                >
                                  View Resume
                                </button>
                              </p>
                              {resume ? <iframe src={resume} width="1000" height="1100" /> : <p>Click On View Resume.</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { data: state.data };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestAdminCandidateDetails, requestAdminEditShift, requestAdminShift }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewCandidate);
