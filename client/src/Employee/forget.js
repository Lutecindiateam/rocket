import { Auth } from 'aws-amplify';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
/**
* @author
* @function Forget_pass
**/
// sync function Forget_pass () {
//     await Auth.forgotPassword({username: data.email})
//    .then((data) => console.log(data))
//    .catch((err) => console.log(err));

//  // Collect confirmation code and new password, then
//  await Auth.forgotPasswordSubmit({username:data.email, code, new_password})
//    .then((data) => console.log(data))
//    .catch((err) => console.log(err));

//      }


export const EmpForget_pass = (props) => {
    const [otpCode, setOtpCode] = useState('')
    const [data, setData] = useState({});
    const navigate = useNavigate();

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

    async function Forget_pass() {
        try {
            const email = data.email
            const response = await Auth.forgotPassword(email);
            console.log(response);

            if (response) {
                console.log("hello");
                navigate(`/empconfirm/${data.email}`)
            }
        } catch (error) {
            console.log(error.message);
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
                                <div class="form-group">
                                    <label for="email" class="label">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        placeholder="example@gmail.com"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={onChangeData}
                                    // onBlur={validateEmail}
                                    />
                                    {/* {erroremail && <div style={mystyle}>{erroremail}</div>} */}
                                </div>
                              
                                <div class="form-group mb-8 button">
                                    <button class="btn " onClick={Forget_pass}>forget</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
