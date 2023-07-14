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
  requestAdminAddSize,
  requestAdminAllSize,
  requestAdminSize,
  requestAdminDeleteSize,
  requestAdminEditSize,
} from "../Redux/actions";
import Swal from "sweetalert2";

function Size(props) {

  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [change, setchange] = useState(false)
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);
  const [error, seterror] = useState("");
  const [id, setid] = useState(0);
  const [size, setsize] = useState([]);
  const [adddata, setadddata] = useState({
    size: "",
  });
  const [editdata, seteditdata] = useState({
    size: "",
  });
  const params = useParams();
  const [addmodal, setaddModal] = useState(false);
  const [editmodal, seteditModal] = useState(false);

  function validateadd() {
    let formIsValid = false;
    if (!adddata["size"]) {
      formIsValid = false;
      seterror("*Enter company size.");
    } else if (typeof adddata["size"] !== "undefined") {
      if (adddata["size"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterror("*Please enter Digits only.");
      } else {
        formIsValid = true;
        seterror("");
      }
    }
    return formIsValid;
  }
  function validateedit() {
    let formIsValid = false;
    if (!editdata["size"]) {
      formIsValid = false;
      seterror("*Enter company size.");
    } else if (typeof editdata["size"] !== "undefined") {
      if (editdata["size"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
        formIsValid = false;
        seterror("*Please enter Digits only.");
      } else {
        formIsValid = true;
        seterror("");
      }
    }
    return formIsValid;
  }
  function onchangeadddata(e) {
    setadddata({ size: e.target.value });
  }
  function onchangeeditdata(e) {
    seteditdata({ size: e.target.value });
  }

  const addtoggle = () => setaddModal(!addmodal);
  const saveaddtoggle = (e) => {
    e.preventDefault();
    if (validateadd()) {
      props.requestAdminAddSize({
        data: {
          size: adddata.size,
        },
      });
      setadddata({
        size: "",
      });
      addtoggle();
    }
  };

  useEffect(() => {
    let addSizeData = props.data.addSizeData;
    if (addSizeData !== undefined) {
      if (addSizeData.data) {

        Swal.fire({
          title: 'Good job!',
          text: 'Company size added successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.addSizeData = undefined;
  }, [props.data.addSizeData]);

  const edittoggle = (id) => {
    if (editmodal === true) {
      seteditModal(!editmodal);
    } else {
      seteditModal(!editmodal);
      setid(id);
      seteditdata({
        size: " ",
      });
      props.requestAdminSize({
        id: id,
      });
    }
  };

  useEffect(() => {
    let size = props.data.sizeData;
    if (size !== undefined) {
      if (size.data) {
        seteditdata(size.data.data.Company_Size[0]);
      }
    }
  }, [props.data.sizeData]);

  const saveedittoggle = (e) => {
    e.preventDefault();
    if (validateedit()) {
      props.requestAdminEditSize({
        id: id,
        data: {
          size: editdata.size,
        },
      });
      seteditdata({
        size: "",
      });
      setid(0);
      edittoggle();
    }
  };

  useEffect(() => {
    let editSizeData = props.data.editSizeData;
    if (editSizeData !== undefined) {
      if (editSizeData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Company size updated successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.editSizeData = undefined;
  }, [props.data.editSizeData]);

  useEffect(() => {
    props.requestAdminAllSize({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size, change]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/size/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let allSizeData = props.data.allSizeData;
    if (allSizeData !== undefined) {
      if (allSizeData.data) {
        setsize(allSizeData.data.data);
        setpagination(allSizeData.data.meta);
        if (allSizeData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(allSizeData.data.meta.last_page), (e, i) => {
            array.push(i + 1);
          });
          setpages(array);
        } else {
          let array = [];
          if (allSizeData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            allSizeData.data.meta.last_page - allSizeData.data.meta.current_page <=
            2
          ) {
            array.push(
              allSizeData.data.meta.last_page - 4,
              allSizeData.data.meta.last_page - 3,
              allSizeData.data.meta.last_page - 2,
              allSizeData.data.meta.last_page - 1,
              allSizeData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(allSizeData.data.meta.current_page) - 2,
              Number(allSizeData.data.meta.current_page) - 1,
              allSizeData.data.meta.current_page,
              Number(allSizeData.data.meta.current_page) + 1,
              Number(allSizeData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.allSizeData]);

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
            marginLeft: "10px", padding: "2px 10px"
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
        props.requestAdminDeleteSize({
          id: id,
        });
      }
    })
  }

  useEffect(() => {
    let deleteSizeData = props.data.deleteSizeData;
    if (deleteSizeData !== undefined) {
      if (deleteSizeData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Company size deleted successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.deleteSizeData = undefined;
  }, [props.data.deleteSizeData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Company Sizes</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Company Sizes" />
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
                                    url: `${window.location.protocol}//${window.location.host}/admin/size/${params.page}/${params.page_size}`,
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
                                  Add new size
                                </button>
                                <Modal isOpen={addmodal} toggle={addtoggle}>
                                  <ModalHeader toggle={addtoggle}>
                                    Add Size Sizes
                                  </ModalHeader>
                                  <ModalBody>
                                    <form class="forms-sample">
                                      <div class="form-group">
                                        <label>Size</label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Size"
                                          name="size"
                                          value={adddata.size}
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
                                    <th>Size</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {size.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <div class="d-flex ">
                                            <div>
                                              <h6>{item.size}</h6>
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
                                                Edit Size Sizes
                                              </ModalHeader>
                                              <ModalBody>
                                                <form class="forms-sample">
                                                  <div class="form-group">
                                                    <label>Size</label>
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      placeholder="Size"
                                                      name="size"
                                                      value={editdata.size}
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
                                          href={`/admin/size/${params.page - 1}/${params.page_size
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
                                            href={`/admin/size/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/size/${i}/${params.page_size}`}
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
                                            href={`/admin/size/${Number(params.page) + 1
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
      requestAdminAddSize,
      requestAdminAllSize,
      requestAdminSize,
      requestAdminDeleteSize,
      requestAdminEditSize,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Size);
