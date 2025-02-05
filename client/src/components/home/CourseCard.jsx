import React from "react";
import Union from '../../assets/images/Union.png';
import Vector from '../../assets/images/Vector.png'

function CourseCard({cardData, currentCard, setCurrentCard}){
    return (
        <div onClick={()=>setCurrentCard(cardData.heading)} className={`w-[33%] flex flex-col bg-richblack-800 p-6 ${currentCard===cardData.heading?"bg-white":""} text-richblack-300 transition-all duration-200 cursor-pointer`}>
            <div className={`${currentCard===cardData.heading?"text-black":"text-white"} font-semibold text-xl mb-4`}>
                {cardData.heading}
            </div>

            <div>
                {cardData.description}
            </div>

            <div className="flex flex-row justify-between mt-[60px]">
                <div className="flex flex-row items-center gap-3">
                    <img src={Union} alt="Union"/>
                    <p>{cardData.level}</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <img src={Vector} alt="Vector"/>
                    <p>{cardData.lessonNumber}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;