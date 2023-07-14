import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import ManageAccount from "./manageAccount";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestLogin,
  requestEmpGetCandidate,
  requestAddResume,
  requestFormField,
  requestCandidateResume,
} from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import image from "../images/profile.png";
import WOW from "wowjs";
import Swal from "sweetalert2";
import { Hint } from "react-autocomplete-hint";
import Breadcrumbs from "../Section/breadcrumbsSection";
import LoadGIF from '../images/loading-gif.gif'

function AddResume(props) {

  const printRef = React.useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [skill, setskill] = useState([]);
  const [language, setlanguage] = useState([]);
  const [img, setImg] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState([
    {
      title: "",
      company: "",
      start: "",
      leave: "",
      achieve: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      degree: "",
      university: "",
      start: "",
      leave: "",
      achieve: "",
    },
  ]);
  const [errorabout, setErrorabout] = useState("");
  const [errorskill, setErrorskill] = useState([]);
  const [errorexperience, setErrorexperience] = useState([
    {
      title: "",
      company: "",
      start: "",
      leave: "",
      achieve: "",
    },
  ]);
  const [erroreducation, setErroreducation] = useState([
    {
      degree: "",
      university: "",
      start: "",
      leave: "",
      achieve: "",
    },
  ]);
  const [skills, setSkills] = useState([
    {
      skill: "",
    },
  ]);
  const [error, setError] = useState(false);
  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
    localStorage.removeItem("link");
  }, []);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
        props.requestEmpGetCandidate({
          id: loginData.data.data.id,
        });
        props.requestFormField({
          token: loginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/addResumeForm");
        navigate("/login");
      }
    } else {
      localStorage.setItem("link", "/addResumeForm");
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let empGetCandidateData = props.employee.empGetCandidateData;
    if (empGetCandidateData !== undefined) {
      if (empGetCandidateData?.data?.status == "success") {
        setData(empGetCandidateData.data.data[0]);
        if (empGetCandidateData.data.data[0].skill1) {
          setSkills(JSON.parse(empGetCandidateData.data.data[0].skill1));
        }
        let s_error = [];
        if (empGetCandidateData.data.data[0].skill1 === null) {
          s_error.push('');
          setErrorskill(s_error)
        } else {
          Array.from(
            Array(JSON.parse(empGetCandidateData.data.data[0].education)?.length),
            (e, i) => {
              s_error.push('');
            }
          );
          setErrorskill(s_error)
        }

        if (empGetCandidateData.data.data[0].education) {
          setEducation(JSON.parse(empGetCandidateData.data.data[0].education));
        }
        let edu_error = [];
        if (empGetCandidateData.data.data[0].education === null) {
          edu_error.push({
            degree: "",
            university: "",
            start: "",
            leave: "",
            achieve: "",
          });
          setErroreducation(edu_error)
        } else {
          Array.from(
            Array(JSON.parse(empGetCandidateData.data.data[0].education)?.length),
            (e, i) => {
              edu_error.push({
                degree: "",
                university: "",
                start: "",
                leave: "",
                achieve: "",
              });
            }
          );
          setErroreducation(edu_error)
        }
        if (empGetCandidateData.data.data[0].experience1) {
          setExperience(JSON.parse(empGetCandidateData.data.data[0].experience1));
        }
        let exp_error = [];
        if (empGetCandidateData.data.data[0].experience1 === null) {
          exp_error.push({
            title: "",
            company: "",
            start: "",
            leave: "",
            achieve: "",
          });
          setErrorexperience(exp_error)
        } else {
          Array.from(
            Array(
              JSON.parse(empGetCandidateData.data.data[0].experience1)?.length
            ),
            (e, i) => {
              exp_error.push({
                title: "",
                company: "",
                start: "",
                leave: "",
                achieve: "",
              });
            }
          );
          setErrorexperience(exp_error)
        }

        setAbout(empGetCandidateData.data.data[0].about);
        if (empGetCandidateData.data.data[0].languages) {
          setlanguage(empGetCandidateData.data.data[0].languages.split(","));
        }
        setImg(
          process.env.REACT_APP_API_HOST + empGetCandidateData.data.data[0].profile
        );
      }
    }
  }, [props.employee.empGetCandidateData]);

  useEffect(() => {
    let formfieldData = props.employee.formfieldData;
    if (formfieldData !== undefined) {
      if (formfieldData?.data?.status === "success") {
        formfieldData.data.data.skills.map((a) => skill.push(a.name));
      }
    }
  }, [props.employee.formfieldData]);

  const onChangeAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleInputExperience = (e, index) => {
    const { name, value } = e.target;
    const list = [...experience];
    list[index][name] = value;
    setExperience(list);
  };
  const handleRemoveExperience = (index) => {
    const list = [...experience];
    list.splice(index, 1);
    setExperience(list);
    const errorlist = [...errorexperience];
    errorlist.splice(index, 1);
    setErrorexperience(errorlist);
  };
  const handleAddExperience = () => {
    let length = experience.length;
    if (length === 0) {
      setExperience([
        ...experience,
        {
          title: "",
          company: "",
          start: "",
          leave: "",
          achieve: "",
        },
      ]);
      setErrorexperience([
        ...errorexperience,
        {
          title: "",
          company: "",
          start: "",
          leave: "",
          achieve: "",
        },
      ]);
    } else if (
      experience[length - 1].title === "" ||
      experience[length - 1].company === "" ||
      experience[length - 1].start === "" ||
      experience[length - 1].leave === "" ||
      experience[length - 1].achieve === ""
    ) {
      Swal.fire(
        "Error!",
        "After completing previous one, You can add new one.",
        "error"
      );
    } else {
      setExperience([
        ...experience,
        {
          title: "",
          company: "",
          start: "",
          leave: "",
          achieve: "",
        },
      ]);
      setErrorexperience([
        ...errorexperience,
        {
          title: "",
          company: "",
          start: "",
          leave: "",
          achieve: "",
        },
      ]);
    }
  };

  const handleInputEducation = (e, index) => {
    const { name, value } = e.target;
    const list = [...education];
    list[index][name] = value;
    setEducation(list);
  };
  const handleRemoveEducation = (index) => {
    const list = [...education];
    list.splice(index, 1);
    setEducation(list);
    const errorlist = [...erroreducation];
    errorlist.splice(index, 1);
    setErroreducation(errorlist);
  };
  const handleAddEducation = () => {
    let length = education.length;
    if (length === 0) {
      setEducation([
        ...education,
        {
          degree: "",
          university: "",
          start: "",
          leave: "",
          achieve: "",
        },
      ]);
      setErroreducation([
        ...erroreducation,
        {
          degree: "",
          university: "",
          start: "",
          leave: "",
          achieve: "",
        },
      ]);
    } else if (
      education[length - 1].degree === "" ||
      education[length - 1].university === "" ||
      education[length - 1].start === "" ||
      education[length - 1].leave === "" ||
      education[length - 1].achieve === ""
    ) {
      Swal.fire(
        "Error!",
        "After completing previous one, You can add new one.",
        "error"
      );
    } else {
      setEducation([
        ...education,
        {
          degree: "",
          university: "",
          start: "",
          leave: "",
          achieve: "",
        },
      ]);
      setErroreducation([
        ...erroreducation,
        {
          degree: "",
          university: "",
          start: "",
          leave: "",
          achieve: "",
        },
      ]);
    }
  };

  const handleInputSkills = (e, index) => {
    const { name, value } = e.target;
    const list = [...skills];
    list[index][name] = value;
    setSkills(list);
  };
  const handleRemoveSkills = (index) => {
    const list = [...skills];
    list.splice(index, 1);
    setSkills(list);
    const errorlist = [...errorskill];
    errorlist.splice(index, 1);
    setErrorskill(errorlist);
  };
  const handleAddSkills = () => {
    let length = skills.length;
    if (length === 0) {
      setSkills([
        ...skills,
        {
          skill: "",
        },
      ]);
    } else if (skills[length - 1].skill === "") {
      Swal.fire(
        "Error!",
        "After completing previous one, You can add new one.",
        "error"
      );
    } else {
      setSkills([
        ...skills,
        {
          skill: "",
        },
      ]);
    }
  };

  function validateAbout() {
    let formIsValid = false;
    if (!about) {
      formIsValid = false;
      setErrorabout("*Enter something about you.");
    } else if (typeof about === "undefined") {
      formIsValid = false;
      setErrorabout("*Enter something about you.");
    } else {
      formIsValid = true;
      setErrorabout("");
    }
    return formIsValid;
  }
  function validateSkill(i) {
    let formIsValid = false;
    if (!skills[i].skill) {
      formIsValid = false;
      const list = [...errorskill];
      list[i] = "*Enter skill or delete textbox.";
      setErrorskill(list);
    } else if (typeof skills[i].skill === "undefined") {
      formIsValid = false;
      const list = [...errorskill];
      list[i] = "*Enter skill or delete textbox.";
      setErrorskill(list);
    } else {
      formIsValid = true;
      const list = [...errorskill];
      list[i] = "";
      setErrorskill(list);
    }
    return formIsValid;
  }
  function validateExperienceTitle(i) {
    let formIsValid = false;
    if (!experience[i].title) {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].title = "*Enter title of your experience.";
      setErrorexperience(list);
    } else if (typeof experience[i].title === "undefined") {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].title = "*Enter title of your experience.";
      setErrorexperience(list);
    } else {
      formIsValid = true;
      const list = [...errorexperience];
      list[i].title = "";
      setErrorexperience(list);
    }
    return formIsValid;
  }
  function validateExperienceCompany(i) {
    let formIsValid = false;
    if (!experience[i].company) {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].company = "*Enter company of your experience.";
      setErrorexperience(list);
    } else if (typeof experience[i].company === "undefined") {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].company = "*Enter company of your experience.";
      setErrorexperience(list);
    } else {
      formIsValid = true;
      const list = [...errorexperience];
      list[i].company = "";
      setErrorexperience(list);
    }
    return formIsValid;
  }
  function validateExperienceStart(i) {
    let formIsValid = false;
    var Today = new Date();
    if (!experience[i].start) {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].start = "*Enter start month of your experience.";
      setErrorexperience(list);
    } else if (typeof experience[i].start === "undefined") {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].start = "*Enter start month of your experience.";
      setErrorexperience(list);
    } else if (new Date(experience[i].start).getTime() >= Today.getTime()) {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].start = "*Joining time should be in past.";
      setErrorexperience(list);
    } else {
      formIsValid = true;
      const list = [...errorexperience];
      list[i].start = "";
      setErrorexperience(list);
    }
    return formIsValid;
  }
  function validateExperienceLeave(i) {
    let formIsValid = false;
    var Today = new Date();
    if (!experience[i].leave) {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].leave = "*Enter leave month of your experience.";
      setErrorexperience(list);
    } else if (typeof experience[i].leave === "undefined") {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].leave = "*Enter leave month of your experience.";
      setErrorexperience(list);
    } else if (new Date(experience[i].leave).getTime() >= Today.getTime()) {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].leave = "*Leaving time should be in past or current month.";
      setErrorexperience(list);
    } else if (
      new Date(experience[i].leave).getTime() <=
      new Date(experience[i].start).getTime()
    ) {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].leave = "*Leaving time should be longer than joining time.";
      setErrorexperience(list);
    } else {
      formIsValid = true;
      const list = [...errorexperience];
      list[i].leave = "";
      setErrorexperience(list);
    }
    return formIsValid;
  }
  function validateExperienceAchieve(i) {
    let formIsValid = false;
    if (!experience[i].achieve) {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].achieve = "*Enter achievement of your experience.";
      setErrorexperience(list);
    } else if (typeof experience[i].achieve === "undefined") {
      formIsValid = false;
      const list = [...errorexperience];
      list[i].achieve = "*Enter achievement of your experience.";
      setErrorexperience(list);
    } else {
      formIsValid = true;
      const list = [...errorexperience];
      list[i].achieve = "";
      setErrorexperience(list);
    }
    return formIsValid;
  }
  function validateEducationDegree(i) {
    let formIsValid = false;
    if (!education[i].degree) {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].degree = "*Enter degree of your education.";
      setErroreducation(list);
    } else if (typeof education[i].degree === "undefined") {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].degree = "*Enter degree of your education.";
      setErroreducation(list);
    } else {
      formIsValid = true;
      const list = [...erroreducation];
      list[i].degree = "";
      setErroreducation(list);
    }
    return formIsValid;
  }
  function validateEducationUniversity(i) {
    let formIsValid = false;
    if (!education[i].university) {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].university = "*Enter university of your education.";
      setErroreducation(list);
    } else if (typeof education[i].university === "undefined") {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].university = "*Enter university of your education.";
      setErroreducation(list);
    } else {
      formIsValid = true;
      const list = [...erroreducation];
      list[i].university = "";
      setErroreducation(list);
    }
    return formIsValid;
  }
  function validateEducationStart(i) {
    let formIsValid = false;
    var Today = new Date();
    if (!education[i].start) {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].start = "*Enter start month of your education.";
      setErroreducation(list);
    } else if (typeof education[i].start === "undefined") {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].start = "*Enter start month of your education.";
      setErroreducation(list);
    } else if (new Date(education[i].start).getTime() >= Today.getTime()) {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].start = "*Joining time should be in past.";
      setErroreducation(list);
    } else {
      formIsValid = true;
      const list = [...erroreducation];
      list[i].start = "";
      setErroreducation(list);
    }
    return formIsValid;
  }
  function validateEducationLeave(i) {
    let formIsValid = false;
    var Today = new Date();
    if (!education[i].leave) {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].leave = "*Enter leave month of your education.";
      setErroreducation(list);
    } else if (typeof education[i].leave === "undefined") {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].leave = "*Enter leave month of your education.";
      setErroreducation(list);
    } else if (new Date(education[i].leave).getTime() >= Today.getTime()) {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].leave = "*Leaving time should be in past or current month.";
      setErroreducation(list);
    } else if (
      new Date(education[i].leave).getTime() <=
      new Date(education[i].start).getTime()
    ) {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].leave = "*Leaving time should be longer than joining time.";
      setErroreducation(list);
    } else {
      formIsValid = true;
      const list = [...erroreducation];
      list[i].leave = "";
      setErroreducation(list);
    }
    return formIsValid;
  }
  function validateEducationAchieve(i) {
    let formIsValid = false;
    if (!education[i].achieve) {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].achieve = "*Enter achievement of your education.";
      setErroreducation(list);
    } else if (typeof education[i].achieve === "undefined") {
      formIsValid = false;
      const list = [...erroreducation];
      list[i].achieve = "*Enter achievement of your education.";
      setErroreducation(list);
    } else {
      formIsValid = true;
      const list = [...erroreducation];
      list[i].achieve = "";
      setErroreducation(list);
    }
    return formIsValid;
  }

  function validateForm() {
    const validabout = validateAbout();

    let validskill = true;
    for (var i = 0; i < skills.length; i++) {
      validskill = validskill && validateSkill(i);
    }

    let validexperiencetitle = true;
    for (var i = 0; i < experience.length; i++) {
      validexperiencetitle = validexperiencetitle && validateExperienceTitle(i);
    }
    let validexperiencecompany = true;
    for (var i = 0; i < experience.length; i++) {
      validexperiencecompany =
        validexperiencecompany && validateExperienceCompany(i);
    }
    let validexperiencestart = true;
    for (var i = 0; i < experience.length; i++) {
      validexperiencestart = validexperiencestart && validateExperienceStart(i);
    }
    let validexperienceleave = true;
    for (var i = 0; i < experience.length; i++) {
      validexperienceleave = validexperienceleave && validateExperienceLeave(i);
    }
    let validexperienceachieve = true;
    for (var i = 0; i < experience.length; i++) {
      validexperienceachieve =
        validexperienceachieve && validateExperienceAchieve(i);
    }

    let valideducationdegree = true;
    for (var i = 0; i < education.length; i++) {
      valideducationdegree = valideducationdegree && validateEducationDegree(i);
    }
    let valideducationuniversity = true;
    for (var i = 0; i < education.length; i++) {
      valideducationuniversity =
        valideducationuniversity && validateEducationUniversity(i);
    }
    let valideducationstart = true;
    for (var i = 0; i < education.length; i++) {
      valideducationstart = valideducationstart && validateEducationStart(i);
    }
    let valideducationleave = true;
    for (var i = 0; i < education.length; i++) {
      valideducationleave = valideducationleave && validateEducationLeave(i);
    }
    let valideducationachieve = true;
    for (var i = 0; i < education.length; i++) {
      valideducationachieve =
        valideducationachieve && validateEducationAchieve(i);
    }
    const validall = validabout && validskill && validexperiencetitle && validexperiencecompany && validexperiencestart && validexperienceleave && validexperienceachieve && valideducationuniversity && valideducationstart && valideducationleave && valideducationachieve && valideducationdegree;
    return validall;
  }

  const handleDownloadPdf = () => {
    if (validateForm()) {
      setLoading(true)
      document.querySelector("#printme").style.display = "block";
      const getPDF = async () => {
        const element = document.getElementById("printme");
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");

        const doc = new jsPDF("p", "pt", "a4", true);
        const imgProperties = doc.getImageProperties(data);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        doc.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        // doc.save("resume.pdf");
        setLoading(false)
        const formData = new FormData();
        var file = new File([doc.output("blob")], "resume.pdf");
        formData.append("resume", file)
        props.requestCandidateResume({
          id: user.id,
          token: user.token,
          data: {
            skill1: skills,
            education: education,
            experience1: experience,
            about: about,
          },
        });

        props.requestAddResume({
          token: user.token,
          id: user.id,
          data: formData,
        });
      };
      getPDF();
      document.querySelector("#printme").style.display = "none";
      setError(false)
    } else {
      setError(true)
    }
  };

  useEffect(() => {
    if (error) {
      if (errorabout) {
        document.getElementById("about").focus();
      } else {
        const es = async () => {
          await errorskill.map((s, i) => {
            if (errorskill[i]) {
              document.getElementById("skill" + i).focus();
            }
          })
        }
        const eexp = async () => {
          await errorexperience.map((s, i) => {
            if (errorexperience[i].title) {
              document.getElementById("title" + i).focus();
            } else if (errorexperience[i].company) {
              document.getElementById("company" + i).focus();
            } else if (errorexperience[i].start) {
              document.getElementById("startexp" + i).focus();
            } else if (errorexperience[i].leave) {
              document.getElementById("leaveexp" + i).focus();
            } else if (errorexperience[i].achieve) {
              document.getElementById("achieveexp" + i).focus();
            }
          })
        }
        const eedu = async () => {
          await erroreducation.map((s, i) => {
            if (erroreducation[i].degree) {
              document.getElementById("degree" + i).focus();
            } else if (erroreducation[i].university) {
              document.getElementById("university" + i).focus();
            } else if (erroreducation[i].start) {
              document.getElementById("startedu" + i).focus();
            } else if (erroreducation[i].leave) {
              document.getElementById("leaveedu" + i).focus();
            } else if (erroreducation[i].achieve) {
              document.getElementById("achieveedu" + i).focus();
            }
          })
        }
        es();
        eedu();
        eexp();
      }
      setError(false)
    }
  }, [error]);

  useEffect(() => {
    let addresume = props.candidate.addResumeData;
    if (addresume !== undefined) {
      if (addresume?.data?.status == "success") {
        Swal.fire("Good job!", "Resume Uploaded successfully.", "success");
        props.candidate.addResumeData = undefined;
        props.candidate.resumeData = undefined;
        navigate("/resume");
      } else {
        Swal.fire(
          "Error!",
          "There is some error in uploading resume.",
          "error"
        );
        props.candidate.addResumeData = undefined;
        props.candidate.resumeData = undefined;
      }
    }
  }, [props.candidate.addResumeData]);

  return (
    <>
      <Header />
      <Breadcrumbs title="Make Resume" />
      <div class="resume section">
        <div class="container">
          <div class="resume-inner">
            <div class="row">
              <ManageAccount name="Settings" />

              <div class="col-lg-8 col-12">
                <div class="inner-content">
                  <div class="forms-sample" id="resume">
                    <div class="personal-top-content">
                      <div class="row">
                        <div class="col-lg-5 col-md-5 col-12">
                          <div class="name-head">
                            {data.profile ? (
                              <img
                                class="circle-54"
                                src={img}
                                alt="Profile"
                                height="200"
                              />
                            ) : (
                              <img
                                class="circle-54"
                                src={image}
                                alt="Profile"
                                height="200"
                              />
                            )}
                          </div>
                        </div>

                        <div class="col-lg-7 col-md-7 col-12">
                          <div class="content-right">
                            <h5 class="title-main">
                              {data.first_name} {data.last_name}
                            </h5>

                            <div class="single-list">
                              <h5 class="title">Location</h5>
                              <p>
                                {data.state_name}, {data.country_name}
                              </p>
                            </div>

                            <div class="single-list">
                              <h5 class="title">E-mail</h5>
                              <p>{data.email}</p>
                            </div>

                            <div class="single-list">
                              <h5 class="title">Phone</h5>
                              <p>{data.phone}</p>
                            </div>

                            <div class="single-list">
                              <h5 class="title">Functional Area</h5>
                              <p>{data.functional_area}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="single-section">
                      <h4>About</h4>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            rows="5"
                            name="about"
                            id="about"
                            style={{
                              whiteSpace: "pre-wrap",
                              fontFamily: "Inter",
                              fontWeight: "normal",
                              fontStyle: "normal",
                              color: "#7E8890",
                              fontSize: "14px",
                              lineHeight: "18px",
                              height: "100px"
                            }}
                            value={about}
                            onChange={onChangeAbout}
                            onBlur={validateAbout}
                            placeholder=""
                          ></textarea>
                          {errorabout && (
                            <div style={mystyle}>{errorabout}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="single-section skill">
                      <h4>
                        Skills
                        <button
                          onClick={handleAddSkills}
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid green",
                            padding: "4px 8px",
                            float: "right",
                          }}
                        >
                          <i class="fa fa-plus" style={{ color: "green" }}></i>
                        </button>
                      </h4>
                      <div class="row">
                        {
                          skills.map((x, i) => {
                            return (
                              <div style={{ width: "250px" }}>
                                <div
                                  style={{ float: "left", padding: "5px 0px" }}
                                  class="form-group"
                                >
                                  <div style={{ position: "relative" }}>
                                    <Hint options={skill} allowTabFill>
                                      <input
                                        class="form-control"
                                        type="text"
                                        id={"skill" + i}
                                        name="skill"
                                        value={x.skill}
                                        onBlur={() => validateSkill(i)}
                                        onChange={(e) => handleInputSkills(e, i)}
                                        placeholder=""
                                      />
                                    </Hint>

                                    <button
                                      onClick={() => handleRemoveSkills(i)}
                                      class="btn "
                                      type="button"
                                      style={{
                                        backgroundColor: "transparent",
                                        border: "1px solid red",
                                        position: "absolute",
                                        right: "0px",
                                        top: "0px",
                                        padding: "8px"
                                      }}
                                    >
                                      <i
                                        class="fa fa-trash"
                                        style={{ color: "red" }}
                                      ></i>
                                    </button>

                                    {errorskill[i] && (
                                      <div style={mystyle}>{errorskill[i]}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div class="single-section exprerience">
                      <h4>
                        Work Exprerience
                        <button
                          onClick={handleAddExperience}
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid green",
                            padding: "4px 8px",
                            float: "right",
                          }}
                        >
                          <i class="fa fa-plus" style={{ color: "green" }}></i>
                        </button>
                      </h4>

                      {experience.map((x, i) => {
                        return (
                          <div
                            class="row "
                            style={{
                              boxShadow: "2px 4px 8px 4px rgba(0,0,0,0.2)",
                              transition: "0.3s",
                              padding: "20px",
                              borderRadius: "15px",
                              marginTop: "20px",
                            }}
                          >
                            <div
                              class="col-lg-12 col-md-12"
                              style={{ marginBottom: "5px", color: "black" }}
                            >
                              <b>Work Experience : {i + 1}</b>
                              <button
                                onClick={() => handleRemoveExperience(i)}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "1px solid red",
                                  padding: "4px 8px",
                                  float: "right",
                                }}
                              >
                                <i
                                  class="fa fa-trash"
                                  style={{ color: "red" }}
                                ></i>
                              </button>
                            </div>
                            <div
                              class="col-lg-6 col-md-6"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Job Title</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="title"
                                  id={"title" + i}
                                  value={x.title}
                                  onBlur={() => validateExperienceTitle(i)}
                                  onChange={(e) => handleInputExperience(e, i)}
                                  placeholder=""
                                />
                                {errorexperience[i].title && (
                                  <div style={mystyle}>
                                    {errorexperience[i].title}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              class="col-lg-6 col-md-6"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Company Name</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="company"
                                  id={"company" + i}
                                  value={x.company}
                                  onBlur={() => validateExperienceCompany(i)}
                                  onChange={(e) => handleInputExperience(e, i)}
                                  placeholder=""
                                />
                                {errorexperience[i].company && (
                                  <div style={mystyle}>
                                    {errorexperience[i].company}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              class="col-lg-6 col-md-6"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Starting Time</label>
                                <input
                                  class="form-control"
                                  type="month"
                                  name="start"
                                  id={"startexp" + i}
                                  value={x.start}
                                  onBlur={() => validateExperienceStart(i)}
                                  onChange={(e) => handleInputExperience(e, i)}
                                  placeholder=""
                                />
                                {errorexperience[i].start && (
                                  <div style={mystyle}>
                                    {errorexperience[i].start}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              class="col-lg-6 col-md-6"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Leaving Time</label>
                                <input
                                  class="form-control"
                                  type="month"
                                  name="leave"
                                  id={"leaveexp" + i}
                                  value={x.leave}
                                  onBlur={() => validateExperienceLeave(i)}
                                  onChange={(e) => handleInputExperience(e, i)}
                                  placeholder=""
                                />
                                {errorexperience[i].leave && (
                                  <div style={mystyle}>
                                    {errorexperience[i].leave}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div
                              class="col-lg-12 col-md-12"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Achievement in this Role</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  name="achieve"
                                  id={"achieveexp" + i}
                                  style={{
                                    whiteSpace: "pre-wrap",
                                    fontFamily: "Inter",
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    color: "#7E8890",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    height: "100px"
                                  }}
                                  value={x.achieve}
                                  onChange={(e) => handleInputExperience(e, i)}
                                  onBlur={() => validateExperienceAchieve(i)}
                                  placeholder=""
                                ></textarea>
                                {errorexperience[i].achieve && (
                                  <div style={mystyle}>
                                    {errorexperience[i].achieve}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div class="single-section education">
                      <h4>
                        Education
                        <button
                          onClick={handleAddEducation}
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid green",
                            padding: "4px 8px",
                            float: "right",
                          }}
                        >
                          <i class="fa fa-plus" style={{ color: "green" }}></i>
                        </button>
                      </h4>

                      {education.map((x, i) => {
                        return (
                          <div
                            class="row"
                            style={{
                              boxShadow: "2px 4px 8px 4px rgba(0,0,0,0.2)",
                              transition: "0.3s",
                              padding: "20px",
                              borderRadius: "15px",
                              marginTop: "20px",
                            }}
                          >
                            <div
                              class="col-lg-12 col-md-12"
                              style={{ marginBottom: "5px", color: "black" }}
                            >
                              <b>Education : {i + 1}</b>
                              <button
                                onClick={() => handleRemoveEducation(i)}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "1px solid red",
                                  padding: "4px 8px",
                                  float: "right",
                                }}
                              >
                                <i
                                  class="fa fa-trash"
                                  style={{ color: "red" }}
                                ></i>
                              </button>
                            </div>
                            <div
                              class="col-lg-6 col-md-6"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Degree Name</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="degree"
                                  id={"degree" + i}
                                  value={x.degree}
                                  onBlur={() => validateEducationDegree(i)}
                                  onChange={(e) => handleInputEducation(e, i)}
                                  placeholder=""
                                />
                                {erroreducation[i].degree && (
                                  <div style={mystyle}>
                                    {erroreducation[i].degree}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              class="col-lg-6 col-md-6"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>University Name</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="university"
                                  id={"university" + i}
                                  value={x.university}
                                  onBlur={() => validateEducationUniversity(i)}
                                  onChange={(e) => handleInputEducation(e, i)}
                                  placeholder=""
                                />
                                {erroreducation[i].university && (
                                  <div style={mystyle}>
                                    {erroreducation[i].university}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              class="col-lg-6 col-md-6"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Starting Time</label>
                                <input
                                  class="form-control"
                                  type="month"
                                  name="start"
                                  id={"startedu" + i}
                                  value={x.start}
                                  onBlur={() => validateEducationStart(i)}
                                  onChange={(e) => handleInputEducation(e, i)}
                                  placeholder=""
                                />
                                {erroreducation[i].start && (
                                  <div style={mystyle}>
                                    {erroreducation[i].start}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              class="col-lg-6 col-md-6"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Leaving Time</label>
                                <input
                                  class="form-control"
                                  type="month"
                                  name="leave"
                                  id={"leaveedu" + i}
                                  value={x.leave}
                                  onBlur={() => validateEducationLeave(i)}
                                  onChange={(e) => handleInputEducation(e, i)}
                                  placeholder=""
                                />
                                {erroreducation[i].leave && (
                                  <div style={mystyle}>
                                    {erroreducation[i].leave}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              class="col-lg-12 col-md-12"
                              style={{ padding: "5px" }}
                            >
                              <div class="form-group">
                                <label>Achievement in this Degree</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  name="achieve"
                                  id={"achieveedu" + i}
                                  style={{
                                    whiteSpace: "pre-wrap",
                                    fontFamily: "Inter",
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    color: "#7E8890",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    height: "100px"
                                  }}
                                  value={x.achieve}
                                  onChange={(e) => handleInputEducation(e, i)}
                                  onBlur={() => validateEducationAchieve(i)}
                                  placeholder=""
                                ></textarea>
                                {erroreducation[i].achieve && (
                                  <div style={mystyle}>
                                    {erroreducation[i].achieve}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {loading &&
                  <div class="col-lg-12 mt-3">  
                    <img src={LoadGIF} alt="" width="35" height="35"/>
                  </div>
                  }
                  <div class="col-lg-12">                  
                    <div class="button" style={{ marginTop: "30px" }}>
                      <button class="btn" type="submit" onClick={handleDownloadPdf}>
                        Make Resume
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div ref={printRef}>
        <div id="printme" style={{ display: "none" }}>
          <div class="row">
            <div
              class="col-4"
              style={{ backgroundColor: "#2042e3", padding: "50px" }}
            >
              <h1 style={{ color: "white" }}>{data.first_name}</h1>
              <h1 style={{ color: "white" }}>{data.last_name}</h1>
              <br />
              <br />
              <div
                style={{
                  padding: "20px 0px",
                  margin: "15px -50px",
                  backgroundColor: "#000080",
                }}
              >
                <h4 style={{ color: "white", padding: "0px 50px" }}>
                  Personal Information
                </h4>
              </div>
              <br />
              <h5 style={{ color: "white" }}>
                <i class="fa fa-map-marker"></i>&nbsp;&nbsp;&nbsp;
                {data.state_name}, {data.country_name}
              </h5>
              <br />
              <h5 style={{ color: "white" }}>
                <i class="fa fa-phone"></i>&nbsp;&nbsp;&nbsp;{data.phone}
              </h5>
              <br />
              <h5 style={{ color: "white" }}>
                <i class="fa fa-envelope"></i>&nbsp;&nbsp;&nbsp;{data.email}
              </h5>
              <br />
              <br />
              <br />
              <div
                style={{
                  padding: "20px 0px",
                  margin: "15px -50px",
                  backgroundColor: "#000080",
                }}
              >
                <h4 style={{ color: "white", padding: "0px 50px" }}>Skills</h4>
              </div>
              <br />
              {skills.length > 0 &&
                skills.map((item, index) => {
                  return (
                    <>
                      <h5 style={{ color: "white" }} key={index}>
                        {item.skill}
                      </h5>
                      <br />
                    </>
                  );
                })}
              <br />
              <br />
              <br />
              <div
                style={{
                  padding: "20px 0px",
                  margin: "15px -50px",
                  backgroundColor: "#000080",
                }}
              >
                <h4 style={{ color: "white", padding: "0px 50px" }}>
                  Languages
                </h4>
              </div>
              <br />

              {language.length > 0 &&
                language.map((item, index) => {
                  return (
                    <>
                      <h5 style={{ color: "white" }} key={index}>
                        {item}
                      </h5>
                      <br />
                    </>
                  );
                })}
            </div>
            <div class="col-8" style={{ padding: "50px" }}>
              <h5
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  color: "#808080",
                }}
              >
                {about}
              </h5>
              <br />

              {experience.length > 0 && (
                <>
                  <hr />
                  <h4>Work Exprerience</h4>
                  <br />
                </>
              )}
              {experience.length > 0 &&
                experience.map((item, index) => {
                  return (
                    <div class="single-exp mb-30" key={index}>
                      <h5>{item.title} </h5>
                      <h5 style={{ color: "#808080" }}>{item.company}</h5>
                      <h5 style={{ color: "#808080" }}>
                        {item.start} - {item.leave}
                      </h5>
                      <h5
                        style={{
                          whiteSpace: "pre-wrap",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          color: "#808080",
                        }}
                      >
                        {item.achieve}
                      </h5>
                    </div>
                  );
                })}

              {education.length > 0 && (
                <>
                  <hr />
                  <h4>Education</h4>
                  <br />
                </>
              )}

              {education.length > 0 &&
                education.map((item, index) => {
                  return (
                    <div class="single-exp mb-30" key={index}>
                      <h5>{item.degree} </h5>
                      <h5 style={{ color: "#808080" }}>{item.university}</h5>
                      <h5 style={{ color: "#808080" }}>
                        {item.start} - {item.leave}
                      </h5>
                      <h5
                        style={{
                          whiteSpace: "pre-wrap",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          color: "#808080",
                        }}
                      >
                        {item.achieve}
                      </h5>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { candidate: state.candidate, employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestLogin,
      requestEmpGetCandidate,
      requestAddResume,
      requestFormField,
      requestCandidateResume,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddResume);
