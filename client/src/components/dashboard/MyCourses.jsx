import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../services/operations/profileAPI";
import { MdEdit } from "react-icons/md";
import thumbnail from '../../assets/images/about3.png';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { FaRegClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../services/operations/courseAPI";
import { toast } from "react-toastify"; // Add toast for better user feedback
import ConfirmationModal from "../common/ConfirmationModal";
import { format } from "date-fns";

function MyCourses() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const [courseState, setCourseState] = useState('All');
    const courseStateData = ['All', 'Published', 'Drafted'];

    const [modalData,setModalData]=useState(null);

    useEffect(() => {
        fetchUserEnrolledCourses();
    }, []);

    const fetchUserEnrolledCourses = async () => {
        await getUserEnrolledCourses({ token, setEnrolledCourses });
    };

    const handleDeleteCourse = async (courseId) => {
        const toastId = toast.loading("Deleting course...");
        try {
            await deleteCourse({ courseId, token });
            toast.update(toastId, { render: "Course deleted successfully", type: "success", isLoading: false, autoClose: 2000 });
            fetchUserEnrolledCourses(); // Re-fetch courses to update the UI
        } catch (error) {
            toast.update(toastId, { render: "Failed to delete course", type: "error", isLoading: false, autoClose: 2000 });
        }
        setModalData(null);
    };

    const filteredCourses = enrolledCourses?.filter(course =>
        courseState === 'All' || 
        course.status === courseState
    );

    return (
        <div className="text-richblack-300 pb-10">
            <div>
                <div className="flex flex-row justify-between">
                    <p className="text-3xl text-white font-semibold mt-6 mb-10">My Courses</p>
                    <button>
                        <div onClick={()=>navigate('/dashboard/add-course')} className="flex flex-row items-center gap-1 text-center text-[13px] px-4 py-2 rounded-md text-base font-bold bg-yellow-50 text-black">
                            <IoIosAddCircleOutline />
                            <p>New</p>
                        </div>
                    </button>
                </div>
                {!enrolledCourses ? (
                    <div>Loading...</div>
                ) : (
                    !enrolledCourses.length ? (
                        <p className="text-4xl font-semibold mx-auto my-10">You have not created any courses yet</p>
                    ) : (
                        <div className="py-4 rounded-md">
                            <div className="inline-flex bg-richblack-800 gap-2 p-1 rounded-full mb-6">
                                {courseStateData.map((state, index) => (
                                    <button
                                        key={index}
                                        className={`p-1 px-4 rounded-full font-medium ${state === courseState && "bg-richblack-900 text-white"}`}
                                        onClick={() => setCourseState(state)}
                                    >
                                        {state}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col border border-richblack-700 rounded-lg">
                                <div className="flex text-richblack-25 flex-row items-center justify-around mb-4 bg-richblack-700 px-10 py-4 rounded-t-lg">
                                    <p className="w-2/3">Course Name</p>
                                    <p className="w-1/9">Duration</p>
                                    <p className="w-1/9">Price</p>
                                    <p className="w-1/9">Actions</p>
                                </div>
                                <div className="flex flex-col pb-6">
                                    {!filteredCourses.length&& (
                                        <div className="text-4xl font-semibold mx-auto my-10">No {courseState} Course</div>
                                    )}
                                    {filteredCourses.map((course, index) => (
                                        <div key={index}>
                                            <div className="flex flex-row items-center px-10 justify-around">
                                                <div className="flex flex-row w-2/3">
                                                    <img src={course.thumbnail || thumbnail} alt="Course Thumbnail" className="w-[200px] h-[150px] mr-4 rounded-lg" />
                                                    <div className="flex flex-col justify-between w-full">
                                                        <p className="font-semibold text-xl text-richblack-25">{course.courseName}</p>
                                                        <p className="text-sm text-gray-400">
                                                            {course.courseDescription.length > 100 ? course.courseDescription.slice(0, 100) + "..." : course.courseDescription}
                                                        </p>
                                                        <p className="text-sm text-richblack-100">Created: {format(new Date(course.createdAt), "MMMM dd, yyyy | hh:mm aa")}</p>
                                                        <div className={`inline-flex items-center text-sm bg-richblack-700 rounded-full px-2 py-1 gap-1 ${course.status === 'Drafted' ? "text-pink-50 w-[80px]" : "text-yellow-25 w-[100px]"}`}>
                                                            {course.status === 'Drafted' ? <SiTicktick /> : <FaRegClock />}
                                                            <p>{course.status}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-1/9 text-richblack-100">
                                                    {course.courseDuration||<p>20h 10m</p>}
                                                </div>
                                                <div className="w-1/9 text-richblack-100">
                                                    Rs {course.price}
                                                </div>
                                                <div className="w-1/9 flex items-center space-x-4">
                                                    <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)} className="text-xl">
                                                        <MdEdit />
                                                    </button>
                                                    <button className="text-xl" onClick={()=>
                                                        setModalData({
                                                            text1: "Are you sure?",
                                                            text2: "All Course data will be deleted",
                                                            btn1Text: 'Delete Course',
                                                            btn2Text: 'Cancel',
                                                            btn1Handler: () => handleDeleteCourse(course._id),
                                                            btn2Handler: () => setModalData(null)
                                                        })
                                                    }>
                                                        <RiDeleteBin6Line />
                                                    </button>
                                                </div>
                                            </div>
                                            {index + 1 !== filteredCourses.length && (
                                                <div className="h-[1px] bg-richblack-700 my-4"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            {
                modalData&&(
                    <ConfirmationModal modalData={modalData}/>
                )
            }
        </div>
    );
}

export default MyCourses;
