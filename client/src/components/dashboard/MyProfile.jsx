import React from "react";
import { LuClipboardEdit } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyProfile() {
    const {user}=useSelector((state)=>state.profile)

    const navigate = useNavigate();

    return (
        <div className="text-white mx-auto p-6 w-full pb-10">
            <div className="w-10/12 max-w-maxContent">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="flex flex-col gap-10">
            {/* Section 1 */}
            <div className="flex items-center justify-between  bg-richblack-800 p-10 rounded-2xl">
                <div className="flex items-center">
                    <img 
                        src={user?.image} 
                        alt={`profile-${user?.firstName}`} 
                        className="aspect-square w-[78px] rounded-full object-cover mr-4" 
                    />
                    <div>
                        <p className="text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
                        <p className="text-sm text-richblack-300">{user?.email}</p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate('/dashboard/settings')} 
                    className=" bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md "
                >   
                    <div className="flex gap-2 items-center">
                        <p>Edit</p>
                        <LuClipboardEdit />
                    </div>
                    
                </button>
            </div>

            {/* Section 2 */}
            <div className="  bg-richblack-800 p-10 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold">About</p>
                    <button 
                        onClick={() => navigate('/dashboard/settings')} 
                        className="ml-auto bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md "
                    >   
                        <div className="flex gap-2 items-center">
                            <p>Edit</p>
                            <LuClipboardEdit />
                        </div>
                        
                    </button>
                </div>
                <p className="text-sm text-richblack-300">{user?.profileDetails?.about || "Write something about yourself"}</p>
            </div>

            {/* Section 3 */}
            <div className=" bg-richblack-800 p-10 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold">Details</p>
                    <button 
                        onClick={() => navigate('/dashboard/settings')} 
                        className="ml-auto bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md "
                    >   
                        <div className="flex gap-2 items-center">
                            <p>Edit</p>
                            <LuClipboardEdit />
                        </div>
                        
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                        <p className="font-semibold">First Name</p>
                        <p className="text-richblack-300">{user?.firstName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Last Name</p>
                        <p className="text-richblack-300">{user?.lastName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-richblack-300">{user?.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Gender</p>
                        <p className="text-richblack-300">{user?.profileDetails?.gender || "Add gender"}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Phone Number</p>
                        <p className="text-richblack-300">{user?.profileDetails?.contactNumber || "Add phone number"}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Date of Birth</p>
                        <p className="text-richblack-300">{user?.profileDetails?.dateOfBirth || "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default MyProfile;
