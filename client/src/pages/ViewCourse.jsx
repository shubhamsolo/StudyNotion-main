import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import VideoDetailsSidebar from "../components/viewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/viewCourse/CourseReviewModal";
import { getCourseDetails } from "../services/operations/courseAPI";
import { setCourseSectionData } from "../slices/viewCourseSlice";
import { setEntireCourseData } from "../slices/viewCourseSlice";
import { setCompletedLectures } from "../slices/viewCourseSlice";
import { setTotalNoOfLectures } from "../slices/viewCourseSlice";


function ViewCourse(){
    const [reviewModal,setReviewModal]=useState(false);
    const {courseId}=useParams();
    const {token} =useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();

    useEffect(() => {
        async function fetchCourseData() {
            setLoading(true);
            const result = await getCourseDetails({ courseId , token });
            dispatch(setCourseSectionData(result.courseDetails.courseContent));
            dispatch(setEntireCourseData((result.courseDetails)));
            dispatch(setCompletedLectures(result.completedVideos));
            let lectures=0;
            result?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures+=sec.subSection.length
            });
            dispatch(setTotalNoOfLectures(lectures));
            setLoading(false);
        }

        fetchCourseData();
    }, [courseId]);


    if(loading){
        return <div>Loading...</div>
    }


    return (<div className="text-richblack-300">
        <div className="relative flex  min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
                <Outlet/>
            </div>
        </div>
        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
        }
    </div>)
}

export default ViewCourse;