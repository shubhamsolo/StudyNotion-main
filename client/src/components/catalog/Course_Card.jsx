import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAverageRating } from "../../services/operations/courseAPI";
import RatingStars from '../common/RatingStars';

function CourseCard({course, Height}){
    const [avgRating,setAvgRating]=useState(0);

    useEffect(()=>{
        const getAvgRatting=async()=>{
            const avgRating=await getAverageRating(course._id);
            setAvgRating(avgRating);
        }
        getAvgRatting();
    },[course])


    return (
        <div>
            <Link to={`/course/${course._id}`}>
                <div className="flex flex-col gap-1">
                    <div>
                        <img src={course?.thumbnail} alt='thumbnail' className={`${Height} w-full rounded-xl object-cover`}/>
                    </div>
                    <div>
                        <p className="text-richblack-25 text-xl font-medium">{course.courseName}</p>
                        <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-yellow-100">{avgRating}</span>
                            <RatingStars Review_Count={avgRating}/>
                            <span>{`( ${course?.ratingAndReviews?.length} Ratings )`}</span>
                        </div>
                        <p className="text-richblack-25 text-xl font-bold mt-2">Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard;