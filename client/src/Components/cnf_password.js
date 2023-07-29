import { Auth } from "aws-amplify";
import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
/**
* @author
* @function 
**/

export const Cnf_Password = (props) => {
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
        const forget = await Auth.forgotPasswordSubmit(email, code, new_password)
        if (forget) {
            alert("Your Password Forget Succesfull")
            navigate("/login")
        }

    }
    return (
        <>
            <div
                class=" modal form-modal"
                style={{ display: "block", height: "100%", overflow: "auto" }}
            >
                <div class="modal-dialog max-width-px-840 position-relative"></div>
                <div class="login-modal-main">
                    <div class="row no-gutters">
                        <div class="col-lg-4 col-md-3"></div>
                        <div class="col-lg-4 col-md-6">
                            <div class="row">
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

                                <div class="form-group mb-8 button">
                                    <div><button class="btn" onClick={CheckPassword}>Submit</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

