import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseBuilderForm from "./CourseBuilderForm";
import CourseInformationForm from "./CourseInformationForm";
import PublishForm from "./PublishForm";
import line14 from '../../../assets/images/Line14.png';

function RenderSteps() {
    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: 'Course Information'
        },
        {
            id: 2,
            title: 'Course Builder'
        },
        {
            id: 3,
            title: 'Publish'
        }
    ];

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row items-center">
                {steps.map((item, index) => (
                    <div key={index} className="flex flex-row items-center gap-1">
                        <div className={`border px-2 inline-flex rounded-full ${item.id === step ? "text-yellow-25 border-yellow-25 bg-richblack-900" : "bg-richblack-800 text-richblack-300 border-richblack-700"}`}>
                            {step > item.id ? (<FaCheck className="text-yellow-25"/>) : (<p>{item.id}</p>)} 
                        </div>
                        <div>
                        {index < steps.length - 1 && (
                            <img className="h-[1px]" src={line14} alt="line" />
                        )}
                        </div>
                    </div>
                ))}
                </div>
                <div className="flex flex-row justify-around w-full">
                    {steps.map((item, index) => (
                        <p key={index} className={`${item.id === step ? "text-richblack-25" : ""}`}>{item.title}</p>
                    ))}
                </div>
            </div>
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishForm />}
        </div>
    );
}

export default RenderSteps;
