import { useState } from "react";
import frame from '../assets/images/frame.png';
import image1 from '../assets/images/image.png';
import { Link } from "react-router-dom";
import { FaStarOfLife } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";

function LogIn() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData, setFormData] = useState({
        accountType:'Student',
        email: "",
        password: ""
    });

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    function buttonHandler(value){
        setFormData(prevData => ({
            ...prevData,
            'accountType': value
        }));
    }

    const HandleSubmitUser=(event) =>{
        event.preventDefault();
        dispatch(login(formData, navigate))
    }

    return (<div>
        <div className="w-10/12 mx-auto flex flex-row mt-10 justify-between pt-16">
            <div className="flex flex-col gap-9 w-[36%]">
                <div>
                    <p className="font-semibold text-3xl text-white">Welcome Back</p>
                    <p className="text-richblack-200 text-[16px]">Build skills for today, tomorrow, and beyond. <span className="font-edu-sa text-blue-100">Education to future-proof your career.</span></p>
                </div>
                <div className="flex flex-row items center bg-richblack-800 px-1 rounded-full mb-4 py-1 gap-4 w-[54%]">
                    <button
                        className={`mr-2 p-2 ${formData.accountType === "Student" ? "bg-richblack-900 text-white" : "text-richblack-200"} rounded-full px-5`}
                        onClick={()=>buttonHandler('Student')}
                    >
                        Student
                    </button>
                    <button
                        className={`p-2 ${formData.accountType === "Instructor" ? "bg-richblack-900 text-white" : "text-richblack-200"} rounded-full px-5`}
                        onClick={()=>buttonHandler('Instructor')}
                    >
                        Instructor
                    </button>
                </div>
                <form className="" onSubmit={HandleSubmitUser}>
                    <div className="">
                        <div className="flex flex-row gap-1">
                            <p className="text-white text-[14px]">Email Address</p>
                            <FaStarOfLife className="text-[red] text-[7px]"/>
                        </div>
                        <input
                            className="w-[100%] h-12 bg-richblack-800 rounded-md px-6 mt-2 mb-6 text-[17px] text-richblack-300"
                            placeholder="Enter email address"
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            value={formData.username}
                            required
                        ></input>
                    </div>
                    <div>
                        <div className="flex flex-row gap-1">
                            <p className="text-white text-[14px]">Password</p>
                            <FaStarOfLife className="text-[red] text-[7px]"/>
                        </div>
                        <input
                            className="w-[100%] h-12 bg-richblack-800 rounded-md px-6 mt-2 mb-1 text-[17px] text-richblack-300"
                            placeholder="Enter Password"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            value={formData.password}
                            required
                        ></input>
                        <div className="flex justify-end">
                            <Link className="text-blue-100" to='/forgot-password'>
                                Forget password
                            </Link>
                        </div>
                    </div>
                    <div className="mt-12">
                        <button
                            className="w-[100%] text-center text-[18px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative">
                <img src={frame} alt="Frame" />
                <div className="w-[100%] absolute top-[-4%] right-[4%]">
                    <img src={image1} alt="Image1" />
                </div>
            </div>
        </div>
    </div>);
}

export default LogIn;
