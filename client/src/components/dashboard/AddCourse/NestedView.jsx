import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RxDropdownMenu} from 'react-icons/rx'
import {MdEdit} from 'react-icons/md';
import { RiDeleteBin6Line } from "react-icons/ri";
import {BiSolidDownArrow} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from '../../common/ConfirmationModal'
import { setCourse } from "../../../slices/courseSlice";
import { deleteSection, deleteSubSection } from "../../../services/operations/courseAPI";


function NestedView({handleChangedSectionName}){
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const [addSubSection, setAddSubSection]=useState(null);
    const [viewSubSection, setViewSubSection]=useState(null);
    const [editSubSection, setEditSubSection]=useState(null);

    const [confirmationModal, setConfirmationModal]=useState(null);

    const handleDeleteSection=async(sectionId)=>{
        let result;
        try{
            result=await deleteSection({sectionId,token})
        }catch(error){
            console.log(error);
        }
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection=async(subSectionId, sectionId)=>{
        let result;
        try{
            result=await deleteSubSection({subSectionId,token});
        }catch(error){
            console.log(error);
        }
        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>
                section._id===sectionId?result:section
            );
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }




    return (
        <div>
            <div className="rounded-lg text-richblack-100 bg-richblack-700 p-6">
                {
                    course.courseContent?.map((section)=>(
                        <details key={section._id} className="mb-6">

                            <summary className="flex items-center justify-between gap-x-2 border-b-2">
                                <div className="flex items-center gap-4">
                                    <RxDropdownMenu/>
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={()=>handleChangedSectionName(section._id,section.sectionName)}
                                    >
                                        <MdEdit/>
                                    </button>
                                    <button
                                        onClick={()=>{
                                            setConfirmationModal({
                                                text1:'Delete this Section?',
                                                text2:'All the lectures in this section will be deleted',
                                                btn1Text:'Delete',
                                                btn2Text:'Cancel',
                                                btn1Handler:()=>handleDeleteSection(section._id),
                                                btn2Handler:()=>setConfirmationModal(null)
                                            })
                                        }}  
                                    >
                                        <RiDeleteBin6Line/>
                                    </button>
                                </div>
                            </summary>

                            <div className="w-11/12 mx-auto">
                                {
                                    section.subSection.map((data)=>(
                                        <div key={data._id} onClick={()=>setViewSubSection(data)} className="flex items-center justify-between gap-x-3 border-b-2 mt-2">
                                            <div className="flex items-center">
                                                <RxDropdownMenu/>
                                                <p>{data.title}</p>
                                            </div>

                                            <div onClick={(e)=>e.stopPropagation()} className="flex items-center gap-x-3">
                                                <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                                    <MdEdit/>
                                                </button>
                                                <button
                                                    onClick={()=>{
                                                        setConfirmationModal({
                                                            text1:'Delete this Sub Section?',
                                                            text2:'This lectures will be deleted',
                                                            btn1Text:'Delete',
                                                            btn2Text:'Cancel',
                                                            btn1Handler:()=>handleDeleteSubSection(data._id, section._id),
                                                            btn2Handler:()=>setConfirmationModal(null)
                                                        })
                                                    }}  
                                                >
                                                    <RiDeleteBin6Line/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button onClick={()=>setAddSubSection(section._id)} className="mt-4 flex items-center gap-x-2 text-yellow-25">
                                    <AiOutlinePlus/>
                                    <p>Add Lecture</p>
                                </button>
                            </div>

                        </details>
                    ))
                }
            </div>
            {
                addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>) 
                : viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>) 
                : editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>)
                : (<div></div>) 
            }
            {
                confirmationModal&&<ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
    )
}

export default NestedView;