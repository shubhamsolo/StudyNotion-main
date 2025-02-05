import React from "react";
import Instructor from '../../assets/images/Instructor.png'
import HighLightText from "../small/HightLightText";
import CTAButton from "../small/CTAButton";
import { FaArrowRight } from "react-icons/fa";

function InstructorSection(){
    return (
        <div className="mt-[100px]">
            <div className="flex flex-row items-center gap-20 ml-8">
                <div className="w-[50%]">
                    <img className="w-[85%]" src={Instructor} alt='Instructor'/>
                </div>
                <div className="w-[50%] flex flex-col gap-10 items-start">
                    <div className="text-4xl font-semibold w-[50%]">
                        Become an
                        <HighLightText text={'Instructor'}/>
                    </div>

                    <p className="font-medium test-[16px] w-[80%] text-richblack-300">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    
                    <CTAButton active={true} linkto={'/signup'}>
                        <div className="flex flex-row gap-2 items-center">
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection;