import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import SendBird from "sendbird";
import { getMessaging, getToken } from 'firebase/messaging';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestLogin,requestEmpLogin, requestGetCandidate, requestGetEmp, } from "../Redux/actions";
import { useEffect, useState } from "react";
function App(props){
    const [user, setUSer] = useState({});
    const [emp, setEmp] = useState({});
    const [data,setData] = useState({})
  
    useEffect(() => {
      let logindata = props.candidate.logindata;
      if (logindata !== undefined) {
        if (logindata?.data?.status === "success") {
          setUSer(logindata.data.data);
          props.requestGetCandidate({
            id: logindata.data.data.id,
            token: logindata.data.data.token,
          });
        } 
      }
    }, [props.candidate.logindata]);

    useEffect(() => {
        let getcandidatedata = props.candidate.getcandidatedata;
        if (getcandidatedata !== undefined) {
          if (getcandidatedata?.data?.status == "success") {
            setData(getcandidatedata.data.data);
          }
        }
      }, [props.candidate.getcandidatedata]);
  
    useEffect(() => {
      let emplogindata = props.employee.emplogindata;
      if (emplogindata !== undefined) {
        if (emplogindata?.data?.status === "success") {
          setEmp(emplogindata.data.data);
          props.requestGetEmp({
            id: emplogindata.data.data.id,
            token: emplogindata.data.data.token,
          });
        } 
      }
    }, [props.employee.emplogindata]);

    useEffect(() => {
        let empdata = props.employee.empdata;
        if (empdata !== undefined) {
          if (empdata?.data?.status == "success") {
            setData(empdata.data.data);
          }
        }
      }, [props.employee.empdata]);

    // const firebaseConfig = {
    //     apiKey: "AIzaSyD8Mkt7IEJPF4jf5S974xgftQph4TWaD_I",
    //     authDomain: "job-portal-348803.firebaseapp.com",
    //     databaseURL: "https://job-portal-348803-default-rtdb.firebaseio.com/",
    //     projectId: "job-portal-348803",
    //     storageBucket: "job-portal-348803.appspot.com",
    //     messagingSenderId: "31060957964",
    //     appId: "1:31060957964:web:c3f62d163b5bdebc488729",
    //     measurementId: "G-8M788WG3HQ"
    //   };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      
      
      
      const messaging = getMessaging();
      
      const appId = '8EA8CBFD-7840-4E6D-8C51-9A8B1D2693D4';
      const userId = data.email;
      const vapidKey = 'BEtkC5A7mhaEZfa57KBUTAnfCY7bYYooFwigk3q006v1BE5eAXuSTKmOYegzBE-v6ZZofzlfnl4-BviS5aPOhPE';
      const sb = new SendBird({appId: appId});
      sb.connect(userId, nickname, (user, error) => {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
      
              getToken(messaging, {vapidKey: vapidKey})
              .then(currentToken => {
                if (currentToken) {
                  sb.registerGCMPushTokenForCurrentUser(currentToken, (response, error) => {
                    if(error) console.log(error);
                    console.log("Token Registered:", currentToken)
                  });
                }
              })
              .catch(err => {
                console.log('An error occurred while retrieving a token. ', err);
              });
          } else {
            console.log('Unable to get permission to notify.');
          }
       })
      })
}
const mapStateToProps = (state) => {
    return { candidate: state.candidate, employee: state.employee };
  };
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators({requestLogin,requestEmpLogin, requestGetCandidate, requestGetEmp,}, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);

