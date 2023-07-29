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
  requestAdminAddFunctional,
  requestAdminAllFunctional,
  requestAdminFunctional,
  requestAdminDeleteFunctional,
  requestAdminEditFunctional,
} from "../Redux/actions";
import Swal from "sweetalert2";

function FunctionalArea(props) {

  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [change, setchange] = useState(false)
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);
  const [error, seterror] = useState("");
  const [id, setid] = useState(0);
  const [functional, setfunctional] = useState([]);
  const [adddata, setadddata] = useState({
    name: "",
  });
  const [editdata, seteditdata] = useState({
    name: "",
  });
  const params = useParams();
  const [addmodal, setaddModal] = useState(false);
  const [editmodal, seteditModal] = useState(false);

  function validateadd() {
    let formIsValid = false;
    if (!adddata["name"]) {
      formIsValid = false;
      seterror("*Enter functional area.");
    } else if (typeof adddata["name"] !== "undefined") {
      if (!adddata["name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
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
    if (!editdata["name"]) {
      formIsValid = false;
      seterror("*Enter functional area.");
    } else if (typeof editdata["name"] !== "undefined") {
      if (!editdata["name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
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
    setadddata({ name: e.target.value });
  }
  function onchangeeditdata(e) {
    seteditdata({ name: e.target.value });
  }

  const addtoggle = () => setaddModal(!addmodal);
  const saveaddtoggle = (e) => {
    e.preventDefault();
    if (validateadd()) {
      props.requestAdminAddFunctional({
        data: {
          name: adddata.name,
        },
      });
      setadddata({
        name: "",
      });
      addtoggle();
    }
  };

  useEffect(() => {
    let addFunctionalData = props.data.addFunctionalData;
    if (addFunctionalData !== undefined) {
      if (addFunctionalData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Functional name added successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.addFunctionalData = undefined;
  }, [props.data.addFunctionalData]);

  const edittoggle = (id) => {
    if (editmodal === true) {
      seteditModal(!editmodal);
    } else {
      seteditModal(!editmodal);
      setid(id);
      seteditdata({
        name: " ",
      });
      props.requestAdminFunctional({
        id: id,
      });
    }
  };

  useEffect(() => {
    let functional = props.data.functionalData;
    if (functional !== undefined) {
      if (functional.data) {
        seteditdata(functional.data.data.functional_areas[0]);
      }
    }
  }, [props.data.functionalData]);

  const saveedittoggle = (e) => {
    e.preventDefault();
    if (validateedit()) {
      props.requestAdminEditFunctional({
        id: id,
        data: {
          name: editdata.name,
        },
      });
      seteditdata({
        name: "",
      });
      setid(0);
      edittoggle();
    }
  };

  useEffect(() => {
    let editFunctionalData = props.data.editFunctionalData;
    if (editFunctionalData !== undefined) {
      if (editFunctionalData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Functional name updated successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.editFunctionalData = undefined;
  }, [props.data.editFunctionalData]);

  useEffect(() => {
    props.requestAdminAllFunctional({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size, change]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/functional/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let allFunctionalData = props.data.allFunctionalData;
    if (allFunctionalData !== undefined) {
      if (allFunctionalData.data) {
        setfunctional(allFunctionalData.data.data);
        setpagination(allFunctionalData.data.meta);
        if (allFunctionalData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(allFunctionalData.data.meta.last_page), (e, i) => {
            array.push(i + 1);
          });
          setpages(array);
        } else {
          let array = [];
          if (allFunctionalData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            allFunctionalData.data.meta.last_page - allFunctionalData.data.meta.current_page <=
            2
          ) {
            array.push(
              allFunctionalData.data.meta.last_page - 4,
              allFunctionalData.data.meta.last_page - 3,
              allFunctionalData.data.meta.last_page - 2,
              allFunctionalData.data.meta.last_page - 1,
              allFunctionalData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(allFunctionalData.data.meta.current_page) - 2,
              Number(allFunctionalData.data.meta.current_page) - 1,
              allFunctionalData.data.meta.current_page,
              Number(allFunctionalData.data.meta.current_page) + 1,
              Number(allFunctionalData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.allFunctionalData]);
  const CustomUI = ({ onSubmit, onCancel }) => (
    <div
      className="custom-ui"
      style={{
        backgroundColor: "white",
        width: "350px",
        padding: "25px",
        border: "1px solid black",
        margin: "auto",
      }}
    >
      <h3>Are you sure?</h3>
      <p>
        Do you really want to delete this records? This process cannot be
        undone.
      </p>
      <div>
        <button
          onClick={onSubmit}
          style={{ border: "0px", backgroundColor: "green", color: "white", padding: "2px 10px" }}
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          style={{
            border: "0px",
            backgroundColor: "red",
            color: "white",
            marginLeft: "10px",
            padding: "2px 10px"
          }}
        >
          No
        </button>
      </div>
    </div>
  );

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
        props.requestAdminDeleteFunctional({
          id: id,
        });
      }
    })
  }

  useEffect(() => {
    let deleteFunctionalData = props.data.deleteFunctionalData;
    if (deleteFunctionalData !== undefined) {
      if (deleteFunctionalData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Functional name deleted successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.deleteFunctionalData = undefined;
  }, [props.data.deleteFunctionalData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Functional Areas</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Functional Areas" />
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
                                    url: `${window.location.protocol}//${window.location.host}/admin/functional/${params.page}/${params.page_size}`,
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
                                  Add new functional
                                </button>
                                <Modal isOpen={addmodal} toggle={addtoggle}>
                                  <ModalHeader toggle={addtoggle}>
                                    Add Functional Area
                                  </ModalHeader>
                                  <ModalBody>
                                    <form class="forms-sample">
                                      <div class="form-group">
                                        <label>Name</label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Name"
                                          name="name"
                                          value={adddata.name}
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
                                    <th>Name</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {functional.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <div class="d-flex ">
                                            <div>
                                              <h6>{item.course}</h6>
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
                                                Edit Functional Area
                                              </ModalHeader>
                                              <ModalBody>
                                                <form class="forms-sample">
                                                  <div class="form-group">
                                                    <label>Name</label>
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      placeholder="Name"
                                                      name="name"
                                                      value={editdata.name}
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
                                          href={`/admin/functional/${params.page - 1}/${params.page_size
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
                                            href={`/admin/functional/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/functional/${i}/${params.page_size}`}
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
                                            href={`/admin/functional/${Number(params.page) + 1
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
      requestAdminAddFunctional,
      requestAdminAllFunctional,
      requestAdminFunctional,
      requestAdminDeleteFunctional,
      requestAdminEditFunctional,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalArea);
