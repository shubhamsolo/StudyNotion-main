import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaStarOfLife } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const loading = false;
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <div className="flex justify-center items-center text-richblack-300 mt-[10%]">
            {
                loading ? (
                    <div>Loading ...</div>
                ) : (
                    <div className="w-[400px] flex flex-col gap-6">
                        <h1 className="flex items-center text-3xl font-semibold text-white">
                            {
                                !emailSent ? "Reset your Password" : "Check Your Email"
                            }
                        </h1>

                        <p>
                            {
                                !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                    : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col">
                            {
                                !emailSent && (
                                    <label>
                                        <div className="flex flex-row gap-1">
                                            <p className="text-white text-[14px]">Email Address</p>
                                            <FaStarOfLife className="text-[red] text-[6px]" />
                                        </div>
                                        <input
                                            className="w-[100%] h-10 bg-richblack-800 rounded-md px-6 mt-2 mb-6 text-[16px] text-white"
                                            placeholder="Enter email address"
                                            type="email"
                                            name="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                        ></input>
                                    </label>
                                )
                            }

                            <div className="mt-8">
                                <button
                                    className="w-[100%] text-center text-[16px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black"
                                    type="submit"
                                >
                                    {
                                        !emailSent ? "Reset Password" : "Resend Email"
                                    }
                                </button>
                            </div>
                        </form>
                        <div>
                            <Link to='/login'>
                                <div className="flex flex-row items-center gap-2">
                                    <FaArrowLeft/>
                                    <p>Back to Login</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword;