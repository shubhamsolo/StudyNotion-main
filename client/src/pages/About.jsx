import React from "react";
import HighLightText from '../components/small/HightLightText';
import about1 from '../assets/images/about1.png';
import about2 from '../assets/images/about2.png';
import about3 from '../assets/images/about3.png';
import about4 from '../assets/images/about4.png';
import { LearningGridArray } from "../data/learning-grid-aboutPage";
import CTAButton from '../components/small/CTAButton';
import ContactFormsection from "../components/about/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

function About(){
    return (
        <div className="text-richblack-300 mx-auto">
            {/* section 1 */}
            <section className="relative bg-richblack-800 pt-[60px] ">
                <div className="flex flex-col pb-[300px] w-10/12 mx-auto">
                    <div className="w-[70%] mx-auto text-center flex flex-col gap-6">
                        <p>About Us</p>
                        <header className="text-4xl font-semibold text-white">
                        Driving Innovation in Online Education for a <HighLightText text='Brighter Future'/> 
                        </header>
                        <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>
                    
                    <div className="flex flex-row gap-8 absolute top-[60%]">
                        <img src={about1} alt='about1'/>
                        <img src={about2} alt='about1'/>
                        <img src={about3} alt='about1'/>
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <section className="w-10/12 mx-auto pt-[180px] pb-[80px]">
                <div className="text-4xl font-semiold text-white text-center w-[90%] mx-auto">
                We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise, and community to create an unparalleled educational experience.
                </div>
            </section>

            <div className="h-[2px] bg-richblack-800"></div>

            {/* section 3 */}
            <section className="w-10/12 mx-auto pt-[100px] flex flex-col gap-[130px] mb-[120px]">
                <div className="flex flex-row justify-between">
                    <div className="w-[40%] flex flex-col gap-4 text-[16px]">
                        <h1 className="text-4xl font-semibold text-blue-25 mb-4">Our Founding Story </h1>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div>
                        <img className="mt-8 mr-8" src={about4} alt='about4'/>
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="w-[40%] flex flex-col gap-4 text-[16px]">
                        <h1 className="text-4xl font-semibold text-blue-25 mb-4">Our Vision</h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className="w-[40%] flex flex-col gap-4 text-[16px]">
                        <h1 className="text-4xl font-semibold text-blue-25 mb-4">Our Mission </h1>
                        <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <section className=" bg-richblack-800 p-16">
                <div className="w-9/12 flex flex-row justify-between mx-auto">
                    <div className="flex flex-col items-center justify-center gap-21">
                        <p className="text-white font-semibold text-2xl">5K</p>
                        <p>Active Students</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-21">
                        <p className="text-white font-semibold text-2xl">10+</p>
                        <p>Mentors</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-21">
                        <p className="text-white font-semibold text-2xl">200+</p>
                        <p>Courses</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-21">
                        <p className="text-white font-semibold text-2xl">50+</p>
                        <p>Awards</p>
                    </div>
                </div>
            </section>

            {/* section 5 */}
            <section>
                <div className="w-10/12 grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 mt-[100px]">
                    {
                        LearningGridArray.map((card, index)=>(
                            <div 
                            key={index} 
                            className={`${index===0?"lg:col-span-2 bg-richblack-900":""}
                            ${card.order%2===1?"bg-richblack-700":"bg-richblack-800"}
                            ${card.order===3&&"lg:col-start-2"} h-[250px]`}
                            >
                                {
                                    card.order<0?(
                                        <div className="pr-16 flex flex-col gap-6 items-start">
                                            <div className="text-4xl font-semibold">
                                                <p className="text-white">{card.heading}</p>
                                                <HighLightText text={card.hightLightText}/>
                                            </div>
                                            <p>{card.description}</p>
                                            <CTAButton active={true} linkto={card.btnLink}>{card.btnText}</CTAButton>
                                        </div>
                                    ):(
                                        <div className="flex flex-col gap-6 p-6">
                                            <h1 className="text-white text-xl">{card.heading}</h1>
                                            <p>{card.description}</p>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* section 6 */}
            <section className="mt-[140px] mb-[100px]">
                <ContactFormsection heading={'Get in Touch'} description={'We’d love to here for you, Please fill out this form.'}/>
            </section>

            <ReviewSlider/>

            <Footer/>
        </div>
    )
}

export default About;