import { Auth } from "aws-amplify";
import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
/**
* @author
* @function 
**/

export const EmpCnf_Password = (props) => {
    const [otpCode, setOtpCode] = useState('')
    const [data, setData] = useState({});
    const params = useParams()
const navigate = useNavigate()

    function onChangeData(e) {
        if (e.target.name === "otpCode") {
            setOtpCode(e.target.value);
        } else {
            setData((data) => ({
                ...data,
                [e.target.name]: e.target.value,
            }));
        }
    }

    async function CheckPassword() {
        const email = params.id
        const code = otpCode
        const new_password = data.newPassword
        console.log(new_password);
        const forget = await Auth.forgotPasswordSubmit(email, code, new_password )
        if(forget){
            alert("Your Password Forget Succesfull")
            navigate("/emplogin")
        }

    }
    return (
        <div>
            {/* <form onSubmit={CheckPassword}> */}
                <div className="form-group">
                    <label htmlFor="otpCode" className="label">
                        Enter OTP Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter OTP Code"
                        id="otpCode"
                        name="otpCode"
                        value={otpCode}
                        onChange={onChangeData}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword" className="label">
                        Enter New Password
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter New Password"
                        id="newPassword"
                        name="newPassword"
                        value={data.newPassword}
                        onChange={onChangeData}
                    />
                </div>
                <div><button class="btn" onClick={CheckPassword}>Submit</button></div>
            {/* </form> */}
        </div>
    )
}

