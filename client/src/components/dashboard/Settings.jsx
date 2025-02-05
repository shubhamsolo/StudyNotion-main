import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile, updateProfile } from "../../services/operations/profileAPI";
import { changePassword } from "../../services/operations/authAPI";
import ConfirmationModal from "../common/ConfirmationModal";

function Settings() {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);

    const [formData, setFormData] = useState({
        dateOfBirth: user?.profileDetails?.dateOfBirth || "",
        gender: user?.profileDetails?.gender || "",
        contactNumber: user?.profileDetails?.contactNumber || "",
        about: user?.profileDetails?.about || "",
        currentPassword: "",
        newPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        // Handle file change if necessary
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile({
            dateOfBirth: formData.dateOfBirth,
            about: formData.about,
            contactNumber: formData.contactNumber,
            gender: formData.gender,
            navigate
        }));
        if (formData.currentPassword && formData.newPassword) {
            dispatch(changePassword({
                email: user.email,
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                navigate
            }));
        }
    };

    const handleDeleteAccount = () => {
        setConfirmationModal({
            text1: "Are you sure?",
            text2: "Your Account will be DELETED permanently.",
            btn1Text: 'Delete Account',
            btn1Handler: () => dispatch(deleteProfile(navigate)),
            btn2Text: 'Cancel',
            btn2Handler: () => setConfirmationModal(null)
        });
    };

    const handleCancel = () => {
        navigate('/dashboard/my-profile');
    };

    return (
        <div className="text-white w-full max-w-3xl p-6">
            <div className="mb-6">
                <p className="text-3xl font-bold">Edit Profile</p>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-10 text-richblack-25">
                    <div className="bg-richblack-800 px-10 py-6 rounded-xl">
                        <div className="flex items-center">
                            <img
                                src={user?.image}
                                alt="user_profile"
                                className="aspect-square w-[78px] rounded-full object-cover mr-4"
                            />
                            <div>
                                <p className="font-semibold text-xl text-white">Change Profile Picture</p>
                                <input
                                    type="file"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                    className="text-richblack-25"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-richblack-800 px-10 py-6 rounded-xl">
                        <p className="text-xl font-semibold mb-6 text-white">Profile Information</p>
                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded-md bg-richblack-700 text-richblack-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded-md bg-richblack-700 text-richblack-300"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded-md bg-richblack-700 text-richblack-300"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">About</label>
                                    <input
                                        type="text"
                                        name="about"
                                        value={formData.about}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded-md bg-richblack-700 text-richblack-300"
                                        placeholder="Tell us about yourself"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-richblack-800 px-10 py-6 rounded-xl">
                        <p className="text-xl font-semibold mb-6 text-white">Password</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-richblack-700 text-richblack-300"
                                    placeholder="Enter your current password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-richblack-700 text-richblack-300"
                                    placeholder="Enter your new password"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="flex items-start gap-4 bg-pink-900 px-10 py-6 rounded-xl"
                    >
                        <RiDeleteBin6Line className="text-pink-300 text-m bg-pink-600 h-[40px] w-[40px] px-1 p-2 rounded-full" />
                        <div className="flex flex-col items-start text-[13px] text-pink-25">
                            <p className="text-xl font-semibold mb-2 text-white">Delete Account</p>
                            <p>Would you like to delete your account?</p>
                            <p className="text-start">This account contains Paid Courses. Deleting your account will remove all the content associated with it.</p>
                            <p className="text-pink-300 mt-2">I want to delete my account.</p>
                        </div>
                    </button>

                    <div className="flex justify-end gap-4 mt-10">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-richblack-800 text-richblack-25 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default Settings;
