import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CourseCard from "./Course_Card";

function CourseSlider({ Courses, sliderId }) {
    const prevButtonClass = `custom-prev-${sliderId}`;
    const nextButtonClass = `custom-next-${sliderId}`;

    return (
        <div className="relative">
            {Courses?.length ? (
                <>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        spaceBetween={30}
                        modules={[Pagination, Navigation]}
                        navigation={{
                            nextEl: `.${nextButtonClass}`,
                            prevEl: `.${prevButtonClass}`,
                        }}
                        breakpoints={{
                            1024: { slidesPerView: 3 },
                            800: { slidesPerView: 2 }
                        }}
                    >
                        {Courses.map((course, index) => (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={'h-[250px]'} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className={`${prevButtonClass} absolute top-1/3 left-4 transform -translate-y-1/2 z-10 w-8 h-9 bg-richblack-700 opacity-90 font-bold rounded-full flex items-center justify-center cursor-pointer`}>
                        <span className="text-white">&lt;</span>
                    </div>
                    <div className={`${nextButtonClass} absolute top-1/3 right-4 transform -translate-y-1/2 z-10 w-8 h-9 bg-richblack-700 opacity-90 font-bold rounded-full flex items-center justify-center cursor-pointer`}>
                        <span className="text-white">&gt;</span>
                    </div>
                </>
            ) : (
                <p>No Course Found</p>
            )}
        </div>
    );
}

export default CourseSlider;
