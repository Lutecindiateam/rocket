import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { RWebShare } from "react-web-share";
import "./style.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminJobDetails } from "../Redux/actions";
import image from "../images/extraLogo.png";

function ViewJob(props) {

  const params = useParams();
  const [data, setdata] = useState({});
  const [img, setimg] = useState({});
  useEffect(() => {
    props.requestAdminJobDetails({
      id: params.id,
    });
  }, []);

  useEffect(() => {
    let jobDeatilsData = props.data.jobDeatilsData;
    if (jobDeatilsData !== undefined) {
      setdata(jobDeatilsData.data.data.job[0]);
      if (jobDeatilsData.data.data.job[0].employee_logo) {
        setimg(
          process.env.REACT_APP_API_HOST +
          jobDeatilsData.data.data.job[0].employee_logo
        );
      } else {
        setimg(image);
      }
    }
  }, [props.data.jobDeatilsData]);

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
        <Header name="Job Details" />
        <div class="container-fluid page-body-wrapper">
          <Sidebar name="Jobs" />

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
                              </div>
                              <div>
                              </div>
                            </div>
                            <br />
                            <div id="printme">
                              <div class="d-flex ">
                                <a href={`/admin/viewCompany/${data.company_id}`}>  <img src={img} alt="" height="60" width="60" /></a>
                                <div style={{ paddingLeft: "15px" }}>
                                  <h4>{data.title}</h4>
                                  <p>
                                    <i class="fa fa-map-marker"></i>{" "}
                                    <a href={`/admin/viewCompany/${data.company_id}`}>  {data.company_name}</a>
                                  </p>
                                </div>
                              </div>

                              <hr />
                              <p>
                                <b>Salary : </b>
                                {data.currency_name} {data.salary_from}-{data.salary_to}
                              </p>
                              <p>
                                <b>Shift : </b>
                                {data.shift_name}
                              </p>
                              <p>
                                <b>Category: </b>
                                {data.experience > 0
                                  ? data.experience + " year experienced in "
                                  : "Fresher in "}

                                {data.level} {data.category_name}
                              </p>
                              <p>
                                <b>Functional Area: </b>
                                {data.functional_area_name}
                              </p>
                              <p>
                                <b>Description: </b>
                                <pre style={{
                                  whiteSpace: "pre-wrap",
                                  fontFamily: "Inter",
                                  fontWeight: "normal",
                                  fontStyle: "normal",
                                  color: "#7E8890",
                                  fontSize: "14px",
                                }}> {data.description} </pre>
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
  bindActionCreators({ requestAdminJobDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewJob);
