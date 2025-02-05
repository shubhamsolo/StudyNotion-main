import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentEnrolledCourses } from "../../services/operations/courseAPI";
import ProgressBar from '@ramonak/react-progress-bar';
import thumbnail from '../../assets/images/about3.png';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const [courseState, setCourseState] = useState('All');
    const courseStateData = ['All', 'Pending', 'Completed'];

    useEffect(() => {
        async function fetchCourses(){
            const res=await getStudentEnrolledCourses({ token });
            setEnrolledCourses(res);
            console.log()
        }
        fetchCourses();
    },[]);    

    const filteredCourses = enrolledCourses.filter(course => 
        courseState === 'All' || 
        (courseState === 'Pending' && course.progressPercentage !== 100) || 
        (courseState === 'Completed' && course.progressPercentage === 100)
    );

    return (
        <div className="text-richblack-300 pb-10 ">
            <div>
                <p className="text-3xl text-white font-semibold mt-6 mb-10">Enrolled Courses</p>
                {!enrolledCourses ? (
                    <div>Loading...</div>
                ) : (
                    !enrolledCourses.length ? (
                        <p>You have not enrolled in any course yet</p>
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
                                    <p className="w-1/2">Course Name</p>
                                    <p className="w-1/5">Durations</p>
                                    <p className="w-1/5">Progress</p>
                                    <p className="w-1/10"></p>
                                </div>
                                <div className="flex flex-col pb-6">
                                    {filteredCourses.map((course, index) => (
                                        <div key={index}>
                                            <div onClick={()=>{
                                                navigate(`/view-course/${course?.course?._id}/section/${course?.course?.courseContent[0]?._id}/sub-section/${course?.course?.courseContent[0]?.subSection[0]?._id}`)
                                            }} className="flex flex-row items-center px-10 justify-around cursor-pointer">
                                                <div className="flex items-center w-1/2">
                                                    <img src={course.course.thumbnail || thumbnail} alt="Course Thumbnail" className="w-16 h-16 mr-4 rounded-lg" />
                                                    <div>
                                                        <p className="font-semibold text-richblack-25">{course.course.courseName}</p>
                                                        <p className="text-sm text-gray-400">{course.course.courseDescription}</p>
                                                    </div>
                                                </div>
                                                <div className="w-1/5 text-richblack-100">
                                                    {course.totalDuration}
                                                </div>
                                                <div className="w-1/5 flex flex-col gap-2">
                                                    <p className="text-sm text-richblack-100">Progress: {course.progressPercentage || 0}%</p>
                                                    <ProgressBar 
                                                        completed={course.progressPercentage || 0} 
                                                        isLabelVisible={false} 
                                                        bgColor="#1a73e8" 
                                                        height="10px" 
                                                    />
                                                </div>
                                                <div className="w-1/10">
                                                    <button className="text-xl">
                                                        <BsThreeDotsVertical />
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
        </div>
    );
}

export default EnrolledCourses;
