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

function ViewCompany(props) {

  const params = useParams();
  const [data, setdata] = useState({});
  const [img, setimg] = useState({});
  useEffect(() => {
    props.requestAdminCompanyDetails({
      id: params.id,
    });
  }, []);

  useEffect(() => {
    let companyDeatilsData = props.data.companyDeatilsData;
    if (companyDeatilsData !== undefined) {
      setdata(companyDeatilsData.data.data[0]);
      // if (companyDeatilsData.data.data[0].logo) {
      //   setimg(
      //     process.env.REACT_APP_API_HOST + companyDeatilsData.data.data[0].logo
      //   );
      // } else {
        setimg(image);
      // }
    }
  }, [props.data.companyDeatilsData]);

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
                                <button
                                  onClick={console.log("hello")}
                                  class="btn btn-otline-dark"
                                >
                                  <i class="icon-printer"></i> Delete
                                </button>
                              </div>
                              <div>
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
                              </div>
                            </div>
                            <br />
                            <div id="printme">
                              <div class="d-flex ">
                                <img src={img} alt="" height="60" width="60" />
                                <div style={{ paddingLeft: "15px" }}>
                                  <h4>{data.name}</h4>
                                  <p>
                                    <i class="fa fa-map-marker"></i>{" "}
                                    {data.location}, {data.city},{" "}
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
                                <b>About Us: </b> {data.about_us}
                              </p>
                              <p>
                                <b>Company Details: </b> {data.employer_details}
                              </p>
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
  bindActionCreators({ requestAdminCompanyDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewCompany);
