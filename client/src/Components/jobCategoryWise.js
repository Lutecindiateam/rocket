import Footer from "./footer";
import Header from "./header";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestCategoryJobs,
  requestLogin,
  requestAddBookmark,
} from "../Redux/actions";
import WOW from "wowjs";
import image from "../images/extraLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { RWebShare } from "react-web-share";
import Swal from "sweetalert2";

function JobCategoryWise(props) {

  const [user, setUser] = useState({});
  const [jobs, setjobs] = useState([]);
  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [pages, setpages] = useState([]);
  const params = useParams();
  const [page_size, setpage_size] = useState(0);

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        props.requestCategoryJobs({
          page: params.page,
          page_size: params.page_size,
          id: params.id,
          token: loginData.data.data.token,
        });
        setpage_size(params.page_size);
      }
    } else {
      props.requestCategoryJobs({
        page: params.page,
        page_size: params.page_size,
        id: params.id,
      });
      setpage_size(params.page_size);
    }
  }, [params.page, params.page_size, props.candidate.loginData]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/jobCategoryWise/${params.id}/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let categoryJobData = props.candidate.categoryJobData;
    if (categoryJobData !== undefined) {
      if (categoryJobData.data) {
        setjobs(categoryJobData.data.data);
        setpagination(categoryJobData.data.meta);
        if (categoryJobData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(categoryJobData.data.meta.last_page), (e, i) => {
            array.push(i + 1);
          });
          setpages(array);
        } else {
          let array = [];
          if (categoryJobData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            categoryJobData.data.meta.last_page -
            categoryJobData.data.meta.current_page <=
            2
          ) {
            array.push(
              categoryJobData.data.meta.last_page - 4,
              categoryJobData.data.meta.last_page - 3,
              categoryJobData.data.meta.last_page - 2,
              categoryJobData.data.meta.last_page - 1,
              categoryJobData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(categoryJobData.data.meta.current_page) - 2,
              Number(categoryJobData.data.meta.current_page) - 1,
              categoryJobData.data.meta.current_page,
              Number(categoryJobData.data.meta.current_page) + 1,
              Number(categoryJobData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.candidate.categoryJobData]);

  function bookmarkJobs(id) {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        props.requestAddBookmark({
          token: loginData.data.data.token,
          id: id,
          data: {},
        });
      } else {
        localStorage.setItem(
          "link",
          `/jobList/${params.page}/${params.page_size}`
        );
        navigate("/login");
      }
    } else {
      localStorage.setItem(
        "link",
        `/jobList/${params.page}/${params.page_size}`
      );
      navigate("/login");
    }
  }

  useEffect(() => {
    if (user.id) {
      let addBookmarkedData = props.candidate.addBookmarkedData;
      if (addBookmarkedData !== undefined) {
        if (addBookmarkedData?.data?.status == "success") {
          Swal.fire("Good job!", "Bookmarked for Job successfully.", "success");
          props.candidate.addBookmarkedData = undefined;
          let loginData = props.candidate.loginData;
          if (loginData !== undefined) {
            if (loginData?.data?.status == "success") {
              setUser(loginData.data.data);
              props.requestCategoryJobs({
                page: params.page,
                page_size: params.page_size,
                id: params.id,
                token: loginData.data.data.token,
              });
              setpage_size(params.page_size);
            }
          } else {
            props.requestCategoryJobs({
              page: params.page,
              page_size: params.page_size,
              id: params.id,
            });
            setpage_size(params.page_size);
          }
        } else {
          Swal.fire("Error!", "Already bookmarked for the job.", "error");
          props.candidate.addBookmarkedData = undefined;
        }
      }
    }
  }, [props.candidate.addBookmarkedData]);

  function commentFunction(id) {
    localStorage.setItem("comment", "comment");
    navigate(`/jobDetails/${id}`);
  }

  return (
    <>
      <Header />
      <Breadcrumbs title="Category Wise Job List" />
      <section class="find-job job-list section">
        <div class="container">
          <div class="single-head">
            <div class="row">
              {jobs.length > 0 ? (
                jobs.map((item, index) => {
                  const img = item.employee_logo
                    ? process.env.REACT_APP_API_HOST + item.employee_logo
                    : image;
                  return (
                    <>
                      <div class="col-lg-6 col-12" key={index}>
                        <div class="single-job">
                          <div class="job-image">
                            <a href={`/jobDetails/${item.id}`}>
                              <img
                                src={img}
                                alt="logo"
                                height="50"
                                style={{ marginTop: "5px" }}
                              />
                            </a>
                          </div>
                          <div class="job-content">
                            <h4>
                              <a href={`/jobDetails/${item.id}`}>
                                {item.title}
                              </a>
                            </h4>
                            <p>
                              <a href={`/jobDetails/${item.id}`}>
                                {" "}
                                {item.description &&
                                  item.description.substring(0, 120)}
                              </a>
                            </p>
                            <ul>
                              <li>
                                <i class="lni lni-website"></i>
                                <a
                                  href={`${item.employee_website}`}
                                  target="_blank"
                                >
                                  {" "}
                                  {item.employee_website}
                                </a>
                              </li>
                              <li>
                                <a href={`/jobDetails/${item.id}`}>
                                  {" "}
                                  {item.currency_name} {item.salary_from}-
                                  {item.salary_to}
                                </a>
                              </li>
                              <li>
                                <a href={`/jobDetails/${item.id}`}>
                                  {" "}
                                  <i class="lni lni-map-marker"></i>{" "}
                                  {item.city_name}, {item.state_name},{" "}
                                  {item.country_name}
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div class="job-button">
                            <ul>
                              <li>
                                <button
                                  style={{
                                    border: "0px",
                                    backgroundColor: "#edf0fd",
                                    color: "#2043e3",
                                    padding: "5px 8px",
                                    borderRadius: "5px",
                                    margin: "2px",
                                  }}
                                  onClick={() => {
                                    bookmarkJobs(item.id);
                                  }}
                                >
                                  {item.isbookmarkJob ? (
                                    <i class="fa fa-heart"></i>
                                  ) : (
                                    <i class="fa fa-heart-o"></i>
                                  )}
                                </button>
                                <button
                                  style={{
                                    border: "0px",
                                    backgroundColor: "#edf0fd",
                                    color: "#2043e3",
                                    padding: "5px 8px",
                                    borderRadius: "5px",
                                    margin: "2px",
                                  }}
                                  onClick={() => {
                                    commentFunction(item.id);
                                  }}
                                >
                                  <i class="fa fa-commenting-o"></i>
                                </button>

                                <RWebShare
                                  data={{
                                    text: "Job Portal",
                                    url: `${window.location.protocol}//${window.location.host}/jobDetails/${item.id}`,
                                    title: "Job Portal",
                                  }}
                                >
                                  <button
                                    style={{
                                      border: "0px",
                                      backgroundColor: "#edf0fd",
                                      color: "#2043e3",
                                      padding: "5px 9px",
                                      borderRadius: "5px",
                                      margin: "2px",
                                    }}
                                  >
                                    <i class="fa fa-share-alt"></i>
                                  </button>
                                </RWebShare>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <h6 class="nojob">
                    <br />
                    <br />
                    No jobs are found.
                  </h6>
                </>
              )}
            </div>
            {jobs.length > 0 && (
              <div class="row">
                <div class="col-10">
                  <div class="pagination center">
                    <ul class="pagination-list">
                      {pagination.current_page !== 1 && (
                        <li>
                          <a
                            href={`/jobCategoryWise/${params.id}/${params.page - 1
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
                              href={`/jobCategoryWise/${params.id}/${i}/${params.page_size}`}
                            >
                              {i}
                            </a>
                          </li>
                        ) : (
                          <li>
                            <a
                              href={`/jobCategoryWise/${params.id}/${i}/${params.page_size}`}
                            >
                              {i}
                            </a>
                          </li>
                        );
                      })}
                      {pagination.current_page !== pagination.last_page && (
                        <li>
                          <a
                            href={`/jobCategoryWise/${params.id}/${Number(params.page) + 1
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
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestCategoryJobs, requestLogin, requestAddBookmark },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(JobCategoryWise);
