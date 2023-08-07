import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { RWebShare } from "react-web-share";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminCompanies } from "../Redux/actions";
import image from "../images/extraLogo.png";

function Companies(props) {

  const params = useParams();
  const [companies, setcompanies] = useState([]);
  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);

  useEffect(() => {
    props.requestAdminCompanies({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/companies/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let companiesData = props.data.companiesData;
    if (companiesData !== undefined) {
      if (companiesData.data) {
        setcompanies(companiesData.data.data);
        setpagination(companiesData.data.meta);
        if (companiesData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(companiesData.data.meta.last_page), (e, i) =>
            array.push(i + 1)
          );
          setpages(array);
        } else {
          let array = [];
          if (companiesData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            companiesData.data.meta.last_page -
            companiesData.data.meta.current_page <=
            2
          ) {
            array.push(
              companiesData.data.meta.last_page - 4,
              companiesData.data.meta.last_page - 3,
              companiesData.data.meta.last_page - 2,
              companiesData.data.meta.last_page - 1,
              companiesData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(companiesData.data.meta.current_page) - 2,
              Number(companiesData.data.meta.current_page) - 1,
              companiesData.data.meta.current_page,
              Number(companiesData.data.meta.current_page) + 1,
              Number(companiesData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.companiesData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Companies</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Companies" />
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
                                    url: `${window.location.protocol}//${window.location.host}/admin/companies/${params.page}/${params.page_size}`,
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
                            </div>
                            <br />
                            <div class="table-responsive  mt-1" id="printme">
                              <table class="table select-table">
                                <thead>
                                  <tr >
                                    <th>Company</th>
                                    <th>Contact</th>
                                    <th>Intustry</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {companies.map((item, index) => {
                                    const img = item.logo
                                      ? process.env.REACT_APP_API_HOST + item.logo
                                      : image;
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <div class="d-flex ">
                                            <a href={`/admin/viewCompany/${item._id}`}>  <img src={img} alt="" /></a>
                                            <div>
                                              <a href={`/admin/viewCompany/${item._id}`}>  <h6>{item.name}</h6></a>
                                              <p>
                                                <i class="fa fa-map-marker"></i>{" "}
                                                {item.city},{" "}
                                                {item.state}
                                                {/* ,{" "}
                                                {item.country_name} */}
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <h6>
                                            <a href={`mailto:${item.email}`}>
                                              {item.email}
                                            </a>
                                          </h6>
                                          <p>
                                            <a href={item.website} target="_blank">
                                              {item.website}
                                            </a>
                                          </p>
                                          {item.fax && (
                                            <p>
                                              <a href={`callto:${item.fax}`}>
                                                {item.fax}
                                              </a>
                                            </p>
                                          )}
                                        </td>
                                        <td>
                                          <h6>{item.industry}</h6>
                                          <p>{item.industries_name}</p>
                                        </td>
                                        <td>
                                          {item.status === "Approved" ? (
                                            <h6 style={{color: "green"}}>{item.status}</h6>
                                          ) : ( item.status === "Rejected" ? 
                                          (<h6 style={{color: "red"}}>Rejected</h6>
                                          ):(item.status === "Onhold" ? (
                                            <h6 style={{color: "orange"}}>onhold</h6>
                                          ) :(
                                            <h6 style={{color: "yellow"}}>Pending</h6>
                                          )))
                                        }
                                        </td>
                                        <td>
                                          <a href={`/admin/viewCompany/${item._id}`}>
                                            <button
                                              class="badge badge-opacity-primary"
                                              style={{ border: "0px" }}
                                            >
                                              <i class="fa fa-eye"></i>
                                            </button>
                                          </a>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>

                            <div class="row">
                              <div class="col-10">
                                <div class="pagination center">
                                  <ul class="pagination-list">
                                    {pagination.current_page !== 1 && (
                                      <li>
                                        <a
                                          href={`/admin/companies/${params.page - 1
                                            }/${params.page_size}`}
                                        >
                                          <i class="fa fa-long-arrow-left"></i>
                                        </a>
                                      </li>
                                    )}
                                    {pages.map((i) => {
                                      return pagination.current_page === i ? (
                                        <li class="active">
                                          <a
                                            href={`/admin/companies/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/companies/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      );
                                    })}
                                    {pagination.current_page !==
                                      pagination.last_page && (
                                        <li>
                                          <a
                                            href={`/admin/companies/${Number(params.page) + 1
                                              }/${params.page_size}`}
                                          >
                                            <i class="fa fa-long-arrow-right"></i>
                                          </a>
                                        </li>
                                      )}
                                  </ul>
                                </div>
                              </div>
                              <div class="col-2">
                                <div class="pagination center">
                                  <form onSubmit={onChangePageSize}>
                                    <div class="form-group">
                                      <input
                                        type="number"
                                        class="form-control"
                                        placeholder={page_size}
                                        name="page_size"
                                        value={page_size}
                                        onChange={onChangePageSize}
                                        style={{ width: "100px" }}
                                      />
                                    </div>
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
  bindActionCreators({ requestAdminCompanies }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
