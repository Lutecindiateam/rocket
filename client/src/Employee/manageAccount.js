import { connect } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  userLogout, 
} from "../Redux/actions";

function ManageAccount(props) {
 
  const navigate = useNavigate();
  function logout() {
    props.userLogout();
    navigate("/home");
  }

  return (
    <div class="col-lg-4 col-12">
      <div class="dashbord-sidebar">
        <ul>
          <li class="heading">Manage Account</li>
          <li>
            <Link
              to="/postJob"
              class={`nav-item ${props.name === "PostJob" && "active"} `}
            >
              <i class="fa fa-plus"></i> Post a Job
            </Link>
          </li>
          <li>
            <Link
              class={`nav-item ${props.name === "Job" && "active"} `}
              to="/manageJobs"
            >
              <i class="fa fa-file-o"></i> Manage Jobs
            </Link>
          </li>

          <li>
            <Link
              class={`nav-item ${props.name === "Application" && "active"} `}
              to="/manageApplications"
            >
              <i class="fa fa-handshake-o"></i> Manage Applications
            </Link>
          </li>
          {/* <li>
            <Link
              class={`nav-item ${props.name === "Interview" && "active"} `}
              to="/interviews"
            >
              <i class="fa fa-black-tie"></i> Iterviews
            </Link>
          </li> */}
          <li>
            <Link
              class={`nav-item ${props.name === "Messages" && "active"} `}
              to="/empMessages"
            >
              <i class="fa fa-comments-o"></i> Messages
            </Link>
          </li>
          <li>
            <Link
              class={`nav-item ${props.name === "Settings" && "active"} `}
              to="/empsettings"
            >
              <i class="fa fa-cog"></i> Settings
            </Link>
          </li>
          <li>
            <Link to="/home" onClick={logout}>
              <i class="fa fa-sign-out"></i> Sing Out
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
    { userLogout,  },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
