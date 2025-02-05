import React from "react";
import ContactFormSection from "../about/ContactFormSection";
import { FaLocationArrow } from "react-icons/fa";
import { BsChat, BsTelephone } from "react-icons/bs";
import Footer from "../common/Footer";
import ReviewSlider from "../common/ReviewSlider";

function Contact() {
    return (
        <>
            <div className="flex flex-col gap-[100px]">
                {/* section 1 */}
                <section className="w-10/12 mx-auto flex flex-col lg:flex-row justify-around pt-[100px] gap-10">
                    <div className="flex flex-col bg-richblack-800 gap-10 rounded-2xl h-full w-full lg:w-[30%] p-10 text-richblack-300 text-[14px]">
                        <div className="flex flex-row gap-2">
                            <BsChat className="text-richblack-25 text-xl font-semibold mt-1" />
                            <div>
                                <h1 className="text-richblack-25 text-xl font-semibold">Chat with us</h1>
                                <p>Our friendly team is here to help.</p>
                                <p>naveenkalwan2003@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2">
                            <FaLocationArrow className="text-richblack-25 text-xl font-semibold mt-1" />
                            <div>
                                <h1 className="text-richblack-25 text-xl font-semibold">Visit us</h1>
                                <p>Come and say hello at our office HQ.</p>
                                <p>Bhagwi, Ch. Dadri</p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2">
                            <BsTelephone className="text-richblack-25 text-xl font-semibold mt-1" />
                            <div>
                                <h1 className="text-richblack-25 text-xl font-semibold">Call us</h1>
                                <p>Get in touch with us by phone.</p>
                                <p>+91 12345 67890</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-richblack-800 p-10 rounded-xl h-full w-full lg:w-[43%]">
                        <ContactFormSection heading={'Got an Idea? We’ve got the skills. Let’s team up'} description={'Tell us more about yourself and what you’ve got in mind.'} />
                    </div>
                </section>

                {/* section 2 */}
                <section>
                    <ReviewSlider />
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
