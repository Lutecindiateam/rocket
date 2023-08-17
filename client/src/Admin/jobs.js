import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';
import { RWebShare } from "react-web-share";
import './style.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminJobs } from "../Redux/actions";
import image from "../images/extraLogo.png";

function Jobs(props) {

    const params = useParams();
    const [jobs, setjobs] = useState([]);
    const [pagination, setpagination] = useState({});
    const navigate = useNavigate();
    const [pages, setpages] = useState([]);
    const [page_size, setpage_size] = useState(0);

    useEffect(() => {
        props.requestAdminJobs({
            page: params.page,
            page_size: params.page_size,
        });
        setpage_size(params.page_size);
    }, [params.page, params.page_size]);

    function onChangePageSize(e) {
        setpage_size(e.target.value);
        if (e.target.value > 0) {
            navigate(`/admin/jobs/1/${e.target.value}`);
        }
    }

    useEffect(() => {
        let jobsData = props.data.jobsData;
        if (jobsData !== undefined) {
            if (jobsData.data) {
                setjobs(jobsData.data.data);
                setpagination(jobsData.data.meta);
                if (jobsData.data.meta.last_page < 5) {
                    let array = [];
                    Array.from(Array(jobsData.data.meta.last_page), (e, i) => {
                        array.push(i + 1);
                    });
                    setpages(array);
                } else {
                    let array = [];
                    if (jobsData.data.meta.current_page <= 3) {
                        array.push(1, 2, 3, 4, 5);
                        setpages(array);
                    } else if (
                        jobsData.data.meta.last_page -
                        jobsData.data.meta.current_page <=
                        2
                    ) {
                        array.push(
                            jobsData.data.meta.last_page - 4,
                            jobsData.data.meta.last_page - 3,
                            jobsData.data.meta.last_page - 2,
                            jobsData.data.meta.last_page - 1,
                            jobsData.data.meta.last_page
                        );
                        setpages(array);
                    } else {
                        array.push(
                            Number(jobsData.data.meta.current_page) - 2,
                            Number(jobsData.data.meta.current_page) - 1,
                            jobsData.data.meta.current_page,
                            Number(jobsData.data.meta.current_page) + 1,
                            Number(jobsData.data.meta.current_page) + 2
                        );
                        setpages(array);
                    }
                }
            }
        }
    }, [props.data.jobsData]);

    function printPage() {
        var printContents = "<br/><center><h3>Jobs</h3></center>" + document.getElementById("printme").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    return (
        <>
            <div class="container-scroller">
                <Header name="Jobs" />
                <div class="container-fluid page-body-wrapper">
                    <Sidebar name="Jobs" />

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
                                                                        url: `${window.location.protocol}//${window.location.host}/admin/jobs/${params.page}/${params.page_size}`,
                                                                        title: "Job Portal",
                                                                    }}
                                                                >
                                                                    <p class="btn btn-otline-dark align-items-center"><i class="icon-share"></i> Share</p>
                                                                </RWebShare>
                                                                <button onClick={printPage} class="btn btn-otline-dark"><i class="icon-printer"></i> Print</button>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div class="table-responsive  mt-1" id="printme">
                                                            <table class="table select-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Company</th>
                                                                        <th>Title</th>
                                                                        <th>Salary</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {jobs.map((item, index) => {
                                                                        const img = item.employee_logo
                                                                            ? process.env.REACT_APP_API_HOST + item.employee_logo
                                                                            : image;
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    <div class="d-flex ">
                                                                                        <a href={`/admin/viewCompany/${item.company_id}`}>   <img src={img} alt="" /></a>
                                                                                        <div>
                                                                                            <a href={`/admin/viewCompany/${item.company_id}`}>   <h6>{item.company_name}</h6></a>
                                                                                            <p>
                                                                                                <i class="fa fa-map-marker"></i>{" "}
                                                                                                {item.city_name},{" "}
                                                                                                {item.state_name}
                                                                                                {/* ,{" "}
                                                                                                {item.country_name} */}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <a href={`/admin/viewJob/${item._id}`}>  <h6>{item.title}</h6>
                                                                                        <p>Category: {item.category}</p>
                                                                                        <p>Education: {item.degree_level}</p></a>
                                                                                </td>
                                                                                <td>
                                                                                    <h6>INR {item.salary_from}-{item.salary_to} L</h6>
                                                                                    <p>{item.experience > 0 ? item.experience + "year experienced" : "Fresher"}</p>
                                                                                </td>
                                                                                <td>
                                                                                    <a href={`/admin/viewJob/${item._id}`}>
                                                                                        <button
                                                                                            class="badge badge-opacity-primary"
                                                                                            style={{ border: "0px" }}
                                                                                        >
                                                                                            <i class="fa fa-eye"></i>
                                                                                        </button>
                                                                                    </a>
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
                                                                                    href={`/admin/jobs/${params.page - 1
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
                                                                                        href={`/admin/jobs/${i}/${params.page_size}`}
                                                                                    >
                                                                                        {i}
                                                                                    </a>
                                                                                </li>
                                                                            ) : (
                                                                                <li>
                                                                                    <a
                                                                                        href={`/admin/jobs/${i}/${params.page_size}`}
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
                                                                                        href={`/admin/jobs/${Number(params.page) + 1
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
    )
}
const mapStateToProps = (state) => {
    return { data: state.data };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ requestAdminJobs }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);