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
  requestAdminAddDegree,
  requestAdminAllDegree,
  requestAdminDegree,
  requestAdminDeleteDegree,
  requestAdminEditDegree,
} from "../Redux/actions";
import Swal from "sweetalert2";

function Degree(props) {

  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [change, setchange] = useState(false)
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);
  const [error, seterror] = useState("");
  const [id, setid] = useState(0);
  const [degree, setdegree] = useState([]);
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
      seterror("*Enter degree level.");
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
      seterror("*Enter degree level.");
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
      props.requestAdminAddDegree({
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
    let addDegreeData = props.data.addDegreeData;
    if (addDegreeData !== undefined) {
      if (addDegreeData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Degree level added successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.addDegreeData = undefined;
  }, [props.data.addDegreeData]);

  const edittoggle = (id) => {
    if (editmodal === true) {
      seteditModal(!editmodal);
    } else {
      seteditModal(!editmodal);
      setid(id);
      seteditdata({
        level: " ",
      });
      props.requestAdminDegree({
        id: id,
      });
    }
  };

  useEffect(() => {
    let degree = props.data.degreeData;
    if (degree !== undefined) {
      if (degree.data) {
        seteditdata(degree.data.data.DegreeLevel[0]);
      }
    }
  }, [props.data.degreeData]);

  const saveedittoggle = (e) => {
    e.preventDefault();
    if (validateedit()) {
      props.requestAdminEditDegree({
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
    let editDegreeData = props.data.editDegreeData;
    if (editDegreeData !== undefined) {
      if (editDegreeData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Degree level updated successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.editDegreeData = undefined;
  }, [props.data.editDegreeData]);

  useEffect(() => {
    props.requestAdminAllDegree({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size, change]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/degree/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let allDegreeData = props.data.allDegreeData;
    if (allDegreeData !== undefined) {
      if (allDegreeData.data) {
        setdegree(allDegreeData.data.data);
        setpagination(allDegreeData.data.meta);
        if (allDegreeData.data.meta.last_page < 5) {
          let array = [];
          console.log(allDegreeData.data.meta.last_page);
          Array.from(Array(allDegreeData.data.meta.last_page), (e, i) =>
            array.push(i + 1)
          );
          setpages(array);
        } else {
          let array = [];
          if (allDegreeData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            allDegreeData.data.meta.last_page - allDegreeData.data.meta.current_page <=
            2
          ) {
            array.push(
              allDegreeData.data.meta.last_page - 4,
              allDegreeData.data.meta.last_page - 3,
              allDegreeData.data.meta.last_page - 2,
              allDegreeData.data.meta.last_page - 1,
              allDegreeData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(allDegreeData.data.meta.current_page) - 2,
              Number(allDegreeData.data.meta.current_page) - 1,
              allDegreeData.data.meta.current_page,
              Number(allDegreeData.data.meta.current_page) + 1,
              Number(allDegreeData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.allDegreeData]);

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
        props.requestAdminDeleteDegree({
          id: id,
        });
      }
    })
  }

  useEffect(() => {
    let deleteDegreeData = props.data.deleteDegreeData;
    if (deleteDegreeData !== undefined) {
      if (deleteDegreeData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Degree level deleted successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.deleteDegreeData = undefined;
  }, [props.data.deleteDegreeData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Degree Levels</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Degree Levels" />
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
                                    url: `${window.location.protocol}//${window.location.host}/admin/degree/${params.page}/${params.page_size}`,
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
                                    Add Degree Levels
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
                                  {degree.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <div class="d-flex ">
                                            <div>
                                              <h6>{item.option}</h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          {/* <p>
                                            {item.created_at.substring(0, 10)}
                                          </p> */}
                                        </td>
                                        <td>
                                          {/* <p>
                                            {item.updated_at.substring(0, 10)}
                                          </p> */}
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
                                                Edit Degree Levels
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
                                          href={`/admin/degree/${params.page - 1}/${params.page_size
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
                                            href={`/admin/degree/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/degree/${i}/${params.page_size}`}
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
                                            href={`/admin/degree/${Number(params.page) + 1
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
      requestAdminAddDegree,
      requestAdminAllDegree,
      requestAdminDegree,
      requestAdminDeleteDegree,
      requestAdminEditDegree,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Degree);
