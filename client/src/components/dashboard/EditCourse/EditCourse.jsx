import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import { setCourse, setEditCourse } from "../../../slices/courseSlice";
import RenderSteps from "../AddCourse/RenderSteps";
import { getCourseDetails } from "../../../services/operations/courseAPI";

export default function EditCourse(){
    const dispatch=useDispatch();
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const  [loading,setLoading]=useState(false);

    useEffect(()=>{
        const populateCourseDetails=async()=>{
            setLoading(true);
            const result=await getCourseDetails({courseId, token});
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails))
            }
            console.log(result);
            setLoading(false);
        }
        populateCourseDetails();
    },[])

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="text-richblack-300  mt-6">
            <h1 className="text-3xl font-semibold text-richblack-25 mb-10">Edit Course</h1>
            <div>
                {
                    course?(<RenderSteps/>):(<p>Course Not Found</p>)
                }
            </div>
        </div>
    )
}