import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signup , sendOtp} from "../services/operations/authAPI";
import OTPInput from 'react-otp-input';

function VerifyEmail() {
    const navigate=useNavigate();
    const [otp, setOtp] = useState('');
    const {signupData, loading} = useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!signupData){
            navigate('/signup');
        }
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        const {accountType, firstName, lastName, email, contactNumber, password}=signupData;
        const userData={
            accountType, firstName, lastName, email, contactNumber, password, otp
        };
        dispatch(signup(userData, navigate));
    }

    return (
        <div className="flex justify-center items-center text-richblack-300 mt-[10%]">
            {
                loading ? (
                    <div>Loading ...</div>
                ) : (
                    <div className="w-[400px] flex flex-col gap-6">
                        <h1 className="flex items-center text-3xl font-semibold text-white">
                            Verify Email
                        </h1>

                        <p>
                            A verification code has been sent to you. Enter the code below
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col text-richblack-25">
                            <div className="text-white">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span className="w-[10px]"></span>}
                                    renderInput={(props)=>(<input {...props} placeholder="-" className="px-6 py-4 mr-2 ml-2 bg-richblack-700 rounded" />)}
                                />
                            </div>
                            
                            <div className="mt-8">
                                <button
                                    className="w-[100%] text-center text-[16px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black"
                                    type="submit"
                                >
                                    Verify Email
                                </button>
                            </div>
                        </form>
                        <div className="flex flex-row justify-between">
                            <Link to='/login'>
                                <div className="flex flex-row items-center gap-2">
                                    <FaArrowLeft/>
                                    <p>Back to Login</p>
                                </div>
                            </Link>

                            <button
                                onClick={()=>dispatch(sendOtp(signupData.email,navigate))}
                                className="flex flex-row items-center gap-2 text-blue-200">
                                <FaRegClock/>
                                <p>Resend it</p>
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail;