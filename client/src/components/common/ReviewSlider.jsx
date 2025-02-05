import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ReactStars from 'react-rating-stars-component';
import { getAllRatingAndReview } from "../../services/operations/courseAPI";

function ReviewSlider() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchAllReviews = async () => {
            const data = await getAllRatingAndReview();
            setReviews(data);
        };
        fetchAllReviews();
    }, []);

    return (
        <div className="my-20 flex flex-col gap-10 items-center">
            <h2 className='text-center text-4xl font-semibold mt-10 text-richblack-25'>Reviews from other learners</h2>
            <div className="h-[190px] max-w-maxContent">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    modules={[Pagination, Navigation]}
                    breakpoints={{
                        1024: { slidesPerView: 4 },
                        900: { slidesPerView: 3 },
                        650: { slidesPerView: 2 }
                    }}
                    className="w-full"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide
                            key={index}
                        >
                            <div className="bg-richblack-800 flex flex-col gap-3 p-4 h-[200px] cursor-pointer">
                                <div className="flex flex-row items-center gap-4">
                                    <img
                                        className="h-9 w-9 object-cover rounded-full"
                                        src={review.user.image}
                                        alt="user-image"
                                    />
                                    <div>
                                        <p className="text-richblack-25 text-[15px]">{review.user.firstName} {review.user.lastName}</p>
                                        <p className="text-richblack-300 text-[12px]">{review.user.email}</p>
                                    </div>
                                </div>

                                <div className="text-richblack-25 text-[15px]">
                                    {review.review.slice(0, 50) + (review.review.length > 50 ? "..." : "")}
                                </div>

                                <div className="flex flex-col items-start">
                                    <p className="text-richblack-25 text-[15px]">{review.rating}</p>
                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ReviewSlider;
