import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestCategory,
  requestSearchJob,
  requestLogin,
  requestAddBookmark,
} from "../Redux/actions";
import WOW from "wowjs";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import image from "../images/extraLogo.png";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { RWebShare } from "react-web-share";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function BrowseJobs(props) {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [items, setitems] = useState([]);
  const [state, setState] = useState({
    suggestions: [],
    text: "",
  });
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    props.requestCategory();
  }, []);

  useEffect(() => {
    const suggestions = props.candidate.suggestionsJobData;
    if(suggestions !== undefined){
      if(suggestions?.data?.status == "success")
      setitems(suggestions?.data?.data[0].suggestion)
    }}, [props.candidate.suggestionsJobData])

  useEffect(() => {
    let categoryData = props.candidate.categoryData;
    if (categoryData) {
      if (categoryData?.data?.status == "success") {
        setCategories(categoryData.data.data.categories);
      }
    }
  }, [props.candidate.categoryData]);

  useEffect(() => {
    {
      categories.map((item1) => {
        if (items.indexOf(item1.name) === -1) {
          items.push(item1.name);
        }
      });
    }
  }, [categories]);

  const onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter((v) => regex.test(v));
    }
    setState(() => ({ suggestions, text: value }));
  };

  function suggestionSelected(value) {
    setState(() => ({
      text: value,
      suggestions: [],
    }));
  }

  function renderSuggestionsTitle() {
    const { suggestions } = state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="srchList">
        <div
          style={{
            backgroundColor: "white",
            margin: "0px -2px",
            marginTop: "1px",
            border: "4px solid rgba(13, 110, 253, .25)",
            borderRadius: "5px",
            padding: "8px 20px",
            cursor: "pointer",
          }}
        >
          <ul>
            {suggestions.map((item) => (
              <li
                style={{ fontSize: "14px", color: "black" }}
                onClick={() => suggestionSelected(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
      () => {
        setValue(description, false);
        clearSuggestions();
        // getGeocode({ address: description })
        //   .then((results) => getLatLng(results[0]))
        //   .then(({ lat, lng }) => {
        //     //console.log("📍 Coordinates: ", { lat, lng });
        //   })
        //   .catch((error) => {
        //     //console.log("😱 Error: ", error);
        //   });
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      const text = main_text + ", " + secondary_text;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <small style={{ fontSize: "14px", color: "black" }}>
            {text.length > 50 ? text.substring(0, 50) + "..." : text}
          </small>
        </li>
      );
    });

    //this is for only login users can serach jobs
  // function submitForm() {
  //   const answer_array = value.split(",");
  //   const country = answer_array[0];

  //   let loginData = props.candidate.loginData;
  //   // if (loginData !== undefined) {
  //   //   if (loginData?.data?.status == "success") {
  //   //     setUser(loginData.data.data);
  //   props.requestSearchJob({
  //     token: loginData.data.data.token,
  //     data: {
  //       title: state.text,
  //       country: country,
  //     },
  //   });
  //   //   }
  //   // } else {
  //   //   props.requestSearchJob({
  //   //     data: {
  //   //       title: state.text,
  //   //       country: country,
  //   //     },
  //   //   });
  //   // }
  // }

  // useEffect(() => {
  //   if (state.text === null && value === null) {
  //     let loginData = props.candidate.loginData;
  //     // if (loginData !== undefined) {
  //     //   if (loginData?.data?.status == "success") {
  //     //     setUser(loginData.data.data);
  //     props.requestSearchJob({
  //       token: loginData.data.data.token,
  //       data: {
  //         title: "",
  //         country: "",
  //       },
  //     });
  //     //     }
  //     //   } else {
  //     //     props.requestSearchJob({
  //     //       data: {
  //     //         title: "",
  //     //         country: "",
  //     //       },
  //     //     });
  //     //   }
  //   }
  // }, []);

  // useEffect(() => {
  //   const answer_array = value.split(",");
  //   const country = answer_array[0];

  //   let loginData = props.candidate.loginData;

  //   // if (loginData !== undefined) {
  //   //   if (loginData?.data?.status == "success") {
  //   //     setUser(loginData.data.data);
  //   props.requestSearchJob({
  //     token: loginData.data.data.token,
  //     data: {
  //       title: state.text,
  //       country: country,
  //     },
  //   });
  //   //   }
  //   // } else {
  //   //   props.requestSearchJob({
  //   //     data: {
  //   //       title: state.text,
  //   //       country: country,
  //   //     },
  //   //   });
  //   // }
  // }, [value, state.text]);

  //this is fo both non login and login 
  function submitForm() {
    const answer_array = value.split(",");
    const country = answer_array[0];

    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
    props.requestSearchJob({
      token: loginData.data.data.token,
      data: {
        title: state.text,
        country: country,
      },
    });
      }
    } else {
      props.requestSearchJob({
        data: {
          title: state.text,
          country: country,
        },
      });
    }
  }

  useEffect(() => {
    if (state.text === null && value === null) {
      let loginData = props.candidate.loginData;
      if (loginData !== undefined) {
        if (loginData?.data?.status == "success") {
          setUser(loginData.data.data);
      props.requestSearchJob({
        token: loginData.data.data.token,
        data: {
          title: "",
          country: "",
        },
      });
          }
        } else {
          props.requestSearchJob({
            data: {
              title: "",
              country: "",
            },
          });
        }
    }
  }, []);

  useEffect(() => {
    const answer_array = value.split(",");
    const country = answer_array[0];

    let loginData = props.candidate.loginData;

    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
    props.requestSearchJob({
      token: loginData.data.data.token,
      data: {
        title: state.text,
        country: country,
      },
    });
      }
    } else {
      props.requestSearchJob({
        data: {
          title: state.text,
          country: country,
        },
      });
    }
  }, [value, state.text]);

  useEffect(() => {
    let searchJobData = props.candidate.searchJobData;
    if (searchJobData !== undefined) {
      if (searchJobData?.data?.status == "success") {
        if (searchJobData.data.data) {
          setjobs(searchJobData.data.data);
        } else {
          setjobs([]);
        }
      }
    }

  }, [props.candidate.searchJobData]);

  useEffect(() => {
    let jobKeyword = localStorage.getItem("jobKeyword");
    let jobLocation = localStorage.getItem("jobLocation");
    if (jobKeyword) {
      setState({ ...state, text: jobKeyword });
    }
    if (jobLocation) {
      setValue(jobLocation, false);
      clearSuggestions();
    }
    localStorage.removeItem("jobKeyword");
    localStorage.removeItem("jobLocation");
  }, []);

  // function bookmarkJobs(id) {
  //   let loginData = props.candidate.loginData;
  //   if (loginData !== undefined) {
  //     if (loginData?.data?.status == "success") {
  //       setUser(loginData.data.data);
  //       props.requestAddBookmark({
  //         token: loginData.data.data.token,
  //         id: id,
  //         data: {},
  //       });
  //     } else {
  //       localStorage.setItem("link", `/browseJobs`);
  //       localStorage.setItem("jobKeyword", state.text);
  //       localStorage.setItem("jobLocation", value);
  //       navigate("/login");
  //     }
  //   } else {
  //     localStorage.setItem("link", `/browseJobs`);
  //     localStorage.setItem("jobKeyword", state.text);
  //     localStorage.setItem("jobLocation", value);
  //     navigate("/login");
  //   }
  // }

  // useEffect(() => {
  //   if (user.id) {
  //     let addBookmarkedData = props.candidate.addBookmarkedData;
  //     if (addBookmarkedData !== undefined) {
  //       if (addBookmarkedData?.data?.status == "success") {
  //         Swal.fire("Good job!", "Bookmarked for Job successfully.", "success");
  //         props.candidate.addBookmarkedData = undefined;
  //         const answer_array = value.split(",");
  //         const country = answer_array[0];

  //         let loginData = props.candidate.loginData;
  //         if (loginData !== undefined) {
  //           if (loginData?.data?.status == "success") {
  //             setUser(loginData.data.data);
  //             props.requestSearchJob({
  //               token: loginData.data.data.token,
  //               data: {
  //                 title: state.text,
  //                 country: country,
  //               },
  //             });
  //           }
  //         } else {
  //           props.requestSearchJob({
  //             data: {
  //               title: state.text,
  //               country: country,
  //             },
  //           });
  //         }
  //       } else {
  //         Swal.fire("Error!", "Already bookmarked for the job.", "error");
  //         props.candidate.addBookmarkedData = undefined;
  //       }
  //     }
  //   }
  // }, [props.candidate.addBookmarkedData]);

  // function commentFunction(id) {
  //   localStorage.setItem("comment", "comment");
  //   navigate(`/jobDetails/${id}`);
  // }
  return (
    <>
      <Header />
      <Breadcrumbs title="Browse Job" />
      <section class="find-job section">
        <div class="search-job">
          <div class="container">
            <form onSubmit={submitForm}>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Keyword: Name, Tag"
                    style={{ height: "50px" }}
                    value={state.text}
                    onChange={onTextChanged}
                  />
                  <div className="col-md-12 justify-content-md-center">
                    {renderSuggestionsTitle()}
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Location: City, State, Zip"
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    style={{ height: "50px" }}
                  />

                  {status === "OK" && (
                    <div
                      style={{
                        backgroundColor: "white",
                        margin: "0px -2px",
                        marginTop: "1px",
                        border: "4px solid rgba(13, 110, 253, .25)",
                        borderRadius: "5px",
                        padding: "8px 20px",
                        cursor: "pointer",
                      }}
                    >
                      <ul>{renderSuggestions()}</ul>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="container">
          <div class="single-head">
            <div class="row">
              {jobs.length > 0 ? (
                jobs.map((item, index) => {
                  const img = item.logo
                    ? process.env.REACT_APP_API_HOST + item.logo
                    : image;
                  return (
                    <>
                      <div class="col-lg-6 col-12" key={index}>
                        <div class="single-job">
                          <b><a href={`/jobDetails/${item.id}`}>{item.company_name}</a></b>
                          <br />
                          <div class="job-image">
                            <a href={`/jobDetails/${item._id}`}>
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
                              <a href={`/jobDetails/${item._id}`}>
                                {item.title}
                              </a>
                            </h4>
                            <p>
                              <a href={`/jobDetails/${item._id}`}>
                                {" "}
                                {item.description &&
                                  item.description.substring(0, 120)}
                              </a>
                            </p>
                            <ul>
                              <li>
                                <i class="lni lni-website"></i>
                                <a href={`${item.website}`} target="_blank">
                                  {item.website}
                                </a>
                              </li>
                              <li>
                                <a href={`/jobDetails/${item._id}`}>
                                  {" "}
                                  {/* {item.currency_name} */}
                                  INR {item.salary_from}-
                                  {item.salary_to} L
                                </a>
                              </li>
                              <li>
                                <a href={`/jobDetails/${item._id}`}>
                                  <i class="lni lni-map-marker"></i>{" "}
                                  {item.city_name}, {item.state_name},{" "}
                                  {item.country_name}
                                </a>
                              </li>
                            </ul>
                          </div>

                          {/* <div class="job-button">
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
    { requestCategory, requestSearchJob, requestLogin, requestAddBookmark },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BrowseJobs);
