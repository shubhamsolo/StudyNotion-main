import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HighLightText from '../components/small/HightLightText';
import CTAButton from '../components/small/CTAButton';
import video from '../assets/videos/video.mp4'
import CodeBlocks from '../components/home/CodeBlocks';
import TimeLineSection from '../components/home/TimeLineSection';
import LearningLanguageSection from '../components/home/LearningLanguageSection';
import InstructorSection from '../components/home/InstructorSection';
import ReviewSlider from '../components/common/ReviewSlider';
import ExploreMore from '../components/home/ExploreMore';
import Footer from '../components/common/Footer';

function Home(){
    return (
        <div className='z-10'>
            {/* section 1 */}
            <div className='relative mx-auto flex flex-col w-9/12 max-w-maxContent items-center text-white justify-between pt-16'>
                <Link to={'/signup'}>
                    <div className='group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-300 transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower your Future with <HighLightText text={'Coding Skills'}/>
                </div>

                <div className='mt-4  text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className='flex fex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={'/login'}>Book a Demo</CTAButton>
                </div>

                <div className='mx-3 my-12 shadow-blue-200'>
                    <video muted loop autoPlay>
                        <source src={video} type='video/mp4'/>
                    </video>
                </div>

                <div>
                    <CodeBlocks
                        position={'lg:flex-row'}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighLightText text={'coding potential'}/>
                                with our online courses
                            </div>
                        }
                        subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                        ctabtn1={
                            {
                                btnText:'Try it Yourself',
                                likto:'/signup',
                                active:true
                            }
                        }      
                        ctabtn2={
                            {
                                btnText:'Learn More',
                                likto:'/login',
                                active:false
                            }
                        }   
                        codeblock={
                            `<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`
                        }
                        codeColor={'text-yellow'}
                    />
                </div>

                <div className='w-[100%] mt-12'>
                    <CodeBlocks
                        position={'lg:flex-row-reverse'}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighLightText text={`coding in seconds`}/>
                            </div>
                        }
                        subheading={'Go ahead, give it a try. Our hands-on learning environment means you wll be writing real code from your very first lesson.'}
                        ctabtn1={
                            {
                                btnText:'Continue Lesson',
                                likto:'/signup',
                                active:true
                            }
                        }      
                        ctabtn2={
                            {
                                btnText:'Learn More',
                                likto:'/login',
                                active:false
                            }
                        }   
                        codeblock={
                            `<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`
                        }
                        codeColor={'text-yellow'}
                    />
                </div>

                <ExploreMore/>
            </div>

            {/* section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[333px] flex justify-center'>
                    <div className='w-9/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto'>
                        <div className='flex flex-row gap-7 text-white'>
                            <CTAButton active={true} linkto={'/signup'}>
                                <div className='flex items-center gap-2'>
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                                
                            </CTAButton>
                            <CTAButton active={false} linkto={'/login'}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-10/12 max-w-maxContent flex flex-col imes-center justify-between gap-7'>
                    <div className='flex flex-row gap-5 justify-between mb-10 mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get he skills you need for a
                            <HighLightText text={'job that is in demand'}/>
                        </div>

                        <div className='flex flex-col gap-10 w-[45%] items-start'>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                        </div>
                    </div>
                    
                    <TimeLineSection/>

                    <LearningLanguageSection/>
                    
                </div>
            </div>

            {/* section 3 */}
            <div className='w-10/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-9 first-letter bg-richblack-900 text-white'>
                <InstructorSection/>

                <ReviewSlider/>
            </div>

            <Footer/>
        </div>
    )
}

export default Home;