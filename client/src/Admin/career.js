import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { RWebShare } from "react-web-share";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestAdminAddCareer,
  requestAdminAllCareer,
  requestAdminCareer,
  requestAdminDeleteCareer,
  requestAdminEditCareer,
} from "../Redux/actions";
import Swal from "sweetalert2";
function Career(props) {

  const [pagination, setpagination] = useState({});
  const [change, setchange] = useState(false);
  const navigate = useNavigate();
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);
  const [error, seterror] = useState("");
  const [id, setid] = useState(0);
  const [careerData, setcareerData] = useState([]);
  const [adddata, setadddata] = useState({
    level: "",
  });
  const [editdata, seteditdata] = useState({
    level: "",
  });
  const params = useParams();
  const [addmodal, setaddModal] = useState(false);
  const [editmodal, seteditModal] = useState(false);

  function validateadd() {
    let formIsValid = false;
    if (!adddata["level"]) {
      formIsValid = false;
      seterror("*Enter careerData level.");
    } else if (typeof adddata["level"] !== "undefined") {
      if (!adddata["level"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterror("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterror("");
      }
    }
    return formIsValid;
  }
  function validateedit() {
    let formIsValid = false;
    if (!editdata["level"]) {
      formIsValid = false;
      seterror("*Enter careerData level.");
    } else if (typeof editdata["level"] !== "undefined") {
      if (!editdata["level"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterror("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterror("");
      }
    }
    return formIsValid;
  }
  function onchangeadddata(e) {
    setadddata({ level: e.target.value });
  }
  function onchangeeditdata(e) {
    seteditdata({ level: e.target.value });
  }
  const addtoggle = () => setaddModal(!addmodal);
  const saveaddtoggle = (e) => {
    e.preventDefault();
    if (validateadd()) {
      props.requestAdminAddCareer({
        data: {
          level: adddata.level,
        },
      });
      setadddata({
        level: "",
      });
      addtoggle();
    }
  };

  useEffect(() => {
    let addCareerData = props.data.addCareerData;
    if (addCareerData !== undefined) {
      if (addCareerData.data) {
        Swal.fire({
          title: "Good job!",
          text: "Career level added successfully..",
          icon: "success",
        });
        setchange(!change);
      }
    }
    props.data.addCareerData = undefined;
  }, [props.data.addCareerData]);

  const edittoggle = (id) => {
    if (editmodal === true) {
      seteditModal(!editmodal);
    } else {
      seteditModal(!editmodal);
      setid(id);
      seteditdata({
        level: " ",
      });
      props.requestAdminCareer({
        id: id,
      });
    }
  };

  useEffect(() => {
    let careerData = props.data.careerData;
    if (careerData !== undefined) {
      if (careerData.data) {
        seteditdata(careerData.data.data.CareerLevel[0]);
      }
    }
  }, [props.data.careerData]);

  const saveedittoggle = (e) => {
    e.preventDefault();
    if (validateedit()) {
      props.requestAdminEditCareer({
        id: id,
        data: {
          level: editdata.level,
        },
      });
      seteditdata({
        level: "",
      });
      setid(0);
      edittoggle();
    }
  };

  useEffect(() => {
    let editCareerData = props.data.editCareerData;
    if (editCareerData !== undefined) {
      if (editCareerData.data) {
        Swal.fire({
          title: "Good job!",
          text: "Career level updated successfully..",
          icon: "success",
        });
        setchange(!change);
      }
    }
    props.data.editCareerData = undefined;
  }, [props.data.editCareerData]);

  useEffect(() => {
    props.requestAdminAllCareer({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size, change]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/careerData/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let allCareerData = props.data.allCareerData;
    if (allCareerData !== undefined) {
      if (allCareerData.data) {
        setcareerData(allCareerData.data.data);
        setpagination(allCareerData.data.meta);
        if (allCareerData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(allCareerData.data.meta.last_page), (e, i) =>
            array.push(i + 1)
          );
          setpages(array);
        } else {
          let array = [];
          if (allCareerData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            allCareerData.data.meta.last_page - allCareerData.data.meta.current_page <=
            2
          ) {
            array.push(
              allCareerData.data.meta.last_page - 4,
              allCareerData.data.meta.last_page - 3,
              allCareerData.data.meta.last_page - 2,
              allCareerData.data.meta.last_page - 1,
              allCareerData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(allCareerData.data.meta.current_page) - 2,
              Number(allCareerData.data.meta.current_page) - 1,
              allCareerData.data.meta.current_page,
              Number(allCareerData.data.meta.current_page) + 1,
              Number(allCareerData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.allCareerData]);

  function deletedata(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.requestAdminDeleteCareer({
          id: id,
        });
      }
    })
  }

  useEffect(() => {
    let deleteCareerData = props.data.deleteCareerData;
    if (deleteCareerData !== undefined) {
      if (deleteCareerData.data) {
        Swal.fire({
          title: "Good job!",
          text: "Career level deleted successfully..",
          icon: "success",
        });
        setchange(!change);
      }
    }
    props.data.deleteCareerData = undefined;
  }, [props.data.deleteCareerData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Career Levels</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Career Levels" />
        <div class="container-fluid page-body-wrapper">
          <Sidebar name="Options" />

          <div class="main-panel">
            <div class="content-wrapper">
              <div class="row">
                <div class="col-sm-12">
                  <div class="home-tab">
                    <div class="row flex-grow">
                      <div class="col-12 grid-margin stretch-card">
                        <div class="card card-rounded">
                          <div class="card-body">
                            <div class="d-sm-flex justify-content-between align-items-start">
                              <div class="btn-wrapper">
                                <RWebShare
                                  data={{
                                    text: "Job Portal",
                                    url: `${window.location.protocol}//${window.location.host}/careerData/${params.page}/${params.page_size}`,
                                    title: "Job Portal",
                                  }}
                                >
                                  <p class="btn btn-otline-dark align-items-center">
                                    <i class="icon-share"></i> Share
                                  </p>
                                </RWebShare>
                                <button
                                  onClick={printPage}
                                  class="btn btn-otline-dark"
                                >
                                  <i class="icon-printer"></i> Print
                                </button>
                              </div>
                              <div>
                                <button
                                  class="btn btn-primary btn-md text-white mb-0 me-0"
                                  type="button"
                                  onClick={addtoggle}
                                >
                                  Add new level
                                </button>
                                <Modal isOpen={addmodal} toggle={addtoggle}>
                                  <ModalHeader toggle={addtoggle}>
                                    Add Career Levels
                                  </ModalHeader>
                                  <ModalBody>
                                    <form class="forms-sample">
                                      <div class="form-group">
                                        <label>Level</label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Level"
                                          name="level"
                                          value={adddata.level}
                                          onBlur={validateadd}
                                          onChange={onchangeadddata}
                                        />
                                        {error && <p>{error}</p>}
                                      </div>

                                      <button
                                        type="submit"
                                        class="btn btn-primary me-2"
                                        onClick={saveaddtoggle}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        class="btn btn-light"
                                        onClick={addtoggle}
                                      >
                                        Cancel
                                      </button>
                                    </form>
                                  </ModalBody>
                                </Modal>
                              </div>
                            </div>
                            <br />
                            <div class="table-responsive  mt-1" id="printme">
                              <table class="table select-table">
                                <thead>
                                  <tr>
                                    <th>Level</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {careerData.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <div class="d-flex ">
                                            <div>
                                              <h6>{item.level}</h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <p>
                                            {item.created_at.substring(0, 10)}
                                          </p>
                                        </td>
                                        <td>
                                          <p>
                                            {item.updated_at.substring(0, 10)}
                                          </p>
                                        </td>
                                        <td>
                                          <button
                                            class="badge badge-opacity-success"
                                            style={{
                                              border: "0px",
                                              marginLeft: "5px",
                                            }}
                                            onClick={() => {
                                              edittoggle(item.id);
                                            }}
                                          >
                                            <i class="fa fa-pencil-square-o"></i>
                                          </button>
                                          {editmodal === true && (
                                            <Modal
                                              isOpen={editmodal}
                                              toggle={edittoggle}
                                            >
                                              <ModalHeader toggle={edittoggle}>
                                                Edit Career Levels
                                              </ModalHeader>
                                              <ModalBody>
                                                <form class="forms-sample">
                                                  <div class="form-group">
                                                    <label>Level</label>
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      placeholder="Level"
                                                      name="level"
                                                      value={editdata.level}
                                                      onBlur={validateedit}
                                                      onChange={
                                                        onchangeeditdata
                                                      }
                                                    />
                                                    {error && <p>{error}</p>}
                                                  </div>

                                                  <button
                                                    type="submit"
                                                    class="btn btn-primary me-2"
                                                    onClick={saveedittoggle}
                                                  >
                                                    Submit
                                                  </button>
                                                  <button
                                                    class="btn btn-light"
                                                    onClick={edittoggle}
                                                  >
                                                    Cancel
                                                  </button>
                                                </form>
                                              </ModalBody>
                                            </Modal>
                                          )}
                                          <button
                                            class="badge badge-opacity-danger"
                                            style={{
                                              border: "0px",
                                              background: "#fea8a9",
                                              marginLeft: "5px",
                                            }}
                                            onClick={() => {
                                              deletedata(item.id);
                                            }}
                                          >
                                            <i class="fa fa-trash"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>

                            <div class="row">
                              <div class="col-10">
                                <div class="pagination center">
                                  <ul class="pagination-list">
                                    {pagination.current_page !== 1 && (
                                      <li>
                                        <a
                                          href={`/admin/careerData/${params.page - 1}/${params.page_size
                                            }`}
                                        >
                                          <i class="fa fa-long-arrow-left"></i>
                                        </a>
                                      </li>
                                    )}
                                    {pages.map((i) => {
                                      return pagination.current_page === i ? (
                                        <li class="active">
                                          <a
                                            href={`/admin/careerData/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/careerData/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      );
                                    })}
                                    {pagination.current_page !==
                                      pagination.last_page && (
                                        <li>
                                          <a
                                            href={`/admin/careerData/${Number(params.page) + 1
                                              }/${params.page_size}`}
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
    {
      requestAdminAddCareer,
      requestAdminAllCareer,
      requestAdminCareer,
      requestAdminDeleteCareer,
      requestAdminEditCareer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Career);
