import React from "react";
import logo1 from '../../assets/images/logo1.png';
import logo2 from '../../assets/images/logo2.png';
import logo3 from '../../assets/images/logo3.png';
import logo4 from '../../assets/images/logo4.png';
import doted_line from '../../assets/images/doted_line.png';
import imageBanner from '../../assets/images/image.png';

const timeLine=[
    {
        logo:logo1,
        heading:'Leadership',
        description:'Fully committed to the success company'
    },
    {
        logo:logo2,
        heading:'Responsibility',
        description:'Students will always be our top priority'
    },
    {
        logo:logo3,
        heading:'Flexibility',
        description:'The ability to switch is an important skills'
    },
    {
        logo:logo4,
        heading:'Solve the problem',
        description:'Code your way to a solution'
    }
]

function TimeLineSection(){
    return (
        <div className="mt-10">
            <div className="flex flex-row gap-15 items-center justify-around">
                <div className="flex flex-col w-[45%]">
                    {
                        timeLine.map((element, index)=>{
                            return (<div key={index}>
                                {
                                    (index!==0) && (
                                        <div className="ml-6">
                                            <img src={doted_line} alt="doted_line"/>
                                        </div>
                                    )
                                }
                                <div className="flex flex-row gap-6" key={index}>
                                    <div className="w-[50px] h-[50px] rounded-3xl bg-white flex justify-center items-center">
                                        <img src={element.logo} alt={`logo${index+1}`}/>
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                        <p className="text-base">{element.description}</p>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>

                <div className="relative shadow-blue-200 w-[50%]">
                    <img src={imageBanner} alt='imageBanner' className="object-cover h-fit"/>

                    <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-caribbeangreen-300 text-sm">years experience</p>
                        </div>
                        <div className="flex flex-row gap-5 items-center px-7">
                            <p className="text-3xl font-bold">250</p>
                            <p className="text-caribbeangreen-300 text-sm">types of courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeLineSection;