import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { RWebShare } from "react-web-share";
import "./style.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminCompanyDetails } from "../Redux/actions";
import image from "../images/extraLogo.png";
import { Storage } from 'aws-amplify';
import {
  requestAdminEditPosition,
  requestAdminPosition,
  requestAdminEditTag,
  requestAdminTag
} from "../Redux/actions";
import Swal from "sweetalert2";


function ViewCompany(props) {

  const params = useParams();
  const [data, setdata] = useState({});
  const [img, setimg] = useState({});
  const [certificate, setCertificate] = useState(null)
  const [status, setStatus] = useState("")
  const [data1, setData1] = useState({})
  const [block, setBlock] = useState("")

  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    props.requestAdminCompanyDetails({
      id: params.id,
    });
  }, []);

  useEffect(() => {
    let companyDeatilsData = props.data.companyDeatilsData;
    if (companyDeatilsData !== undefined) {
      setdata(companyDeatilsData.data.data[0]);
      props.requestAdminPosition({
        id: params.id,
      });
      props.requestAdminTag({
        id: params.id,
      });
      // if (companyDeatilsData.data.data[0].logo) {
      //   setimg(
      //     process.env.REACT_APP_API_HOST + companyDeatilsData.data.data[0].logo
      //   );
      // } else {
      setimg(image);
      // }
    }
  }, [props.data.companyDeatilsData]);

  // useEffect(() => {


  // })

  const getCertificate = async () => {
    // if(data._id === )
    const s3Key = `employerCertificate/${data._id}`;
    try {
      const response = await Storage.list(s3Key);
      if (response.results.length) {
        const certificateUrl = await Storage.get(s3Key);
        if (certificateUrl) {
          setCertificate(
            certificateUrl
          );
        }
      }
    } catch (error) {
      console.error(error.message)
    }

  }

  function adminBlock() {
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
        props.requestAdminEditTag({
          id: params.id,
          data: {
            action: true
          }
        });
      }
    })
  }
  function adminUnblock() {
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
        props.requestAdminEditTag({
          id: params.id,
          data: {
            action: false
          }
        });
      }
    })
  }


  async function saveStatus(e) {
    e.preventDefault();
    try {
      await props.requestAdminEditPosition({
        id: params.id,
        data: {
          status: data1.status,
          reason: data1.reason
        },
      });
      Swal.fire("Good job!", "Status Changed Successfully.", "success");
    } catch (error) {
      console.error(error.message);
    }
  }


  useEffect(() => {
    let editPosition = props.data.editPositionData;
    if (editPosition !== undefined) {
      if (editPosition.data.status) {
        setStatus(editPosition.data.status)
      } else {
        setStatus(undefined);
      }
    }
  }, [props.data.editPositionData]);

  useEffect(() => {
    let position = props.data.positionData;
    if (position !== undefined) {
      if (position.data.data.status) {
        setStatus(position.data.data.status)
      } else {
        setStatus(undefined);
      }
    }
  }, [props.data.positionData]);

  useEffect(() => {
    let editTagData = props.data.editTagData;
    if (editTagData !== undefined) {
      if (editTagData.data.status == "success") {
        setBlock(editTagData.data.data)
      } else {
        setBlock(undefined)
      }
    }
  }, [props.data.editTagData])

  useEffect(() => {
    let tag = props.data.tagData;
    if (tag !== undefined) {
      if (tag.data) {
        setBlock(tag.data.data);
      }
    }
  }, [props.data.tagData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Company Details</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }


  return (
    <>
      <div class="container-scroller">
        <Header name="Company Details" />
        <div class="container-fluid page-body-wrapper">
          <Sidebar name="Companies" />

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
                                    url: `${window.location.protocol}//${window.location.host}/admin/viewCompany/${params.id}`,
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
                                    onClick={adminUnblock}
                                    class="btn btn-otline-dark"
                                  >
                                    <i class="icon-printer"></i> Unblock
                                  </button>
                                ) : (
                                  <button
                                    onClick={adminBlock}
                                    class="btn btn-otline-dark"
                                  >
                                    <i class="icon-printer"></i> Block
                                  </button>
                                )
                                }

                              </div>
                            </div>
                            <br />

                            <b>Current Status: </b>
                            {status == "Approved" ? (
                              <b style={{ color: "green" }}>Approved</b>
                            ) : (status == "Rejected" ? (
                              <b style={{ color: "red" }}>Rejected</b>
                            ) : (status == "Resubmission" ? (
                              <b style={{ color: "red" }}>Resubmission</b>
                            ) : ((status == "Onhold" ? (
                              <b style={{ color: "orange" }}>on hold</b>
                            ) : (
                              <b style={{ color: "yellow" }}>Pending</b>
                            )))))}
                            <br />
                            <br />
                            {/* <div>
                                <a href={data.facebook_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{ padding: "6px 8px", }}
                                  >
                                    <i class="fa fa-facebook"></i>
                                  </button>
                                </a>
                                <a href={data.twitter_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{ padding: "6px 5px", marginLeft: "5px" }}
                                  >
                                    <i class="fa fa-twitter"></i>
                                  </button>
                                </a>
                                <a href={data.linkedin_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{ padding: "6px 6px", marginLeft: "5px" }}
                                  >
                                    <i class="fa fa-linkedin"></i>
                                  </button>
                                </a>
                                <a href={data.google_plus_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{ padding: "6px 2px", marginLeft: "5px" }}
                                  >
                                    <i class="fa fa-google-plus"></i>
                                  </button>
                                </a>
                                <a href={data.pinterest_url} target="_blank">
                                  <button
                                    class="btn btn-primary btn-md text-white mb-0 me-0"
                                    type="button"
                                    style={{ padding: "6px 7px", marginLeft: "5px" }}
                                  >
                                    <i class="fa fa-pinterest-p"></i>
                                  </button>
                                </a>
                              </div> */}
                            <form onSubmit={saveStatus}>

                              <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                  <b>Change Status :</b>
                                  <select
                                    class="select"
                                    name="status"
                                    id="status"
                                    value={data1.status}
                                    onChange={onChangeData}
                                  // onBlur={validateExpiry}
                                  >
                                    <option value="">Change Status</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Onhold">on hold</option>
                                    <option value="Resubmission">Resubmission</option>
                                    <option value="Rejected">Rejected</option>

                                    {/* {expiry_date.map((option) => (
                                <option value={option.day}>
                                  {option.day}
                                </option>
                              ))} */}
                                  </select>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                  <b>Write Reason :</b>
                                  <input
                                    class="form-control"
                                    type="text"
                                    name="reason"
                                    id="reason"
                                    value={data1.reason}
                                    // onBlur={validatewebsite}
                                    onChange={onChangeData}
                                    placeholder="Enter Reason"
                                  />
                                  {/* {errorwebsite && (
                                  <div style={mystyle}>{errorwebsite}</div>
                                )} */}
                                </div>
                              </div>
                              <div class="form-group mb-8 button">
                                <button class="btn "
                                  style={{ color: "white" }}
                                >Submit</button>
                              </div>
                            </form>

                            <br />
                            <div id="printme">
                              <div class="d-flex ">
                                <img src={img} alt="" height="60" width="60" />
                                <div style={{ paddingLeft: "15px" }}>
                                  <h4>{data.name}</h4>
                                  <p>
                                    <i class="fa fa-map-marker"></i>{" "}
                                    {data.address},{data.city},{" "}
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
                              {/* <p>
                                <b>Fax: </b>
                                <a href={`callto:${data.fax}`}>{data.fax}</a>
                              </p> */}
                              <p>
                                <b>Website: </b>
                                <a href={data.website} target="_blank">
                                  {data.website}
                                </a>
                              </p>
                              <p>
                                <b>Industry: </b> {data.industry}
                              </p>
                              <p>
                                <b>Company Authorized Person Details: </b> {data.authorized_person}
                              </p>
                              <p>
                                <b>Company Registartion Certificate: </b>
                              </p>
                              <br />
                              <button
                                type="submit"
                                onClick={getCertificate}
                                class="btn btn-primary me-2"
                                style={{ color: "white" }}
                              >
                                View Certificate
                              </button>
                              {
                                certificate == null ? (
                                  <b>Click On View Certificate</b>
                                ) : (
                                  <iframe src={certificate} width="100%" height="1000" />
                                )
                              }
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
  bindActionCreators({ requestAdminCompanyDetails, requestAdminEditPosition, requestAdminPosition, requestAdminEditTag, requestAdminTag }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewCompany);
