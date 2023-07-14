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
  requestAdminAddPeriod,
  requestAdminAllPeriod,
  requestAdminPeriod,
  requestAdminDeletePeriod,
  requestAdminEditPeriod,
} from "../Redux/actions";
import Swal from "sweetalert2";

function Period(props) {

  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [change, setchange] = useState(false)
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);
  const [error, seterror] = useState("");
  const [errordesc, seterrordesc] = useState("");
  const [id, setid] = useState(0);
  const [period, setperiod] = useState([]);
  const [adddata, setadddata] = useState({
    period: "",
    description: "",
  });
  const [editdata, seteditdata] = useState({
    period: "",
    description: "",
  });
  const params = useParams();
  const [addmodal, setaddModal] = useState(false);
  const [editmodal, seteditModal] = useState(false);

  function validateadd() {
    let formIsValid = false;
    if (!adddata["period"]) {
      formIsValid = false;
      seterror("*Enter period name.");
    } else if (typeof adddata["period"] !== "undefined") {
      if (!adddata["period"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterror("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterror("");
      }
    }
    return formIsValid;
  }
  function descadd() {
    let formIsValid = false;
    if (!adddata["description"]) {
      formIsValid = false;
      seterrordesc("*Enter period description.");
    } else {
      formIsValid = true;
      seterrordesc("");
    }
    return formIsValid;
  }
  function validateAddForm() {
    let validate = validateadd();
    let desc = descadd();
    let valid = validate && desc;
    return valid;
  }
  function validateedit() {
    let formIsValid = false;
    if (!editdata["period"]) {
      formIsValid = false;
      seterror("*Enter period name.");
    } else if (typeof editdata["period"] !== "undefined") {
      if (!editdata["period"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterror("*Please enter Alphabet characters only.");
      } else {
        formIsValid = true;
        seterror("");
      }
    }
    return formIsValid;
  }
  function descedit() {
    let formIsValid = false;
    if (!editdata["description"]) {
      formIsValid = false;
      seterrordesc("*Enter period description.");
    } else {
      formIsValid = true;
      seterrordesc("");
    }
    return formIsValid;
  }
  function validateEditForm() {
    let validate = validateedit();
    let desc = descedit();
    let valid = validate && desc;
    return valid;
  }
  function onchangeadddata(e) {
    setadddata((adddata) => ({
      ...adddata,
      [e.target.name]: e.target.value,
    }));
  }
  function onchangeeditdata(e) {
    seteditdata((editdata) => ({
      ...editdata,
      [e.target.name]: e.target.value,
    }));
  }

  const addtoggle = () => setaddModal(!addmodal);
  const saveaddtoggle = (e) => {
    e.preventDefault();
    if (validateAddForm()) {
      props.requestAdminAddPeriod({
        data: {
          period: adddata.period,
          description: adddata.description,
        },
      });
      setadddata({
        period: "",
        description: "",
      });
      addtoggle();
    }
  };

  useEffect(() => {
    let addPeriodData = props.data.addPeriodData;
    if (addPeriodData !== undefined) {
      if (addPeriodData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Salary Period added successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.addPeriodData = undefined;
  }, [props.data.addPeriodData]);

  const edittoggle = (id) => {
    if (editmodal === true) {
      seteditModal(!editmodal);
    } else {
      seteditModal(!editmodal);
      setid(id);
      seteditdata({
        period: " ",
        description: " ",
      });
      props.requestAdminPeriod({
        id: id,
      });
    }
  };

  useEffect(() => {
    let period = props.data.periodData;
    if (period !== undefined) {
      if (period.data) {
        seteditdata(period.data.data.salary_periods[0]);
      }
    }
  }, [props.data.periodData]);

  const saveedittoggle = (e) => {
    e.preventDefault();
    if (validateEditForm()) {
      props.requestAdminEditPeriod({
        id: id,
        data: {
          period: editdata.period,
          description: editdata.description,
        },
      });
      seteditdata({
        period: "",
        description: "",
      });
      setid(0);
      edittoggle();
    }
  };

  useEffect(() => {
    let editPeriodData = props.data.editPeriodData;
    if (editPeriodData !== undefined) {
      if (editPeriodData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Salary Period updated successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.editPeriodData = undefined;
  }, [props.data.editPeriodData]);

  useEffect(() => {
    props.requestAdminAllPeriod({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size, change]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/period/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let allPeriodData = props.data.allPeriodData;
    if (allPeriodData !== undefined) {
      if (allPeriodData.data) {
        setperiod(allPeriodData.data.data);
        setpagination(allPeriodData.data.meta);
        if (allPeriodData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(allPeriodData.data.meta.last_page), (e, i) => {
            array.push(i + 1);
          });
          setpages(array);
        } else {
          let array = [];
          if (allPeriodData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            allPeriodData.data.meta.last_page -
            allPeriodData.data.meta.current_page <=
            2
          ) {
            array.push(
              allPeriodData.data.meta.last_page - 4,
              allPeriodData.data.meta.last_page - 3,
              allPeriodData.data.meta.last_page - 2,
              allPeriodData.data.meta.last_page - 1,
              allPeriodData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(allPeriodData.data.meta.current_page) - 2,
              Number(allPeriodData.data.meta.current_page) - 1,
              allPeriodData.data.meta.current_page,
              Number(allPeriodData.data.meta.current_page) + 1,
              Number(allPeriodData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.allPeriodData]);
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
        props.requestAdminDeletePeriod({
          id: id,
        });
      }
    })
  }

  useEffect(() => {
    let deletePeriodData = props.data.deletePeriodData;
    if (deletePeriodData !== undefined) {
      if (deletePeriodData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Salary Period deleted successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.deletePeriodData = undefined;
  }, [props.data.deletePeriodData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Salary Periods</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Salary Periods" />
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
                                    url: `${window.location.protocol}//${window.location.host}/admin/period/${params.page}/${params.page_size}`,
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
                                  Add new period
                                </button>
                                <Modal isOpen={addmodal} toggle={addtoggle}>
                                  <ModalHeader toggle={addtoggle}>
                                    Add Period
                                  </ModalHeader>
                                  <ModalBody>
                                    <form class="forms-sample">
                                      <div class="form-group">
                                        <label>Name</label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Name"
                                          name="period"
                                          value={adddata.period}
                                          onBlur={validateadd}
                                          onChange={onchangeadddata}
                                        />
                                        {error && <p>{error}</p>}
                                        <label>
                                          <br />
                                          Description
                                        </label>
                                        <textarea
                                          name="description"
                                          class="form-control"
                                          placeholder="Description"
                                          style={{ height: "100px" }}
                                          value={adddata.description}
                                          onBlur={descadd}
                                          onChange={onchangeadddata}
                                        >
                                          Descripion
                                        </textarea>
                                        {errordesc && <p>{errordesc}</p>}
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
                                    <th>Period</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {period.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <div class="d-flex ">
                                            <div>
                                              <h6>{item.period}</h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <p>{item.description}</p>
                                        </td>
                                        <td>
                                          <p>{item.created_at.substring(0, 10)}</p>
                                        </td>
                                        <td>
                                          <p>{item.updated_at.substring(0, 10)}</p>
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
                                                Edit Period
                                              </ModalHeader>
                                              <ModalBody>
                                                <form class="forms-sample">
                                                  <div class="form-group">
                                                    <label>Name</label>
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      placeholder="Name"
                                                      name="period"
                                                      value={editdata.period}
                                                      onBlur={validateedit}
                                                      onChange={
                                                        onchangeeditdata
                                                      }
                                                    />
                                                    {error && <p>{error}</p>}
                                                    <label>
                                                      <br />
                                                      Description
                                                    </label>
                                                    <textarea
                                                      name="description"
                                                      class="form-control"
                                                      placeholder="Description"
                                                      style={{
                                                        height: "100px",
                                                      }}
                                                      value={
                                                        editdata.description
                                                      }
                                                      onBlur={descedit}
                                                      onChange={
                                                        onchangeeditdata
                                                      }
                                                    >
                                                      Descripion
                                                    </textarea>
                                                    {errordesc && (
                                                      <p>{errordesc}</p>
                                                    )}
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
                                          href={`/admin/period/${params.page - 1
                                            }/${params.page_size}`}
                                        >
                                          <i class="fa fa-long-arrow-left"></i>
                                        </a>
                                      </li>
                                    )}
                                    {pages.map((i) => {
                                      return pagination.current_page === i ? (
                                        <li class="active">
                                          <a
                                            href={`/admin/period/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/period/${i}/${params.page_size}`}
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
                                            href={`/admin/period/${Number(params.page) + 1
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
      requestAdminAddPeriod,
      requestAdminAllPeriod,
      requestAdminPeriod,
      requestAdminDeletePeriod,
      requestAdminEditPeriod,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Period);
