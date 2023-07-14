import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { RWebShare } from "react-web-share";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminAllContact } from "../Redux/actions";

function Contact(props) {

  const [pagination, setpagination] = useState({});
  const navigate = useNavigate();
  const [pages, setpages] = useState([]);
  const [page_size, setpage_size] = useState(0);
  const [contact, setcontact] = useState([]);
  const params = useParams();

  useEffect(() => {
    props.requestAdminAllContact({
      page: params.page,
      page_size: params.page_size,
    });
    setpage_size(params.page_size);
  }, [params.page, params.page_size]);

  function onChangePageSize(e) {
    setpage_size(e.target.value);
    if (e.target.value > 0) {
      navigate(`/admin/contact/1/${e.target.value}`);
    }
  }

  useEffect(() => {
    let allContactData = props.data.allContactData;
    if (allContactData !== undefined) {
      if (allContactData.data) {
        setcontact(allContactData.data.data);
        setpagination(allContactData.data.meta);
        if (allContactData.data.meta.last_page < 5) {
          let array = [];
          Array.from(Array(allContactData.data.meta.last_page), (e, i) =>
            array.push(i + 1)
          );
          setpages(array);
        } else {
          let array = [];
          if (allContactData.data.meta.current_page <= 3) {
            array.push(1, 2, 3, 4, 5);
            setpages(array);
          } else if (
            allContactData.data.meta.last_page -
            allContactData.data.meta.current_page <=
            2
          ) {
            array.push(
              allContactData.data.meta.last_page - 4,
              allContactData.data.meta.last_page - 3,
              allContactData.data.meta.last_page - 2,
              allContactData.data.meta.last_page - 1,
              allContactData.data.meta.last_page
            );
            setpages(array);
          } else {
            array.push(
              Number(allContactData.data.meta.current_page) - 2,
              Number(allContactData.data.meta.current_page) - 1,
              allContactData.data.meta.current_page,
              Number(allContactData.data.meta.current_page) + 1,
              Number(allContactData.data.meta.current_page) + 2
            );
            setpages(array);
          }
        }
      }
    }
  }, [props.data.allContactData]);

  function printPage() {
    var printContents =
      "<br/><center><h3>Contacts</h3></center>" +
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
                                    url: `${window.location.protocol}//${window.location.host}/admin/contact/${params.page}/${params.page_size}`,
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
                            <div class="table-responsive  mt-1" id="printme">
                              <table class="table select-table">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {contact.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <div class="d-flex ">
                                            <div>
                                              <h6>{item.name}</h6>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <p>
                                            <a href={`mailto:${item.email}`}>
                                              {item.email}
                                            </a>
                                          </p>
                                          <p>
                                            <a href={`callto:${item.phone}`}>
                                              {item.phone}
                                            </a>
                                          </p>
                                        </td>
                                        <td>
                                          <p>{item.subject}</p>
                                        </td>
                                        <td>
                                          <p>
                                            {item.message.substring(0, 100)}
                                          </p>
                                          {item.message.length > 100 && (
                                            <p>
                                              {item.message.substring(100, 200)}
                                            </p>
                                          )}
                                          {item.message.length > 200 && (
                                            <p>
                                              {item.message.substring(200, 300)}
                                            </p>
                                          )}
                                          {item.message.length > 300 && (
                                            <p>
                                              {item.message.substring(300, 400)}
                                            </p>
                                          )}
                                          {item.message.length > 400 && (
                                            <span>
                                              {item.message.substring(400, 500)}
                                            </span>
                                          )}
                                          {item.message.length > 500 && (
                                            <span> ...</span>
                                          )}
                                        </td>
                                        <td>
                                          {item.reply ? (
                                            <a href={`/admin/viewContact/${item.id}`}>
                                              <button
                                                class="badge badge-opacity-primary"
                                                style={{ border: "0px" }}
                                              >
                                                <i class="fa fa-eye"></i>
                                              </button>
                                            </a>
                                          ) : (
                                            <a href={`/admin/viewContact/${item.id}`}>
                                              <button
                                                class="badge badge-opacity-success"
                                                style={{ border: "0px" }}
                                              >
                                                <i class="fa fa-pencil-square-o"></i>
                                              </button>
                                            </a>
                                          )}
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
                                          href={`/admin/contact/${params.page - 1}/${params.page_size
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
                                            href={`/admin/contact/${i}/${params.page_size}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      ) : (
                                        <li>
                                          <a
                                            href={`/admin/contact/${i}/${params.page_size}`}
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
                                            href={`/admin/contact/${Number(params.page) + 1
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
      requestAdminAllContact,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
