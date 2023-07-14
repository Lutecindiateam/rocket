
import minimg from "../images/extraLogo.png";
import profile from "../images/profile.png";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminLogin, userLogout, requestAdminGetProfile } from "../Redux/actions";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const [show, setShow] = useState("none");
  const [profileimg, setprofileimg] = useState("");
  const [admin, setadmin] = useState({});
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  function displayShow() {
    if (show === "none") {
      setShow("block");
    } else {
      setShow("none");
    }
  }

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setadmin(loginData.data.data);
        props.requestAdminGetProfile({
          id: loginData.data.data.id,
        });
      } else {
        navigate("/admin/login");
      }
    } else {
      navigate("/admin/login");
    }
  }, [props.data.loginData]);

  useEffect(() => {
    let getProfileData = props.data.getProfileData;
    if (getProfileData !== undefined) {
      if (getProfileData?.data?.status == "success") {
        setdata(getProfileData.data.data[0]);
        if (getProfileData.data.data[0].profile) {
          setprofileimg(
            process.env.REACT_APP_API_HOST + getProfileData.data.data[0].profile
          );
        } else {
          setprofileimg(profile);
        }
      }
    }
  }, [props.data.getProfileData]);

  function logout() {
    props.userLogout();
    navigate("/admin/login");
  }

  return (
    <>
      <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          {/* <div class="me-3">
            <button
              class="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-bs-toggle="minimize"
            >
              <span class="fa fa-bars"></span>
            </button>
          </div> */}
          <div>
            <a class="navbar-brand brand-logo" href="/admin/home">
              {/* <img src={img} alt="logo" style={{ height: "40px" }} /> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#2042e3",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 40,
                    borderTopRightRadius: 0,
                    width: 70,
                    height: 40,
                  }}
                >
                  <h4
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      marginTop: "3.5%",
                    }}
                  >
                    {"Job"}
                  </h4>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000",
                    borderTopLeftRadius: 40,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    width: 80,
                    height: 40,
                  }}
                >
                  <h4
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      marginTop: "10%",
                    }}
                  >
                    &nbsp;{"Portal"}
                  </h4>
                </div>
              </div>
            </a>
            {/* <a class="navbar-brand brand-logo-mini" href="/admin/home">
              <img src={minimg} alt="logo" />
            </a> */}
          </div>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-top">
          <ul class="navbar-nav">
            <li class="nav-item font-weight-semibold d-none d-lg-block ms-0">
              <h3 class="welcome-sub-text text-black fw-bold">{props.name} </h3>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item admin-nav-item dropdown d-none d-lg-block user-dropdown">
              <button
                class="nav-link"
                style={{ border: "0px", backgroundColor: "transparent" }}
                onClick={displayShow}
              >
                <img
                  class="img-xs rounded-circle"
                  src={profileimg}
                  alt="Profile image"
                  style={{ border: "1.5px solid black" }}
                />
              </button>
              <div
                class="dropdown-menu dropdown-menu-right navbar-dropdown"
                style={{ display: `${show}` }}
              >
                <div class="dropdown-header text-center">
                  <img
                    class="img-md rounded-circle"
                    src={profileimg}
                    alt="Profile image"
                    style={{ height: "100px", width: "100px", border: "1.5px solid black" }}
                  />
                  <p class="mb-1 mt-3 font-weight-semibold">{data.name}</p>
                  <p class="fw-light text-muted mb-0">{data.email}</p>
                </div>
                <a class="dropdown-item" href="/admin/profile">
                  <i class="dropdown-item-icon mdi mdi-account-outline text-primary me-2"></i>{" "}
                  My Profile{" "}
                </a>
                <a class="dropdown-item" onClick={logout}>
                  <i class="dropdown-item-icon mdi mdi-power text-primary me-2"></i>
                  Sign Out
                </a>
              </div>
            </li>
          </ul>
          <button
            class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-bs-toggle="offcanvas"
          >
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
}
const mapStateToProps = (state) => {
  return { data: state.data };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestAdminLogin, userLogout, requestAdminGetProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
