import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

function Wishlist(){

    const { totalItems}=useSelector((state)=>state.auth);
    // const totalItems=2;
    const total=500;
    return (
        <div className="text-richblack-300 pb-10">
            <h1 className="text-3xl text-white font-semibold mt-6 mb-10">My Wishlist</h1>
            <p>{totalItems} courses in Wishist</p>
            <div className="h-[1px] bg-richblack-700 my-4 "></div>
            {
                total>0?(
                    <div className="flex flex-row justify-between gap-20">
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>  
                ):(
                    <p>Your Wishlist is Empty</p>
                )
            }
        </div>
    )
}

export default Wishlist;