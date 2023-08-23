import Footer from "./footer";
import Header from "./header";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestJobs,
  requestLogin,
  requestAddBookmark,
} from "../Redux/actions";
import WOW from "wowjs";
import image from "../images/extraLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { Storage } from 'aws-amplify';

function JobList(props) {

  const [user, setUser] = useState({});
  const [jobs, setjobs] = useState([]);
  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [pages, setpages] = useState([]);
  const params = useParams();
  const [page_size, setpage_size] = useState(0);
  const [img, setImg] = useState()
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        props.requestJobs({
          page: params.page,
          page_size: params.page_size,
          token: loginData.data.data.token,
        });
        setpage_size(params.page_size);
      }
    } else {
      props.requestJobs({
        page: params.page,
        page_size: params.page_size,
      });
      setpage_size(params.page_size);
    }
  }, [params.page, params.page_size, props.candidate.loginData]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/jobList/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let jobsData = props.candidate.jobsData;
    if (jobsData !== undefined) {
      if (jobsData.data) {
        // console.log(jobsData.data.data);
        setjobs(jobsData.data.data);
        setpagination(jobsData.data.meta);
        if (jobsData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(jobsData.data.meta.last_page), (e, i) => {
            array.push(i + 1);
          });
          setpages(array);
        } else {
          let array = [];
          if (jobsData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            jobsData.data.meta.last_page - jobsData.data.meta.current_page <=
            2
          ) {
            array.push(
              jobsData.data.meta.last_page - 4,
              jobsData.data.meta.last_page - 3,
              jobsData.data.meta.last_page - 2,
              jobsData.data.meta.last_page - 1,
              jobsData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(jobsData.data.meta.current_page) - 2,
              Number(jobsData.data.meta.current_page) - 1,
              jobsData.data.meta.current_page,
              Number(jobsData.data.meta.current_page) + 1,
              Number(jobsData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.candidate.jobsData]);

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
              props.requestJobs({
                page: params.page,
                page_size: params.page_size,
                token: loginData.data.data.token,
              });
              setpage_size(params.page_size);
            }
          } else {
            props.requestJobs({
              page: params.page,
              page_size: params.page_size,
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

  // console.log(jobs);
  return (
    <>
      <Header />
      <Breadcrumbs title="Job List" />
      <section class="find-job job-list section">
        <div class="container">
          <div class="single-head">
            <div class="row">
              {jobs.map((item, index) => {
                // (async () => {
                //   const s3key = `employerProfile/${item.company_id}`;
                //   try {
                //     const response = await Storage.list(s3key);
                //     if (response.results.length > 0) {
                //       const img = await Storage.get(s3key);
                //       // setImg(getImg)
                //     }
                //     // Do something with the image URL (img)
                //     console.log(image); // You can log the image URL or use it as needed
                //     // Here, you can set the image URL to the state or use it in any other way
                //   } catch (error) {
                //     setImg(image)
                //     console.error(`Error fetching image for job ${item.company_id}:`, error);
                //     // Handle the error, e.g., set a default image URL or handle the absence of the image
                //   }
                // })();
                const img = item.employee_logo
                  ? process.env.REACT_APP_API_HOST + item.employee_logo
                  : image;
                return (
                  <>
                    <div class="col-lg-6 col-12" key={index}>

                      <div class="single-job">
                        <b><a href={`/jobDetails/${item.id}`}>{item.company_name.charAt(0).toUpperCase() + item.company_name.slice(1)}</a></b>
                        <br />
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
                            <a href={`/jobDetails/${item.id}`}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</a>
                          </h4>
                          <a href={`/jobDetails/${item.id}`}>
                            <p>
                              {" "}
                              {item.description &&
                                item.description.substring(0, 120)}
                            </p>
                          </a>
                          <ul>
                            <li>
                              <i class="lni lni-website"></i>
                              <a
                                href={`${item.website}`}
                                target="_blank"
                              >
                                {" "}
                                {item.website &&
                                  item.website.substring(0, 30)}
                              </a>
                            </li>
                            <li>
                              <a href={`/jobDetails/${item.id}`}>
                                {" "}
                                INR {item.salary_from}-
                                {item.salary_to} L
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
                        {/* <div class="job-button ">
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
                        </div> */}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div class="row">
              <div class="col-10">
                <div class="pagination center">
                  <ul class="pagination-list">
                    {pagination.current_page !== 1 && (
                      <li>
                        <a
                          href={`/jobList/${params.page - 1}/${params.page_size
                            }`}
                        >
                          <i class="fa fa-long-arrow-left"></i>
                        </a>
                      </li>
                    )}
                    {pages.map((i) => {
                      return pagination.current_page === i ? (
                        <li class="active">
                          <a href={`/jobList/${i}/${params.page_size}`}>{i}</a>
                        </li>
                      ) : (
                        <li>
                          <a href={`/jobList/${i}/${params.page_size}`}>{i}</a>
                        </li>
                      );
                    })}
                    {pagination.current_page !== pagination.last_page && (
                      <li>
                        <a
                          href={`/jobList/${Number(params.page) + 1}/${params.page_size
                            }`}
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
    { requestJobs, requestLogin, requestAddBookmark },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
