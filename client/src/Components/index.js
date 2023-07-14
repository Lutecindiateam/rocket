import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../assets/css/main.css";

import Home from "./home";
import Error from "./404";
import Aboutus from "./aboutUs";
import Bookmarked from "./bookmarked";
import BrowseCategories from "./browseCategories";
import BrowseJobs from "./browseJobs";
import ChangePassword from "./changePassword";
import Contact from "./contact";
import Faq from "./faq";
import JobAlerts from "./jobAlerts";
import JobDetails from "./jobDetails";
import JobList from "./jobList";
import Mailsuccess from "./mailSuccess";
import ManageApplications from "./manageApplications";
import ManageJobs from "./manageJobs";
import Notifications from "./notifications";
import PostJob from "./postJob";
import Policy from "./privacyPolicy";
import AppliedJobs from "./appliedJobs";
import Login from "./login";
import ForgotPass1 from "./forgotPassword1";
import ForgotPass2 from "./forgotPassword2";
import ForgotPass3 from "./forgotPassword3";
import JobCategoryWise from "./jobCategoryWise";
import Profie from "./profile";
import Picture from "./picture";
import AddResumeNew from "./addResumeForm";
import Messages from "./messages";
import Setting from "./settings";

import EmpLogin from "../Employee/login";
import EmpLogo from "../Employee/empLogo";
import EditJob from "../Employee/editJob";
import EmpProfile from "../Employee/empProfile";
import EmpViewJob from "../Employee/viewJob";
import Register from "./register";
import Resume from "./resume";
import EmpRegister from "../Employee/register";
import EmpInterviews from "../Employee/interviews";
import EmpViewApplication from "../Employee/viewApplication";
import EmpViewResume from "../Employee/viewResume";
import EmpChangePassword from "../Employee/changePassword";
import EmpForgotPass1 from "../Employee/forgotPassword1";
import EmpForgotPass2 from "../Employee/forgotPassword2";
import EmpForgotPass3 from "../Employee/forgotPassword3";
import EmpMessages from "../Employee/empMessages";
import EmpSettings from "../Employee/empSettings";


import AdminHome from "../Admin/home";
import AdminCandidates from "../Admin/candidates";
import AdminViewCandidate from "../Admin/viewCandidate";
import AdminCareer from "../Admin/career";
import AdminCategories from "../Admin/categories";
import AdminCompanies from "../Admin/companies";
import AdminViewCompany from "../Admin/viewCompany";
import AdminCurrency from "../Admin/currency";
import AdminDegree from "../Admin/degree";
import AdminError from "../Admin/error";
import AdminFunctional from "../Admin/functional";
import AdminIndustries from "../Admin/industries";
import AdminJobs from "../Admin/jobs";
import AdminViewJob from "../Admin/viewJob";
import AdminOwnership from "../Admin/ownership";
import AdminPeriod from "../Admin/period";
import AdminProfile from "../Admin/profile";
import AdminShifts from "../Admin/shifts";
import AdminSize from "../Admin/size";
import AdminSkill from "../Admin/skill";
import AdminSubscribe from "../Admin/subscribe";
import AdminTags from "../Admin/tags";
import AdminTypes from "../Admin/types";
import AdminLogin from "../Admin/login";
import AdminChangepass from "../Admin/changepass";
import AdminForgotPass1 from "../Admin/forgotPassword1";
import AdminForgotPass2 from "../Admin/forgotPassword2";
import AdminForgotPass3 from "../Admin/forgotPassword3";
import AdminContact from "../Admin/contact";
import AdminViewContact from "../Admin/viewContact";
import AdminPosition from "../Admin/position";
import Verify from "./otpverify";
import Empverify from "../Employee/empotpverify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />} /> */}
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/addResumeForm" element={<AddResumeNew />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profie />} />
        <Route path="/picture" element={<Picture />} />
        <Route path="/interviews" element={<EmpInterviews />} />
        <Route path="/empregister" element={<EmpRegister />} />
        <Route path="/empverify" element={<Empverify />} />
        <Route path="/empLogo" element={<EmpLogo />} />
        <Route path="/editJob/:id" element={<EditJob />} />
        <Route path="/empProfile" element={<EmpProfile />} />
        <Route path="/empsettings" element={<EmpSettings />} />
        <Route
          path="/jobCategoryWise/:id/:page/:page_size"
          element={<JobCategoryWise />}
        />
        <Route path="/empForgotpass1" element={<EmpForgotPass1 />} />
        <Route path="/empForgotpass2" element={<EmpForgotPass2 />} />
        <Route path="/empForgotpass3" element={<EmpForgotPass3 />} />
        <Route path="/forgotPassword1" element={<ForgotPass1 />} />
        <Route path="/empMessages" element={<EmpMessages />} />
        <Route path="/forgotPassword2" element={<ForgotPass2 />} />
        <Route path="/forgotPassword3" element={<ForgotPass3 />} />
        <Route path="/empchangePassword" element={<EmpChangePassword />} />
        <Route path="/empViewJob/:id" element={<EmpViewJob />} />
        <Route
          path="/empViewApplication/:id"
          element={<EmpViewApplication />}
        />
        <Route path="/empViewResume/:id" element={<EmpViewResume />} />
        <Route path="/emplogin" element={<EmpLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/appliedJobs" element={<AppliedJobs />} />
        <Route path="/aboutUs" element={<Aboutus />} />
        <Route path="/bookmarked" element={<Bookmarked />} />
        <Route path="/browseCategories" element={<BrowseCategories />} />
        <Route path="/browseJobs" element={<BrowseJobs />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/jobAlerts" element={<JobAlerts />} />
        <Route path="/jobDetails/:id" element={<JobDetails />} />
        <Route path="/jobList/:page/:page_size" element={<JobList />} />
        <Route path="/mailSuccess" element={<Mailsuccess />} />
        <Route path="/manageApplications" element={<ManageApplications />} />
        <Route path="/manageJobs" element={<ManageJobs />} />
        <Route
          path="/notifications/:page/:page_size"
          element={<Notifications />}
        />
        <Route path="/postJob" element={<PostJob />} />
        <Route path="/privacyPolicy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/forgotPassword1" element={<AdminForgotPass1 />} />
        <Route path="/admin/forgotPassword2" element={<AdminForgotPass2 />} />
        <Route path="/admin/forgotPassword3" element={<AdminForgotPass3 />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/changepass" element={<AdminChangepass />} />
        <Route
          path="/admin/contact/:page/:page_size"
          element={<AdminContact />}
        />
        <Route path="/admin/viewContact/:id" element={<AdminViewContact />} />
        <Route
          path="/admin/position/:page/:page_size"
          element={<AdminPosition />}
        />
        <Route
          path="/admin/candidates/:page/:page_size"
          element={<AdminCandidates />}
        />
        <Route
          path="/admin/viewCandidate/:id"
          element={<AdminViewCandidate />}
        />
        <Route
          path="/admin/career/:page/:page_size"
          element={<AdminCareer />}
        />
        <Route
          path="/admin/categories/:page/:page_size"
          element={<AdminCategories />}
        />
        <Route
          path="/admin/companies/:page/:page_size"
          element={<AdminCompanies />}
        />
        <Route path="/admin/viewCompany/:id" element={<AdminViewCompany />} />
        <Route
          path="/admin/currency/:page/:page_size"
          element={<AdminCurrency />}
        />
        <Route
          path="/admin/degree/:page/:page_size"
          element={<AdminDegree />}
        />
        <Route
          path="/admin/functional/:page/:page_size"
          element={<AdminFunctional />}
        />
        <Route
          path="/admin/industries/:page/:page_size"
          element={<AdminIndustries />}
        />
        <Route path="/admin/jobs/:page/:page_size" element={<AdminJobs />} />
        <Route path="/admin/viewJob/:id" element={<AdminViewJob />} />
        <Route
          path="/admin/ownership/:page/:page_size"
          element={<AdminOwnership />}
        />
        <Route
          path="/admin/period/:page/:page_size"
          element={<AdminPeriod />}
        />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route
          path="/admin/shifts/:page/:page_size"
          element={<AdminShifts />}
        />
        <Route path="/admin/size/:page/:page_size" element={<AdminSize />} />
        <Route path="/admin/skill/:page/:page_size" element={<AdminSkill />} />
        <Route
          path="/admin/subscribe/:page/:page_size"
          element={<AdminSubscribe />}
        />
        <Route path="/admin/tags/:page/:page_size" element={<AdminTags />} />
        <Route path="/admin/types/:page/:page_size" element={<AdminTypes />} />
        <Route path="*" element={<Error />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;