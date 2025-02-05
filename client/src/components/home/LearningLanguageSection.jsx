import React from "react";
import HighLightText from "../small/HightLightText";
import img1 from '../../assets/images/Frame 55.png';
import img2 from '../../assets/images/Frame 74.png';
import img3 from '../../assets/images/Frame 57.png';
import CTAButton from "../small/CTAButton";

function LearningLanguageSection(){
    return (
        <div className="mt-[120px] pb-[90px]">
            <div className="flex flex-col gap-5 items-center">
                <div className="text-4xl font-semibold text-center">
                    Your swiss knife for
                    <HighLightText text={'learning any language'}/>
                </div>

                <p className="text-center text-richblaack-600 mx-auto text-base w-[65%]">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

                <div className="flex flex-row items-center justify-center mt-5">
                    <img className="object-contain -mr-32" src={img1} alt={img1}/>
                    <img className="object-contain" src={img2} alt={img2}/>
                    <img className="object-contain -ml-36" src={img3} alt={img3}/>
                </div>

                <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
            </div>
        </div>
    )
}

export default LearningLanguageSection;