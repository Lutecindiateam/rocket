import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestAdminLogin,
  requestAdminGetProfile,
  requestAdminUpdateProfile,
} from "../Redux/actions";
import camera from "../images/camera.png";
import img1 from "../images/extraLogo.png";
import Swal from "sweetalert2";

function Profile(props) {

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [img, setimg] = useState("");
  const [admin, setadmin] = useState({});
  const [data, setdata] = useState({});

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setadmin(loginData.data.data);
        props.requestAdminGetProfile({
          id: loginData.data.data.id,
        });
      }
    }
  }, [props.data.loginData]);

  useEffect(() => {
    let getProfileData = props.data.getProfileData;
    if (getProfileData !== undefined) {
      if (getProfileData?.data?.status == "success") {
        setdata(getProfileData.data.data[0]);
        if (getProfileData.data.data[0].profile) {
          setimg(process.env.REACT_APP_API_HOST + getProfileData.data.data[0].profile);
        } else {
          setimg(img1);
        }
      }
    }
  }, [props.data.getProfileData]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    setimg(URL.createObjectURL(e.target.files[0]));
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setdata((data) => ({
      ...data,
      profile: e.target.files[0].name,
    }));
  };

  function changeName(e) {
    setdata((data) => ({
      ...data,
      name: e.target.value,
    }));
  }
  function submitForm(e) {
    e.preventDefault();
    let formData
    if (selectedFile) {
      formData = new FormData();
      formData.append("profile", selectedFile);
    }
    props.requestAdminUpdateProfile({
      id: admin.id,
      token: admin.token,
      data: {
        profile: formData,
        name: { name: data.name }
      }
    });
  }

  useEffect(() => {
    let updateProfileData = props.data.updateProfileData;
    if (updateProfileData !== undefined) {
      if (updateProfileData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Profile updated successfully..',
          icon: 'success'
        });
      }
    }
    props.data.updateProfileData = undefined;
  }, [props.data.updateProfileData]);
  return (
    <>
      <div class="container-scroller">
        <Header name="Profile" />
        <div class="container-fluid page-body-wrapper">
          <Sidebar name="Profile" />

          <div class="main-panel">
            <div class="content-wrapper">
              <div class="row">
                <div class="col-sm-12">
                  <div class="home-tab">
                    <div class="col-12 grid-margin stretch-card">
                      <div class="card">
                        <div class="card-body">
                          <form class="forms-sample">
                            <div class="form-group">
                              <label for="exampleInputName1">Name</label>
                              <input
                                type="text"
                                class="form-control"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={data.name}
                                onChange={changeName}
                              />
                            </div>

                            <div class="form-group">
                              <label>Profile &nbsp;&nbsp;</label>
                              <br />
                              <br />
                              <div
                                style={{
                                  position: "relative",
                                  left: "0px",
                                  top: "0px",
                                }}
                              >
                                <img
                                  src={img}
                                  width="250"
                                  style={{
                                    position: "relative",
                                    top: "0px",
                                    border: "2px solid black",
                                    borderRadius: "25px",
                                  }}
                                />

                                <label for="file-input">
                                  <img
                                    src={camera}
                                    height="35"
                                    width="auto"
                                    style={{
                                      position: "absolute",
                                      top: "-12px",
                                      left: "230px",
                                      backgroundColor: "white",
                                      borderRadius: "25px",
                                      border: "1px solid black",
                                      padding: "3px",
                                    }}
                                  />
                                </label>

                                <input
                                  id="file-input"
                                  type="file"
                                  style={{ display: "none" }}
                                  name="profile"
                                  onChange={onSelectFile}
                                />
                              </div>
                            </div>
                            <br />
                          </form>
                          <button
                            type="submit"
                            class="btn btn-primary me-2"
                            style={{ color: "white" }}
                            onClick={submitForm}
                          >
                            Submit
                          </button>
                          <button class="btn btn-light">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { data: state.data };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestAdminLogin, requestAdminGetProfile, requestAdminUpdateProfile },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
