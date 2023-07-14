import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import ManageAccount from "./manageAccount";
import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestEmpLogin, requestGetEmp } from "../Redux/actions";
import Breadcrumbs from "../Section/breadcrumbsSection";

function Messages(props) {

  const navigate = useNavigate();
  const [emp, setEmp] = useState({});
  const [data, setdata] = useState({});

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
        props.requestGetEmp({
          id: empLoginData.data.data.id,
          token: empLoginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/empMessages");
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", "/empMessages");
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let empData = props.employee.empData;
    if (empData !== undefined) {
      if (empData?.data?.status == "success") {
        setdata(empData.data.data);
      }
    }
  }, [props.employee.empData]);

  const YOUR_APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;
  const USER_ID = data.email;
  const NICKNAME = data.name;
  const myColorSet = {
    height: "500px",
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
  return { employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestEmpLogin,
      requestGetEmp,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
