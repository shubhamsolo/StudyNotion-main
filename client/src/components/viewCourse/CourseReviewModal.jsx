import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { createRating } from "../../services/operations/courseAPI";
import { IoMdClose } from "react-icons/io";

function CourseReviewModal({ setReviewModal }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setValue('courseExperience', '');
        setValue('courseRating', 0);
    }, [setValue]);

    const ratingChange = (newRating) => {
        setValue('courseRating', newRating);
    }

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience
            },
            token
        );
        setReviewModal(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
            <div className="bg-richblack-700 text-richblack-25 w-[500px] rounded-lg">
                <div className="flex flex-row justify-between px-6 p-4 font-semibold border-b-[2px] border-richblack-25">
                    <p>Add Review</p>
                    <button onClick={() => setReviewModal(false)}><IoMdClose /></button>
                </div>

                <div className="bg-richblack-800 p-6 flex flex-col items-center gap-6 rounded-b-lg">
                    <div className="flex flex-row gap-3">
                        <img src={user?.image} alt="user-image" className="aspect-square w-[50px] rounded-full object-cover" />
                        <div>
                            <p className="text-richblack-25 font-semibold">{user?.firstName} {user?.lastName}</p>
                            <p className="text-[14px]">Posting Publicly</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
                        <ReactStars
                            count={5}
                            onChange={ratingChange}
                            size={24}
                            activeColor="#ffd700"
                        />

                        <div className="form-group w-full mt-4">
                            <label className="flex flex-col">
                                <span  className="text-richblack-25 text-base">Add Your Experience<sup className="text-pink-100">*</sup></span>
                                <textarea
                                    id="courseExperience"
                                    placeholder="Share details of your own experience for this course"
                                    {...register('courseExperience', { required: true })}
                                    className="w-full p-2 mt-1 rounded bg-richblack-700"
                                />
                                {errors.courseExperience && (
                                    <span className="error-message">Please add your experience</span>
                                )}
                            </label>
                        </div>

                        <div className="w-full flex flex-row justify-end gap-6 mt-6">
                            <button 
                            type="button" 
                            onClick={() => setReviewModal(false)} 
                            className="bg-richblack-700 text-white py-2 px-4 rounded "
                            >Cancel</button>

                            <button 
                            type="submit" 
                            className="bg-yellow-25 text-richblack-900 py-2 px-4 rounded flex flex-row items-center gap-2"
                            >Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal;
