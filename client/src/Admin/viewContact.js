import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { RWebShare } from "react-web-share";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminContact, requestAdminEditContact } from "../Redux/actions";
import Swal from "sweetalert2";

function ViewContact(props) {

  const [error, seterror] = useState("");
  const [contact, setcontact] = useState({});
  const params = useParams();
  const [reply, setreply] = useState("")

  useEffect(() => {
    props.requestAdminContact({
      id: params.id,
    });
  }, [params.id]);

  useEffect(() => {
    let contact = props.data.contactData;
    if (contact !== undefined) {
      if (contact.data) {
        setcontact(contact.data.data[0]);
      }
    }
  }, [props.data.contactData]);

  function onchangedata(e) {
    setreply(e.target.value)
  }
  function validateReply() {
    let formIsValid = false;
    if (!reply) {
      formIsValid = false;
      seterror("*Enter reply.");
    } else {
      formIsValid = true;
      seterror("");
    }
    return formIsValid;
  }
  function submitForm(e) {
    e.preventDefault();
    if (validateReply()) {
      props.requestAdminEditContact({
        id: params.id,
        data: {
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          phone: contact.phone,
          message: contact.message,
          reply: reply,
        },
      });
    }
  }

  useEffect(() => {
    let editContactData = props.data.editContactData;
    if (editContactData !== undefined) {
      if (editContactData.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Reply is sent successfully..',
          icon: 'success'
        });
      }
    }
    props.data.editContactData = undefined;
  }, [props.data.editContactData]);
  function printPage() {
    var printContents =
      "<br/><center><h3>Contact Details</h3></center>" +
      document.getElementById("printme").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div class="container-scroller">
        <Header name="Contacts" />
        <div class="container-fluid page-body-wrapper">
          <Sidebar name="Contact" />

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
                                    url: `${window.location.protocol}//${window.location.host}/admin/viewContact/${params.id}`,
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
                              <div></div>
                            </div>
                            <br />
                            <div id="printme">
                              <div class="d-flex ">
                                <div>
                                  <h4>{contact.subject}</h4>
                                </div>
                              </div>

                              <hr />
                              <form>
                                <p>
                                  <b>Name: </b>
                                  {contact.name}
                                </p>
                                <p>
                                  <b>Email: </b>
                                  <a href={`mailto:${contact.email}`}>
                                    {contact.email}
                                  </a>
                                </p>
                                <p>
                                  <b>Phone: </b>
                                  <a href={`callto:${contact.phone}`}>
                                    {contact.phone}
                                  </a>
                                </p>

                                <p>
                                  <b>Query: </b> {contact.message}
                                </p>

                                <div class="form-group">
                                  <b style={{ fontSize: "13px" }}>Reply: </b>
                                  {contact.reply ? (
                                    <p>{contact.reply}</p>
                                  ) : (
                                    <>
                                      {" "}
                                      <textarea
                                        name="reply"
                                        class="form-control"
                                        placeholder="Reply"
                                        style={{ height: "200px" }}
                                        value={reply}
                                        onBlur={validateReply}
                                        onChange={onchangedata}
                                      ></textarea>
                                      {error && <p>{error}</p>}
                                    </>
                                  )}
                                </div>
                              </form>
                              {!contact.reply && (
                                <button
                                  type="submit"
                                  class="btn btn-primary me-2"
                                  style={{ color: "white" }}
                                  onClick={submitForm}
                                >
                                  Submit
                                </button>
                              )}
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
      requestAdminContact,
      requestAdminEditContact,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewContact);
