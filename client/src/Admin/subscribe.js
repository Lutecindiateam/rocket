import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { RWebShare } from "react-web-share";
import "./style.css";
import { requestAdminSubscribe } from "../Redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function Subscribe(props) {

  const params = useParams();
  const [subscribes, setsubscribes] = useState([]);
  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);

  useEffect(() => {
    props.requestAdminSubscribe({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size]);

  useEffect(() => {
    let subscribersData = props.data.subscribersData;
    if (subscribersData !== undefined) {
      if (subscribersData.data) {
        setsubscribes(subscribersData.data.data);
        setpagination(subscribersData.data.meta);
        if (subscribersData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(subscribersData.data.meta.last_page), (e, i) => {
            array.push(i + 1);
          });
          setpages(array);
        } else {
          let array = [];
          if (subscribersData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            subscribersData.data.meta.last_page -
            subscribersData.data.meta.current_page <=
            2
          ) {
            array.push(
              subscribersData.data.meta.last_page - 4,
              subscribersData.data.meta.last_page - 3,
              subscribersData.data.meta.last_page - 2,
              subscribersData.data.meta.last_page - 1,
              subscribersData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(subscribersData.data.meta.current_page) - 2,
              Number(subscribersData.data.meta.current_page) - 1,
              subscribersData.data.meta.current_page,
              Number(subscribersData.data.meta.current_page) + 1,
              Number(subscribersData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.subscribersData]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/subscribe/1/${e.target.value}`);
    }
  }

  function printPage() {
    var printContents =
      "<br/><center><h3>Subscribers</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Subscribers" />
        <div class="container-fluid page-body-wrapper">
          <Sidebar name="Subscribe" />

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
                                    url: `${window.location.protocol}//${window.location.host}/admin/subscribe/${params.page}/${params.page_size}`,
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
                                  <tr>
                                    <th>Email</th>
                                    <th>Subscribed On</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {subscribes.map((item, index) => {
                                    return (
                                      <tr>
                                        <td>
                                          <div class="d-flex ">
                                            <div>
                                              <h6>
                                                <a
                                                  href={`mailto:${item.email}`}
                                                >
                                                  {item.email}
                                                </a>
                                              </h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <p>
                                            {item.created_at.substring(0, 10)}
                                          </p>
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
                                          href={`/admin/subscribe/${params.page - 1
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
                                            href={`/admin/subscribe/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/subscribe/${i}/${params.page_size}`}
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
                                            href={`/admin/subscribe/${Number(params.page) + 1
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
  bindActionCreators({ requestAdminSubscribe }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
