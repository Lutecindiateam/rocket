import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  userLogout,
  requestCountNotification,
  requestLogin,
} from "../Redux/actions";

function ManageAccount(props) {
  const [user, setUser] = useState({});
  const [count, setcount] = useState(props.notificationCount || 0);
  const navigate = useNavigate();
  function logout() {
    props.userLogout();
    navigate("/home");
  }

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
        props.requestCountNotification({
          token: loginData.data.data.token,
        });
      } 
      else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let countNotificationData = props.candidate.countNotificationData;
    if (countNotificationData !== undefined) {
      if (countNotificationData?.data?.status === "success") {
        setcount(countNotificationData.data.data);
      }
    }
  }, [props.candidate.countNotificationData]);
  return (
    <div class="col-lg-4 col-12">
      <div class="dashbord-sidebar">
        <ul>
          <li class="heading">Manage Account</li>
        <li>
            <Link
              class={`nav-item ${props.name === "Resume" && "active"} `}
              to="/resume"
            >
              <i class="fa fa-file-o"></i> My Resume
            </Link>
          </li>
          {/* <li>
            <Link
              class={`nav-item ${props.name === "Bookmarked" && "active"} `}
              to="/bookmarked"
            >
              <i class="fa fa-bookmark-o"></i> Bookmarked Jobs
            </Link>
          </li> */}
          <li>
            <Link
              class={`nav-item ${props.name === "Applied" && "active"} `}
              to="/appliedJobs"
            >
              <i class="fa fa-handshake-o"></i> Applied Jobs
            </Link>
          </li>
          {/* <li>
            <Link
              class={`nav-item ${props.name === "Notification" && "active"} `}
              to="/notifications/1/5"
            >
              <i class="fa fa-bell-o"></i> Notifications{" "}
              {count > 0 && <span class="notifi">{count}</span>}
            </Link>
          </li> */}
          {/* <li>
            <Link
              class={`nav-item ${props.name === "Messages" && "active"} `}
              to="/messages"
            >
              <i class="fa fa-comments-o"></i> Messages
            </Link>
          </li>
          <li> */}
            {/* <Link
              class={`nav-item ${props.name === "Alert" && "active"} `}
              to="/jobAlerts"
            >
              <i class="fa fa-exclamation"></i> Job Alerts
            </Link>
          </li> */}
          <li>
            <Link
              class={`nav-item ${props.name === "Settings" && "active"} `}
              to="/settings"
            >
              <i class="fa fa-cog"></i> Settings
            </Link>
          </li>
          <li>
            <Link onClick={logout} to="/home">
              <i class="fa fa-sign-out"></i> Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { userLogout, requestCountNotification, requestLogin },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
