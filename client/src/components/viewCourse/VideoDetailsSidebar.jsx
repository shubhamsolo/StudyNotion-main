import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleLeft, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function VideoDetailsSidebar({setReviewModal}){
    const [activeStatus, setActiveStatus]=useState('');
    const [videoBarActive,setVideoBarActive]=useState('');
    const navigate=useNavigate();
    const location=useLocation();
    const {sectionId, subSectionId}=useParams();
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    }=useSelector((state)=>state.viewCourse);

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length)return;
            const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId);
            const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id===subSectionId);
            const activeSubSectionId=courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        })()
    },[courseSectionData, courseEntireData, location.pathname])

    return (
        <div className="flex flex-col gap-4 min-w-[222px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-6 items-start font-medium text-richblack-300">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row justify-between px-2">
                    <div 
                    className="flex flex-row gap-1 items-center bg-richblack-900 text-white px-2 py-1 rounded-lg hover:scale-95 transition-all duration-200" 
                    onClick={()=>navigate('/dashboard/enrolled-courses')}>
                        <FaAngleLeft/>
                        <p>Back</p>
                    </div>
                    <div
                    className="flex flex-row gap-1 items-center bg-yellow-25 text-richblack-900 px-4 py-2 rounded-lg hover:scale-95 transition-all duration-200"
                    >
                        <button onClick={()=>setReviewModal(true)}>Add Review</button>
                    </div>
                </div>
                <div className="text-richblack-25 flex flex-row justify-between px-4 items-center pt-4">
                    <p className="font-bold text-xl">{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length}/{totalNoOfLectures}</p>
                </div>
            </div>

            <div className="w-full flex flex-col gap-2">
                {
                    courseSectionData.map((section,index)=>(
                        <div
                        onClick={()=>setActiveStatus(section?._id)}
                        key={index}
                        >
                            <div className='flex flex-row items-center justify-between bg-richblack-700 p-3 gap-2 text-richblack-25'>
                                <p>{section?.sectionName}</p>
                                {
                                    activeStatus===section?._id?(
                                        <FaAngleUp/>
                                    ):(
                                        <FaAngleDown/>
                                    )
                                }
                            </div>

                            <div>
                                {
                                    activeStatus===section?._id && (
                                        <div>
                                            {
                                                section.subSection.map((subSection,index)=>(
                                                    <div
                                                    onClick={()=>{
                                                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`)
                                                        setVideoBarActive(subSection?._id)
                                                    }}
                                                    key={index}
                                                    className={`flex gap-3 p-2 px-4 ${videoBarActive===subSection._id?'bg-yellow-100 text-richblack-900':'bg-richblack-900 text-white'}`}
                                                    >
                                                        <input 
                                                        type='checkbox'
                                                        checked={completedLectures?.includes(subSection?._id)}
                                                        onChange={()=>{}}
                                                        />
                                                        <span>{subSection.title}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoDetailsSidebar;