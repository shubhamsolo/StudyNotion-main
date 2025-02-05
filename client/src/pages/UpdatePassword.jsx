import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaStarOfLife } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getPasswordReset } from "../services/operations/authAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdatePassword() {
    const location=useLocation();
    const [formData, setFormData] = useState({
        password:'',
        confirmPassword:''
    });
    const loading = false;
    const dispatch=useDispatch();

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(formData.password===formData.confirmPassword){
            const token=location.pathname.split('/').at(-1);
            dispatch(getPasswordReset(formData.password, token))
            return ;
        }
        toast.alert('Password did not match');
    }

    return (
        <div className="flex justify-center items-center text-richblack-300 mt-[10%]">
            {
                loading ? (
                    <div>Loading ...</div>
                ) : (
                    <div className="w-[400px] flex flex-col gap-6">
                        <h1 className="flex items-center text-3xl font-semibold text-white">
                            Choose Your Password
                        </h1>

                        <p>
                            Almost done. Enter your new password and you are all set.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <label>
                                <div className="flex flex-row gap-1">
                                    <p className="text-white text-[14px]">New Password</p>
                                    <FaStarOfLife className="text-[red] text-[6px]" />
                                </div>
                                <input
                                    className="w-[100%] h-10 bg-richblack-800 rounded-md px-6 mt-2 mb-6 text-[16px] text-white"
                                    placeholder="Enter password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                    value={formData.password}
                                    required
                                ></input>
                            </label>

                            <label>
                                <div className="flex flex-row gap-1">
                                    <p className="text-white text-[14px]">Confirm Password</p>
                                    <FaStarOfLife className="text-[red] text-[6px]" />
                                </div>
                                <input
                                    className="w-[100%] h-10 bg-richblack-800 rounded-md px-6 mt-2 mb-6 text-[16px] text-white"
                                    placeholder="Enter password"
                                    type="password"
                                    name="confirmPassword"
                                    onChange={changeHandler}
                                    value={formData.confirmPassword}
                                    required
                                ></input>
                            </label>
                                
                            

                            <div className="mt-8">
                                <button
                                    className="w-[100%] text-center text-[16px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black"
                                    type="submit"
                                >
                                    Reset Password
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

export default UpdatePassword;