import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";
import { getInstructorData } from "../../../services/operations/profileAPI";
import { PiHandWavingFill } from "react-icons/pi";


function InstructorDashboard() {

    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            await getUserEnrolledCourses({token,setEnrolledCourses:setCourses});

            if (instructorApiData.length) {
                setInstructorData(instructorApiData)
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    if (loading) {
        return (<div>Loading...</div>)
    }

    return (
        <div className="text-richblack-300 mx-auto w-11/12 mt-6 mb-10 flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-semibold text-richblack-25 flex flex-row items-center gap-4">Hi {user?.firstName} {user?.lastName} <span className="text-yellow-100"><PiHandWavingFill /> </span></h1>
                <p>Let's start something new</p>
            </div>
            {
                courses.length ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4 justify-between">
                            <InstructorChart courses={instructorData}/>
                            <div className="bg-richblack-800 p-6 flex flex-col gap-4 w-[35%]">
                                <p className="text-richblack-25 text-2xl font-semibold">Statistics</p>
                                <div>
                                    <p>Total Courses</p>
                                    <p className="text-richblack-25 text-2xl font-semibold">{courses.length}</p>
                                </div>
                                <div>
                                    <p>Total Students</p>
                                    <p className="text-richblack-25 text-2xl font-semibold">{totalStudents}</p>
                                </div>
                                <div>
                                    <p>Total Income</p>
                                    <p className="text-richblack-25 text-2xl font-semibold">Rs. {totalAmount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 bg-richblack-800 p-6">
                            <div className="flex flex-roe justify-between">
                                <p className="text-richblack-25 text-2xl font-semibold">Your Courses</p>
                                <Link className="text-yellow-25" to='/dashboard/my-courses'>View all</Link>
                            </div>
                            <div className="flex flex-row gap-4">
                                {
                                    courses.slice(0, 3).map((course) => [
                                        <div key={course._id} className="w-[32%] flex flex-col gap-3">
                                            <div className="h-[200px]">
                                                <img src={course.thumbnail} alt="course-thumbnail" className="w-full h-full object-cover"/>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-richblack-25">{course.courseName}</p>
                                                <div className="flex flex-row gap-2 text-[15px]">
                                                    <p>{course.studentsEnrolled.length} Students</p>
                                                    <p>|</p>
                                                    <p>Rs. {course.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ])
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>You have not created any course yet</p>
                        <Link to={'/dashboard/add-course'}>Create a Course</Link>
                    </div>
                )

            }
        </div>
    )
}

export default InstructorDashboard;