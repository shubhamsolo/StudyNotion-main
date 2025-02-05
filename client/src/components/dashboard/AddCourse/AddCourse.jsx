import React from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import RenderSteps from "./RenderSteps";


function AddCourse(){
    return (
        <div className="text-richblack-300 flex flex-row justify-between gap-10 mt-6">
            <div className="w-2/3">
                <h1 className="text-3xl font-semibold text-richblack-25 mb-10">Add Course</h1>
                <div>
                    <RenderSteps/>
                </div>
            </div>
            <div className="w-1/3 flex flex-col p-4 bg-richblack-800 h-full rounded-lg gap-5">
                <p className="text-xl text-richblack-25 flex flex-row items-center gap-2"><BsLightningChargeFill className="text-yellow-25"/>Course Upload Tips</p>
                <ul className="text-sm flex flex-col gap-2 text-richblack-100 list-disc pl-4">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse;