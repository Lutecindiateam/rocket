import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
// import sendBird from './sendbirdConnection'
import { DartThemeProvider } from "./Components/DarkThemeContext";
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports'
Amplify.configure(awsExports)


{/* <sendBird /> */}

axios.defaults.baseURL = `${process.env.REACT_APP_API_HOST}`
// axios.defaults.baseURL = "/api"

ReactDOM.render(
  <React.StrictMode>
    <DartThemeProvider>
    <App />
    </DartThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
