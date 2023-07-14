import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestCountLastweekJob } from "../Redux/actions";
import WOW from "wowjs";
import logodashboard from '../assets/images/about/small1.jpg'
import thirdlogo from '../assets/images/about/small3.jpg'
import secondlogo from '../assets/images/about/small2.jpg'

function AboutUsSection(props) {

  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  const [jobcount, setjobcount] = useState(0);

  useEffect(() => {
    props.requestCountLastweekJob();
  }, []);

  useEffect(() => {
    let lastweekjob = props.candidate.lastWeekJobCount;
    if (lastweekjob !== undefined) {
      if (lastweekjob?.data?.status === "success") {
        setjobcount(lastweekjob.data.data);
      }
    }
  }, [props.candidate.lastWeekJobCount]);

  return (
    <>
      <section class="about-us section">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-lg-6 col-md-10 col-12">
              <div class="content-left wow fadeInLeft" data-wow-delay=".3s">
                <div calss="row">
                  <div calss="col-lg-6 col-12">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-6">
                        <img
                          class="single-img"
                          // src="assets/images/about/small1.jpg"
                          src={logodashboard}
                          alt="#"
                        />
                      </div>
                      <div class="col-lg-6 col-md-6 col-6">
                        <img
                          class="single-img mt-50"
                          // src="assets/images/about/small2.jpg"
                          src={secondlogo}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                  <div calss="col-lg-6 col-12">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-6">
                        <img
                          class="single-img minus-margin"
                          // src="assets/images/about/small3.jpg"
                          src={thirdlogo}
                          alt="#"
                        />
                      </div>
                      <div class="col-lg-6 col-md-6 col-6">
                        <div class="media-body">
                          <i class="lni lni-checkmark"></i>
                          <h6 class="">Job alert!</h6>
                          <p class="">
                            {jobcount} new jobs are available in this week!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-10 col-12">
              <div class="content-right wow fadeInRight" data-wow-delay=".5s">
                <h2>
                  Help you to get the <br />
                  best job that fits you
                </h2>

                <div class="single-list">
                  <i class="lni lni-grid-alt"></i>

                  <div class="list-bod">
                    <h5>#1 Jobs site in Nagpur</h5>
                    <p>
                      Leverage agile frameworks to provide a robust synopsis for
                      high level overviews. Iterative
                    </p>
                  </div>
                </div>

                <div class="single-list">
                  <i class="lni lni-search"></i>

                  <div class="list-bod">
                    <h5>Seamless searching</h5>
                    <p>
                      Capitalize on low hanging fruit to identify a ballpark
                      value added activity to beta test.
                    </p>
                  </div>
                </div>

                <div class="single-list">
                  <i class="lni lni-stats-up"></i>

                  <div class="list-bod">
                    <h5>Hired in top companies</h5>
                    <p>
                      Podcasting operational change management inside of
                      workflows to establish.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestCountLastweekJob,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsSection);
