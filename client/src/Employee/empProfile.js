import Footer from "../Components/footer";
import Header from "../Components/header";
import ManageAccount from "./manageAccount";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  requestEmpLogin,
  requestFormField,
  requestGetEmp,
  requestEmpProfile,
  requestCountry,
  requestState,
  requestCity,
} from "../Redux/actions";
import WOW from "wowjs";
import Swal from "sweetalert2";
import Breadcrumbs from "../Section/breadcrumbsSection";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { Storage } from 'aws-amplify';

// AWS.config.update({
//   accessKeyId: 'AKIAQZRDJDKRYTCUS27Z',
//   secretAccessKey: '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',
//   region: 'ap-southeast-1',
// });

// const s3 = new AWS.S3({
//   apiVersion: '2006-03-01',
//   params: { Bucket: 'lookbook8937d88bda3e47498ad4e75fd1c30485102628-dev' },
// });


function Profie(props) {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
    localStorage.removeItem("link");
  }, []);

  const mystyle = {
    color: "#D10000",
    backgroundColor: "#FFD2D2",
    padding: "3px 10px",
    border: "1px solid red",
    borderRadius: "5px",
    marginTop: "5px",
  };

  const [data, setData] = useState({});
  const [countryId, setcountryId] = useState(0);
  const [stateId, setstateId] = useState(0);
  const [cityId, setcityId] = useState(0);

  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [cities, setcities] = useState([]);
  const [states, setstates] = useState([]);
  const [countries, setcountries] = useState([]);
  const [categories, setcategories] = useState([]);
  const [owner, setowner] = useState([]);
  const [industry, setindustry] = useState([]);

  const [errorname, seterrorname] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorcountry, seterrorcountry] = useState("");
  const [errorstate, seterrorstate] = useState("");
  const [errorcity, seterrorcity] = useState("");
  const [errorauthorized_person, seterrorauthorized_person] = useState("");
  const [errorindustry, seterrorindustry] = useState("");
  const [errorownership_type, seterrorownership_type] = useState("");
  const [errorsize, seterrorsize] = useState("");
  const [erroremployer_details, seterroremployer_details] = useState("");
  const [errorauthorized_mobile, seterrorauthorized_mobile] = useState("");
  const [errorabout_us, seterrorabout_us] = useState("");
  const [errorpincode, seterrorpincode] = useState("");
  const [errorno_of_offices, seterrorno_of_offices] = useState("");
  const [erroraddress, seterroraddress] = useState("");
  const [errorwebsite, seterrorwebsite] = useState("");
  // const [errorstatus, seterrorstatus] = useState("");
  // const [erroris_featured, seterroris_featured] = useState("");
  // const [errorfacebook_url, seterrorfacebook_url] = useState("");
  // const [errortwitter_url, seterrortwitter_url] = useState("");
  // const [errorlinkedin_url, seterrorlinkedin_url] = useState("");
  // const [errorgoogle_plus_url, seterrorgoogle_plus_url] = useState("");
  // const [errorpinterest_url, seterrorpinterest_url] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [emp, setEmp] = useState({});
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificate, setCertificate] = useState(null)

  // useEffect(() => {
  //   console.log(selectedState);
  //   console.log(selectedCity);
  // }, [selectedState, selectedCity]);

  const statesOfIndia = State.getStatesOfCountry("IN");

  const selectStyles = {
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // Set a high z-index value
    }),
  };


  const handleCertificateChange = (event) => {
    const file = event.target.files[0];
    setCertificateFile(file);
  };

  async function uploadfile(e) {
    e.preventDefault();
    if (certificateFile) {
      const s3Key = `employerCertificate/${emp.id}`;
      const result = await Storage.put(s3Key, certificateFile, {
        contentType: certificateFile.type,

      });
      if (result) {
        alert("successful");
        setCertificate(
          result
        );
      } else {
        console.log("semething went wrong");
      }
    } else {
      Swal.fire(
        "Error!",
        "Please select png or jpg or jpeg file for profile picture.",
        "error"
      );
    }
  }

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setEmp(empLoginData.data.data);
        props.requestGetEmp({
          id: empLoginData.data.data.id,
          token: empLoginData.data.data.token,
        });
        props.requestFormField({
          token: empLoginData.data.data.token,
        });
      } else {
        localStorage.setItem("link", "/empProfile");
        navigate("/emplogin");
      }
    } else {
      localStorage.setItem("link", "/empProfile");
      navigate("/emplogin");
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    const getCertificate = async () => {
      const s3Key = `employerCertificate/${emp.id}`;
      try {

        const response = await Storage.list(s3Key);
        if (response.results.length) {
          const certificateUrl = await Storage.get(s3Key);
          if (certificateUrl) {
            setCertificate(
              certificateUrl
            );
          }
        }
      } catch (error) {
        console.error(error.message)
      }

    }
    getCertificate();

  })

  useEffect(() => {
    let empData = props.employee.empData;
    if (empData !== undefined) {
      if (empData?.data?.status == "success") {
        setData(empData.data.data);
        if (empData.data.data.country) {
          setcountryId(empData.data.data.country);
          props.requestState({
            id: empData.data.data.country,
          });
          if (empData.data.data.state) {
            setstateId(empData.data.data.state);
            props.requestCity({
              id: empData.data.data.state,
            });
            if (empData.data.data.city) {
              setcityId(empData.data.data.city);
            }
          }
        }
      }
    }
  }, [props.employee.empData]);

  // useEffect(() => {
  //   let formfieldData = props.employee.formfieldData;
  //   // console.log(formfieldData);
  //   if (formfieldData !== undefined) {
  //     if (formfieldData?.data?.status == "success") {
  //       setcategories(formfieldData.data.data.categories[0].category);
  //       setfunctional_area(formfieldData.data.data.categories[2].educationOptions);
  //       setfunctional_area(formfieldData.data.data.categories[2].educationOptions);
  //       setdegree_levels(formfieldData.data.data.categories[1].educationLevel);
  //       setexpiry_date(formfieldData.data.data.categories[4].expiry_date);

  //       // setSalaryPeriod(formfieldData.data.data.SalaryPeriod);
  //       // setcareer_levels(formfieldData.data.data.career_levels);
  //       // seteducation(formfieldData.data.data.categories[1].educationLevel);
  //       // setnotice_period(formfieldData.data.data.categories[3].notice_period);
  //       // setcurrencies(formfieldData.data.data.currencies);
  //       // setfunctional_areas(formfieldData.data.data.functional_areas);
  //       // setskills(formfieldData.data.data.skills);
  //       // settags(formfieldData.data.data.tags);
  //       // settypes(formfieldData.data.data.types);
  //       // setposition(formfieldData.data.data.position);
  //     }
  //   }
  // }, [props.employee.formfieldData]);
  useEffect(() => {
    let formfieldData = props.employee.formfieldData;
    if (formfieldData !== undefined) {
      if (formfieldData?.data?.status === "success") {
        setcategories(formfieldData.data.data.categories[0].category);
        // setowner(formfieldData.data.data.ownertype);
        // setsize(formfieldData.data.data.sizes);
      }
    }
  }, [props.employee.formfieldData]);

  function onChangeData(e) {
    if (e.target.type === 'radio') {
      setData((data) => ({
        ...data,
        [e.target.name]: parseInt(e.target.value),
      }));
    } else {
      setData((data) => ({
        ...data,
        [e.target.name]: e.target.value,
      }));
    }
  }

  useEffect(() => {
    props.requestCountry();
  }, []);

  useEffect(() => {
    let countryData = props.candidate.countryData;
    if (countryData !== undefined) {
      if (countryData?.data?.status === "success") {
        setcountries(countryData.data.data.countries);
      }
    }
  }, [props.candidate.countryData]);

  // function onChangeCountry(e) {
  //   setcountryId(e.target.value);
  //   props.requestState({
  //     id: e.target.value,
  //   });
  // }

  useEffect(() => {
    let stateData = props.candidate.stateData;
    if (stateData !== undefined) {
      if (stateData?.data?.status === "success") {
        setstates(stateData.data.data.states);
      }
    }
  }, [props.candidate.stateData]);

  // function onChangeState(e) {
  //   setstateId(e.target.value);
  //   props.requestCity({
  //     id: e.target.value,
  //   });
  // }

  useEffect(() => {
    let cityData = props.candidate.cityData;
    if (cityData !== undefined) {
      if (cityData?.data?.status === "success") {
        setcities(cityData.data.data.cities);
      }
    }
  }, [props.candidate.cityData]);

  // function onChangeCity(e) {
  //   setcityId(e.target.value);
  // }

  function validatename() {
    let formIsValid = false;
    if (!data["name"]) {
      formIsValid = false;
      seterrorname("*Enter company name.");
    } else if (typeof data["name"] === "undefined") {
      formIsValid = false;
      seterrorname("*Enter company name.");
    } else {
      formIsValid = true;
      seterrorname("");
    }
    return formIsValid;
  }
  function validateemail() {
    let formIsValid = false;
    if (!data["email"]) {
      formIsValid = false;
      seterroremail("*Enter your E-mail ID.");
    } else if (typeof data["email"] !== "undefined") {
      if (
        !data["email"].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        formIsValid = false;
        seterroremail("*Please enter valid E-mail ID.");
      } else {
        formIsValid = true;
        seterroremail("");
      }
    } else {
      formIsValid = true;
      seterroremail("");
    }
    return formIsValid;
  }
  // function validatecountry() {
  //   let formIsValid = false;
  //   if (!countryId) {
  //     formIsValid = false;
  //     seterrorcountry("*Select your country.");
  //   } else if (typeof countryId === "undefined") {
  //     formIsValid = false;
  //     seterrorcountry("*Select your country.");
  //   } else if (countryId === "0") {
  //     formIsValid = false;
  //     seterrorcountry("*Select your country.");
  //   } else {
  //     formIsValid = true;
  //     seterrorcountry("");
  //   }
  //   return formIsValid;
  // }
  function validateState() {
    let formIsValid = false;
    if (!selectedState) {
      formIsValid = false;
      seterrorstate("*Select your state.");
    } else if (typeof stateId === "undefined") {
      formIsValid = false;
      seterrorstate("*Select your state.");
    } else if (stateId === "0") {
      formIsValid = false;
      seterrorstate("*Select your state.");
    } else {
      formIsValid = true;
      seterrorstate("");
    }
    return formIsValid;
  }
  function validateCity() {
    let formIsValid = false;
    if (!selectedCity) {
      formIsValid = false;
      seterrorcity("*Select your city.");
    } else if (typeof cityId === "undefined") {
      formIsValid = false;
      seterrorcity("*Select your city.");
    } else if (cityId === "0") {
      formIsValid = false;
      seterrorcity("*Select your city.");
    } else {
      formIsValid = true;
      seterrorcity("");
    }
    return formIsValid;
  }
  // function validatestate() {
  //   let formIsValid = false;
  //   if (!stateId) {
  //     formIsValid = false;
  //     seterrorstate("*Select your state.");
  //   } else if (typeof stateId === "undefined") {
  //     formIsValid = false;
  //     seterrorstate("*Select your state.");
  //   } else if (stateId === "0") {
  //     formIsValid = false;
  //     seterrorstate("*Select your state.");
  //   } else {
  //     formIsValid = true;
  //     seterrorstate("");
  //   }
  //   return formIsValid;
  // }
  // function validatecity() {
  //   let formIsValid = false;
  //   if (!cityId) {
  //     formIsValid = false;
  //     seterrorcity("*Select your city.");
  //   } else if (typeof cityId === "undefined") {
  //     formIsValid = false;
  //     seterrorcity("*Select your city.");
  //   } else if (cityId === "0") {
  //     formIsValid = false;
  //     seterrorcity("*Select your city.");
  //   } else {
  //     formIsValid = true;
  //     seterrorcity("");
  //   }
  //   return formIsValid;
  // }
  function validateauthorized_person() {
    let formIsValid = false;
    if (!data["authorized_person"]) {
      formIsValid = false;
      seterrorauthorized_person("*Enter company CEO name.");
    } else if (typeof data["authorized_person"] === "undefined") {
      formIsValid = false;
      seterrorauthorized_person("*Enter company CEO name.");
    } else if (!data["authorized_person"].match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
      formIsValid = false;
      seterrorauthorized_person("*Please enter Alphabet characters only.");
    } else {
      formIsValid = true;
      seterrorauthorized_person("");
    }

    return formIsValid;
  }
  function validateindustry() {
    let formIsValid = false;
    if (!data["industry"]) {
      formIsValid = false;
      seterrorindustry("*Select your industry.");
    } else if (typeof data["industry"] === "undefined") {
      formIsValid = false;
      seterrorindustry("*Select your industry.");
    } else if (data["industry"] === "0") {
      formIsValid = false;
      seterrorindustry("*Select your industry.");
    } else {
      formIsValid = true;
      seterrorindustry("");
    }
    return formIsValid;
  }
  // function validateownership_type() {
  //   let formIsValid = false;
  //   if (!data["ownership_type"]) {
  //     formIsValid = false;
  //     seterrorownership_type("*Select your ownership type.");
  //   } else if (typeof data["ownership_type"] === "undefined") {
  //     formIsValid = false;
  //     seterrorownership_type("*Select your ownership type.");
  //   } else if (data["ownership_type"] === "0") {
  //     formIsValid = false;
  //     seterrorownership_type("*Select your ownership type.");
  //   } else {
  //     formIsValid = true;
  //     seterrorownership_type("");
  //   }
  //   return formIsValid;
  // }
  // function validatesize() {
  //   let formIsValid = false;
  //   if (!data["size"]) {
  //     formIsValid = false;
  //     seterrorsize("*Select your company size.");
  //   } else if (typeof data["size"] === "undefined") {
  //     formIsValid = false;
  //     seterrorsize("*Select your company size.");
  //   } else if (data["size"] === "0") {
  //     formIsValid = false;
  //     seterrorsize("*Select your company size.");
  //   } else {
  //     formIsValid = true;
  //     seterrorsize("");
  //   }
  //   return formIsValid;
  // }
  // function validateemployer_details() {
  //   let formIsValid = false;
  //   if (!data["employer_details"]) {
  //     formIsValid = false;
  //     seterroremployer_details("*Enter company details.");
  //   } else if (typeof data["employer_details"] === "undefined") {
  //     formIsValid = false;
  //     seterroremployer_details("*Enter company details.");
  //   } else {
  //     formIsValid = true;
  //     seterroremployer_details("");
  //   }
  //   return formIsValid;
  // }
  function validateauthorized_mobile() {
    // const currentYear = new Date().getFullYear();
    let formIsValid = false;
    if (!data["authorized_mobile"]) {
      formIsValid = false;
      seterrorauthorized_mobile("*Enter Mobile Number.");
    } else if (typeof data["authorized_mobile"] === "undefined") {
      formIsValid = false;
      seterrorauthorized_mobile("*Enter established year.");
    }
    //  else if (Number(data["authorized_mobile"]) > Number(currentYear)) {
    //   formIsValid = false;
    //   seterrorauthorized_mobile(
    //     "*Established year should not be greater than current year."
    //   );
    // } 
    else {
      formIsValid = true;
      seterrorauthorized_mobile("");
    }
    return formIsValid;
  }
  // function validateabout_us() {
  //   let formIsValid = false;
  //   if (!data["about_us"]) {
  //     formIsValid = false;
  //     seterrorabout_us("*Enter company about.");
  //   } else if (typeof data["about_us"] === "undefined") {
  //     formIsValid = false;
  //     seterrorabout_us("*Enter company about.");
  //   } else {
  //     formIsValid = true;
  //     seterrorabout_us("");
  //   }
  //   return formIsValid;
  // }
  function validatepincode() {
    let formIsValid = false;
    if (!data["pincode"]) {
      formIsValid = false;
      seterrorpincode("*Enter company pincode.");
    } else if (typeof data["pincode"] === "undefined") {
      formIsValid = false;
      seterrorpincode("*Enter company pincode.");
    } else {
      formIsValid = true;
      seterrorpincode("");
    }
    return formIsValid;
  }
  // function validateno_of_offices() {
  //   let formIsValid = false;
  //   if (!data["no_of_offices"]) {
  //     formIsValid = false;
  //     seterrorno_of_offices("*Enter company no. of offices.");
  //   } else if (typeof data["no_of_offices"] === "undefined") {
  //     formIsValid = false;
  //     seterrorno_of_offices("*Enter company no. of offices.");
  //   } else {
  //     formIsValid = true;
  //     seterrorno_of_offices("");
  //   }
  //   return formIsValid;
  // }
  function validateaddress() {
    let formIsValid = false;
    if (!data["address"]) {
      formIsValid = false;
      seterroraddress("*Enter company details.");
    } else if (typeof data["address"] === "undefined") {
      formIsValid = false;
      seterroraddress("*Enter company details.");
    } else {
      formIsValid = true;
      seterroraddress("");
    }
    return formIsValid;
  }
  // function validateaddress() {
  //   let pattern = /^\d{10}$/;
  //   let formIsValid = false;
  //   if (!data["address"]) {
  //     formIsValid = false;
  //     seterroraddress("*Enter company address no.");
  //   } else if (typeof data["address"] === "undefined") {
  //     formIsValid = false;
  //     seterroraddress("*Enter company address no.");
  //   } else if (!pattern.test(data["address"])) {
  //     formIsValid = false;
  //     seterroraddress("*Please enter exact 10 digits only.");
  //   } else {
  //     formIsValid = true;
  //     seterroraddress("");
  //   }
  //   return formIsValid;
  // }
  function validatewebsite() {
    let formIsValid = false;
    // if (!data["website"]) {
    //   formIsValid = false;
    //   seterrorwebsite("*Enter company website.");
    // } else 
    // if (typeof data["website"] === "undefined") {
    //   formIsValid = false;
    //   seterrorwebsite("*Enter company website.");
    // } else
    if (
      !data["website"].match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      )
    ) {
      formIsValid = false;
      seterrorwebsite("*Please enter valid website.");
    } else {
      formIsValid = true;
      seterrorwebsite("");
    }
    return formIsValid;
  }
  // function validatestatus() {
  //   let formIsValid = false;
  //   if (data["status"] === "0") {
  //     formIsValid = false;
  //     seterrorstatus("*Select your status.");
  //   } else if (typeof data["status"] === "undefined") {
  //     formIsValid = false;
  //     seterrorstatus("*Select your status.");
  //   } else {
  //     formIsValid = true;
  //     seterrorstatus("");
  //   }
  //   return formIsValid;
  // }
  // function validateis_featured() {
  //   let formIsValid = false;
  //   if (typeof data["is_featured"] === "undefined") {
  //     formIsValid = false;
  //     seterroris_featured("*Select whether company is featured or not.");
  //   } else {
  //     formIsValid = true;
  //     seterroris_featured("");
  //   }
  //   return formIsValid;
  // }
  // function validatefacebook_url() {
  //   let formIsValid = false;
  //   if (!data["facebook_url"]) {
  //     formIsValid = true;
  //     seterrorfacebook_url("");
  //   } else if (typeof data["facebook_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrorfacebook_url("");
  //   } else if (!data["facebook_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrorfacebook_url("*Please enter valid facebook URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrorfacebook_url("");
  //   }
  //   return formIsValid;
  // }
  // function validatetwitter_url() {
  //   let formIsValid = false;
  //   if (!data["twitter_url"]) {
  //     formIsValid = true;
  //     seterrortwitter_url("");
  //   } else if (typeof data["twitter_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrortwitter_url("");
  //   } else if (!data["twitter_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrortwitter_url("*Please enter valid twitter URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrortwitter_url("");
  //   }
  //   return formIsValid;
  // }
  // function validatelinkedin_url() {
  //   let formIsValid = false;
  //   if (!data["linkedin_url"]) {
  //     formIsValid = true;
  //     seterrorlinkedin_url("");
  //   } else if (typeof data["linkedin_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrorlinkedin_url("");
  //   } else if (!data["linkedin_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrorlinkedin_url("*Please enter valid linkedin URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrorlinkedin_url("");
  //   }
  //   return formIsValid;
  // }
  // function validategoogle_plus_url() {
  //   let formIsValid = false;
  //   if (!data["google_plus_url"]) {
  //     formIsValid = true;
  //     seterrorgoogle_plus_url("");
  //   } else if (typeof data["google_plus_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrorgoogle_plus_url("");
  //   } else if (!data["google_plus_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrorgoogle_plus_url("*Please enter valid google plus URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrorgoogle_plus_url("");
  //   }
  //   return formIsValid;
  // }
  // function validatepinterest_url() {
  //   let formIsValid = false;
  //   if (!data["pinterest_url"]) {
  //     formIsValid = true;
  //     seterrorpinterest_url("");
  //   } else if (typeof data["pinterest_url"] === "undefined") {
  //     formIsValid = true;
  //     seterrorpinterest_url("");
  //   } else if (!data["pinterest_url"].match(
  //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //   )) {
  //     formIsValid = false;
  //     seterrorpinterest_url("*Please enter valid pinterest URL.");
  //   } else {
  //     formIsValid = true;
  //     seterrorpinterest_url("");
  //   }
  //   return formIsValid;
  // }
  function validateForm() {
    let name = validatename();
    let email = validateemail();
    // let country = validatecountry();
    // let website = validatewebsite()
    let state = validateState();
    let city = validateCity();
    let authorized_person = validateauthorized_person();
    let industry = validateindustry();
    // let ownership_type = validateownership_type();
    // let size = validatesize();
    // let employer_details = validateemployer_details();
    let authorized_mobile = validateauthorized_mobile();
    // let about_us = validateabout_us();
    let pincode = validatepincode();
    // let no_of_offices = validateno_of_offices();
    let address = validateaddress();
    // let website = validatewebsite();
    // let status = validatestatus();
    // let is_featured = validateis_featured();
    // let facebook_url = validatefacebook_url();
    // let twitter_url = validatetwitter_url();
    // let linkedin_url = validatelinkedin_url();
    // let google_plus_url = validategoogle_plus_url();
    // let pinterest_url = validatepinterest_url();
    let valid =
      name &&
      email &&
      // country &&
      // website &&
      state &&
      city &&
      authorized_person &&
      industry &&
      // ownership_type &&
      // size &&
      // employer_details &&
      authorized_mobile &&
      // about_us &&
      pincode &&
      // no_of_offices &&
      address
    // website &&
    // status &&
    // is_featured &&
    // facebook_url &&
    // twitter_url &&
    // linkedin_url &&
    // google_plus_url &&
    // pinterest_url;
    return valid;
  }

  function submitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      if (certificate) {
        props.requestEmpProfile({
          id: emp.id,
          token: emp.token,
          data: {
            name: data.name,
            email: data.email,
            // country: countryId,
            state: selectedState,
            website: data.website,
            city: selectedCity,
            authorized_person: data.authorized_person,
            industry: data.industry,
            // ownership_type: data.ownership_type,
            // size: data.size,
            employer_details: data.employer_details,
            authorized_mobile: data.authorized_mobile,
            // about_us: data.about_us,
            pincode: data.pincode,
            // no_of_offices: data.no_of_offices,
            address: data.address,
            // website: data.website,
            // status: data.status,
            // is_featured: data.is_featured,
            // facebook_url: data.facebook_url,
            // twitter_url: data.twitter_url,
            // linkedin_url: data.linkedin_url,
            // google_plus_url: data.google_plus_url,
            // pinterest_url: data.pinterest_url,
          },
        });
        setError(false)
      } else {
        alert("Please Upload Company Registration Certificate")
        setError(true)
      }
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (error) {
      if (errorname) {
        document.getElementById("name").focus();
      } else if (erroremail) {
        document.getElementById("email").focus();
      } else if (erroraddress) {
        document.getElementById("address").focus();
      } else if (errorwebsite) {
        document.getElementById("website").focus();
      }
      //  else if (errorstatus) {
      //   document.getElementById("status").focus();
      // } else if (erroris_featured) {
      //   document.getElementById("yes").focus();
      // }
      else if (errorauthorized_person) {
        document.getElementById("authorized_person").focus();
      } else if (errorauthorized_mobile) {
        document.getElementById("authorized_mobile").focus();
      } else if (errorindustry) {
        document.getElementById("industry").focus();
      }
      // else if (errorownership_type) {
      //   document.getElementById("ownership_type").focus();
      // } else if (errorsize) {
      //   document.getElementById("size").focus();
      // } else if (errorno_of_offices) {
      //   document.getElementById("no_of_offices").focus();
      // } else if (erroremployer_details) {
      //   document.getElementById("employer_details").focus();
      // } 
      // else if (errorabout_us) {
      //   document.getElementById("about_us").focus();
      // } else if (errorcountry) {
      //   document.getElementById("country").focus();
      // }
      else if (errorstate) {
        document.getElementById("state").focus();
      } else if (errorcity) {
        document.getElementById("city").focus();
      }
      //  else if (errorpincode) {
      //   document.getElementById("pincode").focus();
      // } else if (errorfacebook_url) {
      //   document.getElementById("facebook_url").focus();
      // } else if (errortwitter_url) {
      //   document.getElementById("twitter_url").focus();
      // } else if (errorlinkedin_url) {
      //   document.getElementById("linkedin_url").focus();
      // } else if (errorgoogle_plus_url) {
      //   document.getElementById("google_plus_url").focus();
      // } else if (errorpinterest_url) {
      //   document.getElementById("pinterest_url").focus();
      // }
      setError(false)
    }
  }, [error]);

  useEffect(() => {
    let empProfileData = props.employee.empProfileData;
    if (empProfileData !== undefined) {
      if (empProfileData?.data?.status == "success") {
        Swal.fire(
          "Good job!",
          "Company profile updated Successfully.",
          "success"
        );
        props.employee.empProfileData = undefined;
        props.requestGetEmp({
          id: emp.id,
          token: emp.token,
        });
        if (localStorage.getItem("link2")) {
          navigate(localStorage.getItem("link2"));
        }
      } else {
        Swal.fire("Error!", `Something went wrong while updating profile.`, "error");
        props.employee.empProfileData = undefined;
        props.requestGetEmp({
          id: emp.id,
          token: emp.token,
        });
      }
    }
  }, [props.employee.empProfileData]);



  return (
    <>
      <Header />
      <Breadcrumbs title="Company Profile" />
      <div class="resume section">
        <div class="container">
          <div class="resume-inner">
            <div class="row">
              <ManageAccount name="Settings" />

              <div class="col-lg-8 col-12">
                <div class="inner-content">
                  <div class="job-post ">
                    {/* <div class="container"> */}
                    <div class="row">
                      {/* <div class="col-lg-10 offset-lg-1 col-12"> */}
                      <div
                        class="job-information"
                        style={{ border: "0px", padding: "0px 10px" }}
                      >
                        <form class="forms-sample" onSubmit={submitForm}>
                          <div class="row">
                            <h3 class="title">Basic Information</h3>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Company Name*</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="name"
                                  id="name"
                                  value={data.name}
                                  onBlur={validatename}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorname && (
                                  <div style={mystyle}>{errorname}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Company Email*</label>
                                <input
                                  class="form-control"
                                  type="email"
                                  name="email"
                                  id="email"
                                  value={data.email}
                                  onBlur={validateemail}
                                  onChange={onChangeData}
                                  placeholder=""
                                // disabled
                                />
                                {erroremail && (
                                  <div style={mystyle}>{erroremail}</div>
                                )}
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Company Website</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="website"
                                  id="website"
                                  value={data.website}
                                  onBlur={validatewebsite}
                                  onChange={onChangeData}
                                  placeholder="Enter Company Website"
                                />
                                {errorwebsite && (
                                  <div style={mystyle}>{errorwebsite}</div>
                                )}
                              </div>
                            </div>
                            {/* <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Status</label>
                                <select
                                  class="select"
                                  name="status"
                                  id="status"
                                  value={data.status}
                                  onBlur={validatestatus}
                                  onChange={onChangeData}
                                >
                                  <option value="0">Select Status</option>
                                  <option value="1">Developed</option>
                                  <option value="2">Developing</option>
                                </select>

                                {errorstatus && (
                                  <div style={mystyle}>{errorstatus}</div>
                                )}
                              </div>
                            </div> 
                          <div class="col-lg-6 col-md-6">
                              <div style={{ color: "black" }}>
                                <label for="gender" class="label">
                                  Is Featured
                                </label>
                                <br />
                                <br />
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    style={{ margin: "0px" }}
                                    id="yes"
                                    name="is_featured"
                                    value="1"
                                    onBlur={validateis_featured}
                                    checked={data.is_featured === 1}
                                    onChange={onChangeData}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="inlineRadio1"
                                  >
                                    Yes
                                  </label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    style={{ margin: "0px" }}
                                    id="no"
                                    name="is_featured"
                                    value="0"
                                    onBlur={validateis_featured}
                                    checked={data.is_featured === 0}
                                    onChange={onChangeData}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="inlineRadio2"
                                  >
                                    No
                                  </label>
                                </div>
                                {erroris_featured && (
                                  <div style={mystyle}>{erroris_featured}</div>
                                )}
                              </div>
                                </div> */}
                            <h3 class="title">Company Profile</h3>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Name of Authorized Person</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="authorized_person"
                                  id="authorized_person"
                                  value={data.authorized_person}
                                  onBlur={validateauthorized_person}
                                  onChange={onChangeData}
                                  placeholder="Enter Name of Authorized Person"
                                />
                                {errorauthorized_person && (
                                  <div style={mystyle}>{errorauthorized_person}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Mobile of Authorized Person</label>
                                <input
                                  class="form-control"
                                  type="number"
                                  name="authorized_mobile"
                                  id="authorized_mobile"
                                  value={data.authorized_mobile}
                                  onBlur={validateauthorized_mobile}
                                  onChange={onChangeData}
                                  placeholder="Enter Mobile Number of Authorized Person"
                                />
                                {errorauthorized_mobile && (
                                  <div style={mystyle}>
                                    {errorauthorized_mobile}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Industry</label>
                                <select
                                  class="select"
                                  name="industry"
                                  id="industry"
                                  value={data.industry}
                                  onBlur={validateindustry}
                                  onChange={onChangeData}
                                >
                                  <option value="0">Select Industry</option>
                                  {categories.map((option) => {
                                    if (option.disable === "yes") {
                                      return (
                                        <option key={option._id} value="0" style={{ color: "#964B00", fontSize: "20px" }} disabled>{option.name}</option>
                                      )
                                    } else {
                                      return (
                                        <option key={option._id} value={option._id}>{option.name}</option>
                                      )
                                    }
                                  })}
                                </select>
                                {errorindustry && (
                                  <div style={mystyle}>{errorindustry}</div>
                                )}
                              </div>
                            </div>
                            {/* <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Ownership Type</label>
                                <select
                                  class="select"
                                  name="ownership_type"
                                  id="ownership_type"
                                  value={data.ownership_type}
                                  onBlur={validateownership_type}
                                  onChange={onChangeData}
                                >
                                  <option value="0">
                                    Select Ownership Type
                                  </option>
                                  {owner.map((option) => (
                                    <option value={option.id}>
                                      {option.name}
                                    </option>
                                  ))}
                                </select>
                                {errorownership_type && (
                                  <div style={mystyle}>
                                    {errorownership_type}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Size of Company</label>
                                <select
                                  class="select"
                                  name="size"
                                  id="size"
                                  value={data.size}
                                  onBlur={validatesize}
                                  onChange={onChangeData}
                                >
                                  <option value="0">Select Company Size</option>
                                  {size.map((option) => (
                                    <option value={option.id}>
                                      {option.size}
                                    </option>
                                  ))}
                                </select>
                                {errorsize && (
                                  <div style={mystyle}>{errorsize}</div>
                                )}
                              </div>
                            </div> 
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>No. of offices</label>
                                <input
                                  class="form-control"
                                  type="number"
                                  name="no_of_offices"
                                  id="no_of_offices"
                                  value={data.no_of_offices}
                                  onBlur={validateno_of_offices}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorno_of_offices && (
                                  <div style={mystyle}>
                                    {errorno_of_offices}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Company Details</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  name="employer_details"
                                  id="employer_details"
                                  value={data.employer_details}
                                  onChange={onChangeData}
                                  onBlur={validateemployer_details}
                                  placeholder=""
                                ></textarea>
                                {erroremployer_details && (
                                  <div style={mystyle}>
                                    {erroremployer_details}
                                  </div>
                                )}
                              </div>
                            </div> 
                             <div class="col-lg-12">
                              <div class="form-group">
                                <label>About Us</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  name="about_us"
                                  id="about_us"
                                  value={data.about_us}
                                  onChange={onChangeData}
                                  onBlur={validateabout_us}
                                  placeholder=""
                                ></textarea>
                                {errorabout_us && (
                                  <div style={mystyle}>{errorabout_us}</div>
                                )}
                              </div>
                            </div> 
                             <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Country</label>
                                <select
                                  class="select"
                                  name="country"
                                  id="country"
                                  value={countryId}
                                  onBlur={validatecountry}
                                  onChange={onChangeCountry}
                                >
                                  <option value="0">Select Country</option>
                                  {countries.map((option) => (
                                    <option value={option.id}>
                                      {option.name}
                                    </option>
                                  ))}
                                </select>
                                {errorcountry && (
                                  <div style={mystyle}>{errorcountry}</div>
                                )}
                              </div>
                            </div>  */}

                            <h3 class="title">Address Information</h3>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Address*</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="address"
                                  id="address"
                                  value={data.address}
                                  onBlur={validateaddress}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {erroraddress && (
                                  <div style={mystyle}>{erroraddress}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>State</label>
                                <Select
                                  placeholder="Select State"
                                  options={statesOfIndia}
                                  getOptionLabel={(options) => {
                                    return options["name"];
                                  }}
                                  getOptionValue={(options) => {
                                    return options["name"];
                                  }}
                                  value={selectedState || data.state}
                                  onChange={(item) => {
                                    setSelectedState(item);
                                    setSelectedCity(null);
                                  }}
                                  styles={selectStyles}
                                  menuPortalTarget={document.body}
                                  id="state"
                                  onBlur={validateState}
                                />
                                {errorstate && (
                                  <div style={mystyle}>{errorstate}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>City</label>
                                <Select
                                  placeholder="Select City"
                                  options={City.getCitiesOfState(
                                    selectedState?.countryCode,
                                    selectedState?.isoCode
                                  )}
                                  getOptionLabel={(options) => {
                                    return options["name"];
                                  }}
                                  getOptionValue={(options) => {
                                    return options["name"];
                                  }}
                                  value={selectedCity}
                                  onChange={(item) => {
                                    setSelectedCity(item);
                                  }}
                                  styles={selectStyles}
                                  menuPortalTarget={document.body}
                                  id="city"
                                  onBlur={validateCity}
                                />
                                {errorcity && (
                                  <div style={mystyle}>{errorcity}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>pincode</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="pincode"
                                  id="pincode"
                                  value={data.pincode}
                                  onBlur={validatepincode}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorpincode && (
                                  <div style={mystyle}>{errorpincode}</div>
                                )}
                              </div>
                            </div>
                            <div>
                              {certificate ? (
                                <div >
                                  <label>
                                    Change Company Registration Certificate:
                                  </label>&nbsp;&nbsp;
                                  <text style={{ color: "green" }}>Uploaded</text>
                                  <br />
                                  <br />
                                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleCertificateChange} />
                                  <button type="submit"
                                    class="btn btn-primary me-2"
                                    style={{
                                      color: "white",
                                      width: "200px",
                                      height: "50px",
                                    }} onClick={uploadfile}>Upload Certificate</button>
                                </div>
                              ) : (
                                <div>
                                  <label>
                                    Upload Company Registration Certificate:
                                  </label>
                                  <br />
                                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleCertificateChange} />

                                  <button type="submit"
                                    class="btn btn-primary me-2"
                                    style={{
                                      color: "white",
                                      width: "200px",
                                      height: "50px",
                                    }} onClick={uploadfile}>Upload Certificate</button>
                                </div>
                              )
                              }
                            </div>
                            <br/>
                            {data.status ? (
                              <>
                              <text><b>Current Status :</b> {data.status}</text>
                              <text><b>Reason :</b> {data.reason}</text>
                              </>
                            ) : (
                              <b>Current Status : Please Wait</b>
                            )}
                            {/*  <h3 class="title">Social Links</h3>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Facebook URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="facebook_url"
                                  id="facebook_url"
                                  value={data.facebook_url}
                                  onBlur={validatefacebook_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorfacebook_url && (
                                  <div style={mystyle}>{errorfacebook_url}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Twitter URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="twitter_url"
                                  id="twitter_url"
                                  value={data.twitter_url}
                                  onBlur={validatetwitter_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errortwitter_url && (
                                  <div style={mystyle}>{errortwitter_url}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Linkedin URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="linkedin_url"
                                  id="linkedin_url"
                                  value={data.linkedin_url}
                                  onBlur={validatelinkedin_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorlinkedin_url && (
                                  <div style={mystyle}>{errorlinkedin_url}</div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Google Plus URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="google_plus_url"
                                  id="google_plus_url"
                                  value={data.google_plus_url}
                                  onBlur={validategoogle_plus_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorgoogle_plus_url && (
                                  <div style={mystyle}>
                                    {errorgoogle_plus_url}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="form-group">
                                <label>Pintrest URL</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="pinterest_url"
                                  id="pinterest_url"
                                  value={data.pinterest_url}
                                  onBlur={validatepinterest_url}
                                  onChange={onChangeData}
                                  placeholder=""
                                />
                                {errorpinterest_url && (
                                  <div style={mystyle}>
                                    {errorpinterest_url}
                                  </div>
                                )}
                              </div>
                            </div>  */}
                          </div>
                          <br />

                          <input
                            type="submit"
                            class="btn btn-primary me-2"
                            style={{
                              color: "white",
                              width: "150px",
                              height: "50px",
                            }}
                            value="Save"
                          />
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
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return { employee: state.employee, candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestEmpLogin,
      requestFormField,
      requestEmpProfile,
      requestCountry,
      requestState,
      requestCity,
      requestGetEmp,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profie);
