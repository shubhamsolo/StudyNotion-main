import React from "react";
import { useDispatch ,useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../slices/cartSlice';
import RatingStars from "../../common/RatingStars";

function RenderCartCourses() {
    const dispatch = useDispatch();
    const {cart}=useSelector((state)=>state.cart);

    return (
        <div className="flex flex-col w-full">
            {cart.map((course, index) => (
                <div key={index} className="w-full">
                    <div className="flex flex-row items-center justify-between rounded-lg">
                        <div className="flex items-center">
                            <img src={course.thumbnail} alt="Course Thumbnail" className="w-24 h-24 mr-4 rounded-lg" />
                            <div>
                                <p className="font-semibold text-xl text-richblack-25">{course.courseName}</p>
                                <p className="text-sm text-gray-400">{course.courseDescription}</p>
                                <p className="text-sm text-gray-400">{course.category.name}</p>
                                <div className="flex items-center mt-2">
                                    <span className="mr-2 text-[#ffd700]">{course.rating.toFixed(1)}</span>
                                    <RatingStars Review_Count={course.rating}/>
                                    <span className="ml-2">({course.ratingAndReviews})</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="flex items-center text-pink-300 bg-richblack-800 px-4 py-2 rounded-lg"
                            >
                                <RiDeleteBin6Line className="mr-2" />
                                <span>Remove</span>
                            </button>
                            <p className="mt-2 font-medium text-yellow-25 text-2xl">Rs {course.price}</p>
                        </div>
                    </div>
                    {index+1!==cart.length && (<div className="h-[1px] my-4 bg-richblack-700"></div>)}
                </div>
            ))}
        </div>
    );
}

export default RenderCartCourses;
