import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import { useNavigate } from "react-router-dom";


function Empverify() {
    const navigate = useNavigate()
    const [otpCode, setOtpCode] = useState("");
    const [email, setEmail] = useState("");

    const onChangeData = (e) => {
        const { name, value } = e.target;
        if (name === "otpCode") {
            setOtpCode(value);
        } else if (name === "email") {
            setEmail(value);
        }
    };
    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(email);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    const onVerifyOTP = async (e) => {
        e.preventDefault();

        try {
            // Confirm the user's email address with the OTP code
            const confirm = await Auth.confirmSignUp(email, otpCode);

            // Registration and email verification successful
            alert('Registration and email verification successful');
            if (confirm) {
                navigate('/emplogin')
            }
        } catch (error) {
            // Handle OTP verification error
            console.log('OTP verification error', error);
        }
    };

    return (
        <>
            <div class=" modal form-modal" style={{ display: "block" }}>
                <div class="modal-dialog max-width-px-840 position-relative"></div>
                <div class="login-modal-main">
                    <div class="row no-gutters">
                        <div class="col-lg-4 col-md-3"></div>
                        <div class="col-lg-4 col-md-6">
                            <div class="row">
                                <div class="heading">
                                    <h3>OTP Verification</h3>
                                    <p>
                                        Log in to continue your account <br /> and create new jobs.
                                    </p>
                                    <br />
                                    <br />
                                </div>

                                <form onSubmit={onVerifyOTP}>
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
                                        <label htmlFor="email" className="label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={onChangeData}
                                        />
                                    </div>
                                    <div className="form-group mb-8 button">
                                        <button className="btn" type="submit">
                                            Verify OTP
                                        </button>

                                    </div>
                                </form>
                                <form onSubmit={resendConfirmationCode}>
                                    <button className="btn" type="submit">Resend</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Empverify;

