import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getAverageRating, getCourseDetails } from "../services/operations/courseAPI";
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { format } from "date-fns";
import copy from 'copy-to-clipboard';
import { addToCart } from "../slices/cartSlice";
import { LuGlobe } from 'react-icons/lu';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Footer from '../components/common/Footer';
import { BsDot } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";

function CourseDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [avgRating, setAvgRating] = useState(0);
    const [totalLectures, setTotalLectures] = useState(0);
    const [durationById, setDurationById] = useState({});
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        async function fetchCourseData() {
            const result = await getCourseDetails({ courseId, token });
            setCourseData(result.courseDetails);
        }

        fetchCourseData();
    }, [courseId]);

    useEffect(()=>{
        if (courseData) {
            let lectures = 0;
            let totalDuration = 0;
            let durationById = {};

            courseData.courseContent.forEach(section => {
                let sectionDuration = 0;

                section.subSection.forEach(subSection => {
                    const timeDurationInSeconds = parseInt(subSection.timeDuration);
                    sectionDuration += timeDurationInSeconds;
                    totalDuration += timeDurationInSeconds;
                    lectures += 1;
                    durationById[subSection._id] = timeDurationInSeconds;
                });

                durationById[section._id] = sectionDuration;
            });

            durationById['total'] = totalDuration;
            setTotalLectures(lectures);
            setDurationById(durationById);
        }
    },[courseData])

    useEffect(() => {
        async function fetchAvgRating() {
            const result = await getAverageRating(courseId);
            setAvgRating(result);
        }
        fetchAvgRating();
    }, [courseId]);


    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setModalData({
            text1: 'You are not logged in',
            text2: 'Please login to buy the course',
            btn1Text: 'Login',
            btn2Text: 'Cancel',
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setModalData(null)
        });
    };

    const handleAddToCart = () => {
        if (user && user?.accountType === 'Instructor') {
            toast.error('You are an Instructor, you cant buy a course')
        }
        if (token) {
            dispatch(addToCart({
                _id: courseData._id,
                courseName: courseData.courseName,
                courseDescription: courseData.courseDescription,
                thumbnail: courseData.thumbnail,
                category: courseData.category.name,
                rating: avgRating,
                ratingAndReviews: courseData.ratingAndReviews.length,
                price: courseData.price,
            }));
            return;
        }
        setModalData({
            text1: 'You are not logged in',
            text2: 'Please login to add to Cart',
            btn1Text: 'Login',
            btn2Text: 'Cancel',
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setModalData(null)
        })
    };

    const handleShare = () => {
        copy(window.location.href);
        toast.success('Link Copied to Clipboard');
    };

    if (loading || !courseData) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="flex flex-col text-richblack-300">
            <div className="relative bg-richblack-800 ">
                <div className="w-1/2 ml-28 pr-2 flex flex-col gap-3 my-8 border-r-[1px] border-richblack-600">
                    <p>Home / Learning / <span className="text-yellow-100">{courseData.category.name}</span></p>
                    <p className="text-4xl text-richblack-25 font-medium">{courseData.courseName}</p>
                    <p>{courseData.courseDescription}</p>
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-yellow-100">{avgRating}</p>
                        <RatingStars Review_Count={avgRating} />
                        <p>{`(${courseData.ratingAndReviews.length} ratings)`}</p>
                        <p>{courseData.studentsEnrolled.length} students</p>
                    </div>
                    <p className="text-richblack-50">Created by {courseData.instructor.firstName} {courseData.instructor.lastName}</p>
                    <div className="text-richblack-50 flex gap-2 items-center">
                        <IoMdInformationCircleOutline />
                        <p>Created: {format(new Date(courseData.createdAt), "MMMM dd, yyyy | hh:mm aa")}</p>
                        <LuGlobe />
                        <p>English</p>
                    </div>
                </div>

                <div className="absolute top-[15%] left-[60%] bg-richblack-700 max-w-[300px] flex flex-col gap-4 rounded-lg">
                    <img className='w-[300px] h-[200px] object-cover rounded-t-lg' src={courseData.thumbnail} alt="Course Thumbnail" />
                    <div className="flex flex-col gap-4 p-4">
                        <p className="text-2xl text-richblack-25 font-semibold">Rs. {courseData.price}</p>
                        <div className="flex flex-col">
                            {
                                (user && courseData.studentsEnrolled.includes(user._id)) ? (
                                    <button
                                        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200`}
                                        onClick={() => navigate('/dashboard/enrolled-courses')}
                                    >Go to Course</button>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <button
                                            className={`text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200`}
                                            onClick={handleAddToCart}>Add to Cart</button>
                                        <button
                                            className={`text-center text-[13px] px-6 py-3 rounded-md text-richblack-25 font-bold bg-richblack-800 hover:scale-95 transition-all duration-200`}
                                            onClick={handleBuyCourse}>Buy Now</button>
                                    </div>
                                )
                            }
                        </div>
                        <p className="mx-auto text-[13px] text-richblack-50">30-Day MoneyBack Guarantee</p>
                        <div>
                            <p className="text-richblack-25">This course includes:</p>
                            <div>
                                {courseData?.instructions?.map((item, index) => (
                                    <p className="text-caribbeangreen-300" key={index}>{item}</p>
                                ))}
                            </div>
                        </div>
                        <button className="text-yellow-100" onClick={handleShare}>Share</button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 ml-28 flex flex-col gap-10 my-8">
                <div className="p-6 border-[1px] border-richblack-600">
                    <p className="text-3xl text-richblack-25 font-medium">What you'll learn</p>
                    <p className="text-richblack-100">{courseData.whatYouWillLearn}</p>
                </div>
                <div>
                    <p className="text-3xl text-richblack-25 font-medium ">Course content</p>
                    <div>
                        <div className="flex flex-row items-center gap-1 my-2">
                            <p>{courseData.courseContent.length} sections</p>
                            <BsDot/>
                            <p>{totalLectures} lectures</p>
                            <BsDot/>
                            <p>{durationById['total'] || '2h 50m'} total length</p>
                        </div>
                        <div className="text-richblack-100 bg-richblack-700 border-[1px] border-richblack-600">
                            {
                                courseData.courseContent?.map((section) => (
                                    <details key={section._id}>
                                        <summary className="flex items-center justify-between p-3 text-richblack-25 border-b-[1px] border-richblack-600">
                                            <div className="flex flex-row items-center gap-1">
                                                <FaAngleDown/>
                                                <p>{section.sectionName}</p>
                                            </div>
                                            <div className="flex flex-row items-center gap-4">
                                                <p className="text-yellow-100">{section.subSection.length} lectures</p>
                                                <p>{durationById[section._id] || '51 min'}</p>
                                            </div>
                                        </summary>

                                        <div className="bg-richblack-900 py-2 px-3">
                                            {
                                                section.subSection.map((data) => (
                                                    <details key={data._id}>
                                                        <summary className="flex items-center justify-between p-2 text-richblack-25">
                                                            <div className="flex flex-row items-center gap-1">
                                                                <HiOutlineDesktopComputer />
                                                                <p>{data.title}</p>
                                                                <FaAngleDown/>
                                                            </div>
                                                            <p>{data?.timeDuration || '02:09'}</p>
                                                        </summary>
                                                        <div className="w-11/12 mx-auto">
                                                            {data.description}
                                                        </div>
                                                    </details>
                                                ))
                                            }
                                        </div>

                                    </details>
                                ))
                            }
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className="w-1/2 ml-28 flex flex-col gap-3 my-8 pr-2">
                <div className="text-3xl text-richblack-25 font-medium ">Author</div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-[50px] h-[50px] rounded-full" src={courseData.instructor.image} alt="instructor-image" />
                        <div className="text-xl text-richblack-100 ">{courseData.instructor.firstName} {courseData.instructor.lastName}</div>
                    </div>
                    <p>I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!</p>
                </div>
            </div>
            <div className="h-10"></div>
            <Footer />
            {modalData && <ConfirmationModal modalData={modalData} />}
        </div>
    );
}

export default CourseDetails;
