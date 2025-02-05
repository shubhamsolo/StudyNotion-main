import React, { useState } from "react";
import { HomePageExplore } from "../../data/homepage-explore";
import HighLightText from "../small/HightLightText";
import CourseCard from "./CourseCard";

const tabsName=[
    'Free', 'New to coding', 'Most popular', 'Skills paths', 'Career paths'
]

function ExploreMore(){
    const [currentTab, setCurrentTab]=useState(tabsName[0]);
    const [courses, setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCard=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


    return (
        <div className="mt-[60px]">
            <div className="text-4xl font-semibold text-center">
                Unlock the
                <HighLightText text={'Power of Code'}/>
            </div>

            <p className="text-center text-richblack-300 text-m mt-4">Learn to Build Anything You Can Imagine</p>

            <div className="text-[16px] flex flex-row items-center gap-4 mt-10 mb-[230px] rounded-full bg-richblack-800 px-1 py-1">
                {
                    tabsName.map((element, index)=>{
                        return (
                            <div onClick={()=>setMyCard(element)} key={index} className={`${currentTab===element?"bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-5 py-[5px]`}>
                                {element}
                            </div>
                        )
                    })
                }
            </div>

            <div className="absolute flex flex-row gap-10 jusify-between w-full left-[0] top-[93%]">
                {
                    courses.map((element, index)=>{
                        return (
                            <CourseCard 
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExploreMore;