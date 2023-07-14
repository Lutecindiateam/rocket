import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import ManageAccount from "./manageAccount";
import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestLogin, requestGetCandidate } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../Section/breadcrumbsSection";

function Messages(props) {

  const navigate = useNavigate();
  const [user, setuser] = useState({});
  const [data, setData] = useState({});
  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setuser(loginData.data.data);
        props.requestGetCandidate({
          id: loginData.data.data.id,
          token: loginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/messages");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/messages");
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let getCandidateData = props.candidate.getCandidateData;
    if (getCandidateData !== undefined) {
      if (getCandidateData?.data?.status == "success") {
        setData(getCandidateData.data.data);
      }
    }
  }, [props.candidate.getCandidateData]);

  const YOUR_APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;
  const USER_ID = data.email;
  const NICKNAME = data.first_name + " " + data.last_name;
  const myColorSet = {
    height: "565px",
    "--sendbird-light-primary-500": "#2042e3",
    "--sendbird-light-primary-400": "#4967e9",
    "--sendbird-light-primary-300": "#778dee",
    "--sendbird-light-primary-200": "#a4b3f4",
    "--sendbird-light-primary-100": "#d2d9f9",
  };
  const [stringSet] = useState({
    PLACE_HOLDER__WRONG: "Loading", // You can display these texts in other languages also.
    PLACE_HOLDER__NO_CHANNEL: "Loading",
  });
  return (
    <>
      <Header />
      <Breadcrumbs title="Messages" />
      <div class="resume section">
        <div class="container">
          <div class="resume-inner">
            <div class="row">
              <ManageAccount name="Messages" />

              <div class="col-lg-8 col-12">
                <div class="inner-content">
                  <div className="App" style={myColorSet}>
                    <SendBirdApp
                      style={myColorSet}
                      appId={YOUR_APP_ID}
                      userId={USER_ID}
                      nickname={NICKNAME}
                      showSearchIcon={true}
                      stringSet={stringSet}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestLogin,
      requestGetCandidate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
