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
  requestAdminAddCurrency,
  requestAdminAllCurrency,
  requestAdminCurrency,
  requestAdminDeleteCurrency,
  requestAdminEditCurrency,
} from "../Redux/actions";
import Swal from "sweetalert2";

function Currency(props) {

  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [change, setchange] = useState(false)
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);
  const [error, seterror] = useState("");
  const [errordesc, seterrordesc] = useState("");
  const [id, setid] = useState(0);
  const [currency, setcurrency] = useState([]);
  const [adddata, setadddata] = useState({
    currency_name: "",
    currency_icon: "",
  });
  const [editdata, seteditdata] = useState({
    currency_name: "",
    currency_icon: "",
  });
  const params = useParams();
  const [addmodal, setaddModal] = useState(false);
  const [editmodal, seteditModal] = useState(false);

  function validateadd() {
    let formIsValid = false;
    if (!adddata["currency_name"]) {
      formIsValid = false;
      seterror("*Enter currency.");
    } else if (typeof adddata["currency_name"] !== "undefined") {
      if (!adddata["currency_name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
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
    if (!adddata["currency_icon"]) {
      formIsValid = false;
      seterrordesc("*Enter currency icon.");
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
    if (!editdata["currency_name"]) {
      formIsValid = false;
      seterror("*Enter currency.");
    } else if (typeof editdata["currency_name"] !== "undefined") {
      if (!editdata["currency_name"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
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
    if (!editdata["currency_icon"]) {
      formIsValid = false;
      seterrordesc("*Enter currency icon.");
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
      props.requestAdminAddCurrency({
        data: {
          currency_name: adddata.currency_name,
          currency_icon: adddata.currency_icon,
        },
      });
      setadddata({
        currency_name: "",
        currency_icon: "",
      });
      addtoggle();
    }
  };

  useEffect(() => {
    let addCurrencyData = props.data.addCurrencyData;
    if (addCurrencyData !== undefined) {
      if (addCurrencyData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Currency added successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.addCurrencyData = undefined;
  }, [props.data.addCurrencyData]);

  const edittoggle = (id) => {
    if (editmodal === true) {
      seteditModal(!editmodal);
    } else {
      seteditModal(!editmodal);
      setid(id);
      seteditdata({
        currency_name: " ",
        currency_icon: " ",
      });
      props.requestAdminCurrency({
        id: id,
      });
    }
  };

  useEffect(() => {
    let currency = props.data.currencyData;
    if (currency !== undefined) {
      if (currency.data) {
        seteditdata(currency.data.data.salary_currencies[0]);
      }
    }
  }, [props.data.currencyData]);

  const saveedittoggle = (e) => {
    e.preventDefault();
    if (validateEditForm()) {
      props.requestAdminEditCurrency({
        id: id,
        data: {
          currency_name: editdata.currency_name,
          currency_icon: editdata.currency_icon,
        },
      });
      seteditdata({
        currency_name: "",
        currency_icon: "",
      });
      setid(0);
      edittoggle();
    }
  };

  useEffect(() => {
    let editCurrencyData = props.data.editCurrencyData;
    if (editCurrencyData !== undefined) {
      if (editCurrencyData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Currency updated successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.editCurrencyData = undefined;
  }, [props.data.editCurrencyData]);

  useEffect(() => {
    props.requestAdminAllCurrency({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size, change]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/currency/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let allCurrencyData = props.data.allCurrencyData;
    if (allCurrencyData !== undefined) {
      if (allCurrencyData.data) {
        setcurrency(allCurrencyData.data.data);
        setpagination(allCurrencyData.data.meta);
        if (allCurrencyData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(allCurrencyData.data.meta.last_page), (e, i) =>
            array.push(i + 1)
          );
          setpages(array);
        } else {
          let array = [];
          if (allCurrencyData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            allCurrencyData.data.meta.last_page -
            allCurrencyData.data.meta.current_page <=
            2
          ) {
            array.push(
              allCurrencyData.data.meta.last_page - 4,
              allCurrencyData.data.meta.last_page - 3,
              allCurrencyData.data.meta.last_page - 2,
              allCurrencyData.data.meta.last_page - 1,
              allCurrencyData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(allCurrencyData.data.meta.current_page) - 2,
              Number(allCurrencyData.data.meta.current_page) - 1,
              allCurrencyData.data.meta.current_page,
              Number(allCurrencyData.data.meta.current_page) + 1,
              Number(allCurrencyData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.allCurrencyData]);

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
        props.requestAdminDeleteCurrency({
          id: id,
        });
      }
    })
    // alert.success("Deleting data");
  }

  useEffect(() => {
    let deleteCurrencyData = props.data.deleteCurrencyData;
    if (deleteCurrencyData !== undefined) {
      if (deleteCurrencyData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Currency deleted successfully..',
          icon: 'success'
        });
        setchange(!change)
      }
    }
    props.data.deleteCurrencyData = undefined;
  }, [props.data.deleteCurrencyData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Currencies</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Currencies" />
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
                                    url: `${window.location.protocol}//${window.location.host}/admin/currency/${params.page}/${params.page_size}`,
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
                                  Add new currency
                                </button>
                                <Modal isOpen={addmodal} toggle={addtoggle}>
                                  <ModalHeader toggle={addtoggle}>
                                    Add Currency
                                  </ModalHeader>
                                  <ModalBody>
                                    <form class="forms-sample">
                                      <div class="form-group">
                                        <label>Name</label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Name"
                                          name="currency_name"
                                          value={adddata.currency_name}
                                          onBlur={validateadd}
                                          onChange={onchangeadddata}
                                        />
                                        {error && <p>{error}</p>}
                                        <label>
                                          <br />
                                          Icon
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Icon"
                                          name="currency_icon"
                                          value={adddata.currency_icon}
                                          onBlur={validateadd}
                                          onChange={onchangeadddata}
                                        />
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
                                    <th>Name</th>
                                    <th>Icon</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currency.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <div class="d-flex ">
                                            <div>
                                              <h6>{item.currency_name}</h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <p>{item.currency_icon}</p>
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
                                                Edit Currency
                                              </ModalHeader>
                                              <ModalBody>
                                                <form class="forms-sample">
                                                  <div class="form-group">
                                                    <label>Name</label>
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      placeholder="Name"
                                                      name="currency_name"
                                                      value={editdata.currency_name}
                                                      onBlur={validateedit}
                                                      onChange={
                                                        onchangeeditdata
                                                      }
                                                    />
                                                    {error && <p>{error}</p>}
                                                    <label>
                                                      <br />
                                                      Icon
                                                    </label>
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      placeholder="Icon"
                                                      name="currency_icon"
                                                      value={editdata.currency_icon}
                                                      onBlur={validateedit}
                                                      onChange={
                                                        onchangeeditdata
                                                      }
                                                    />
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
                                          href={`/admin/currency/${params.page - 1
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
                                            href={`/admin/currency/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/currency/${i}/${params.page_size}`}
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
                                            href={`/admin/currency/${Number(params.page) + 1
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
      requestAdminAddCurrency,
      requestAdminAllCurrency,
      requestAdminCurrency,
      requestAdminDeleteCurrency,
      requestAdminEditCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
