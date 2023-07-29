import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { userLogout } from "../Redux/actions";

function Sidebar(props) {
    const navigate=useNavigate()
    const [show, setShow] = useState("none");
    const [setting, setSetting] = useState("none");
    function displayOption() {
        if (show === "none") {
            setShow("block")
        } else {
            setShow("none")
        }
    }
    function displaySetting() {
        if (setting === "none") {
            setSetting("block")
        } else {
            setSetting("none")
        }
    }

    function logout(){
        props.userLogout();
        navigate("/admin/login")
    }
    return (
        <>
            {/* <div class="theme-setting-wrapper">
                <button style={{ border: "0px", backgroundColor: "transparent" }} onClick={displaySetting}>
                    <div id="settings-trigger"><i class="fa fa-cog"></i></div>
                </button>

                <div id="theme-settings" class="settings-panel"  style={{ display: `${setting}` }}>
                    <i class="settings-close ti-close"></i>
                    <p class="settings-heading">SIDEBAR SKINS</p>
                    <div class="sidebar-bg-options selected" id="sidebar-light-theme"><div class="img-ss rounded-circle bg-light border me-3"></div>Light</div>
                    <div class="sidebar-bg-options" id="sidebar-dark-theme"><div class="img-ss rounded-circle bg-dark border me-3"></div>Dark</div>
                    <p class="settings-heading mt-2">HEADER SKINS</p>
                    <div class="color-tiles mx-0 px-4">
                        <div class="tiles success"></div>
                        <div class="tiles warning"></div>
                        <div class="tiles danger"></div>
                        <div class="tiles info"></div>
                        <div class="tiles dark"></div>
                        <div class="tiles default"></div>
                    </div>
                </div>
            </div> */}

            <nav class="sidebar sidebar-offcanvas" id="sidebar"  style={{marginLeft:"-12px"}}>
                <ul class="nav">
                    <li class={`nav-item ${props.name === "Home" && "active"} `}>
                        <a class="nav-link" href="/admin/home">
                            <i class="fa fa-home menu-icon"></i>
                            <span class="menu-title">Home</span>
                        </a>
                    </li>

                    <li class="nav-item nav-category">Data</li>
                    <li class={`nav-item ${props.name === "Companies" && "active"} `}>
                        <a class="nav-link" href="/admin/companies/1/10" >
                            <i class="menu-icon fa fa-building"></i>
                            <span class="menu-title">Companies</span>
                        </a>
                    </li>
                    <li class={`nav-item ${props.name === "Candidates" && "active"} `}>
                        <a class="nav-link" href="/admin/candidates/1/10" >
                            <i class="menu-icon fa fa-users"></i>
                            <span class="menu-title">Candidates</span>
                        </a>
                    </li>
                    <li class={`nav-item ${props.name === "Jobs" && "active"} `}>
                        <a class="nav-link" href="/admin/jobs/1/10" >
                            <i class="menu-icon fa fa-user-secret"></i>
                            <span class="menu-title">Jobs</span>
                        </a>
                    </li>

                    <li class="nav-item nav-category">Options</li>
                    <li class={`nav-item ${props.name === "Options" && "active"} `}>
                        <button class="nav-link" style={{ border: "0px", backgroundColor: "transparent" }} onClick={displayOption}>
                            <i class="menu-icon fa fa-th"></i>
                            <span class="menu-title">Options</span>
                            <i class="menu-arrow"></i>
                        </button>
                        <div class="collapse" id="form-elements" style={{ display: `${show}` }}>
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item" >
                                    <a class="nav-link" href="/admin/career/1/10">
                                        <i class="fa fa-area-chart"> Industrial Category </i>
                                    </a>
                                </li>
                                {/* <li class="nav-item">
                                    <a class="nav-link" href="/admin/size/1/10">
                                        <i class="fa fa-signal"> Company Size</i>
                                    </a>
                                </li> */}
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/degree/1/10">
                                        <i class="fa fa-graduation-cap" > Education </i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/functional/1/10">
                                        <i class="fa fa-cogs"> Course </i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/industries/1/10">
                                        <i class="fa fa-industry"> Expiry </i>
                                    </a>
                                </li>
                                {/* <li class="nav-item">
                                    <a class="nav-link" href="/admin/categories/1/10">
                                        <i class="fa fa-th-large"> Job Categories </i>
                                    </a>
                                </li> */}
                                {/* <li class="nav-item">
                                    <a class="nav-link" href="/admin/shifts/1/10">
                                        <i class="fa fa-clock-o">  Job Shifts</i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/tags/1/10">
                                        <i class="fa fa-hashtag"> Tags </i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/types/1/10">
                                        <i class="fa fa-bars">  Job Types</i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/ownership/1/10">
                                        <i class="fa fa-university">  Ownership Types</i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/position/1/10">
                                        <i class="fa fa-sitemap">  Positions</i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/currency/1/10">
                                        <i class="fa fa-inr">  Salary Currency </i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/period/1/10">
                                        <i class="fa fa-circle-o-notch">  Salary Period </i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/skill/1/10">
                                        <i class="fa fa-thumbs-up"> Skills</i>
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item nav-category">Subscribe</li>
                    <li class={`nav-item ${props.name === "Subscribe" && "active"} `}>
                        <a class="nav-link" href="/admin/subscribe/1/10">
                            <i class="menu-icon fa fa-file"></i>
                            <span class="menu-title">Subscribers</span>
                        </a>
                    </li>
                    <li class={`nav-item ${props.name === "Contact" && "active"} `}>
                        <a class="nav-link" href="/admin/contact/1/10">
                            <i class="menu-icon fa fa-question-circle-o"></i>
                            <span class="menu-title">Contact</span>
                        </a>
                    </li>
                    <li class="nav-item nav-category">Profile</li>
                    <li class={`nav-item ${props.name === "Profile" && "active"} `}>
                        <a class="nav-link" href="/admin/profile">
                            <i class="menu-icon fa fa-user-circle-o"></i>
                            <span class="menu-title">Profile</span>
                        </a>
                    </li>
                    <li class={`nav-item ${props.name === "Password" && "active"} `}>
                        <a class="nav-link" href="/admin/changepass">
                            <i class="menu-icon fa fa-unlock-alt"></i>
                            <span class="menu-title">Change Password</span>
                        </a>
                    </li>
                    <li class="nav-item" style={{cursor:"pointer"}}>
                        <a class="nav-link" onClick={logout}>
                            <i class="menu-icon fa fa-sign-out"></i>
                            <span class="menu-title">Logout</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
const mapStateToProps = (state) => {
    return { data: state.data };
  };
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {  userLogout },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);