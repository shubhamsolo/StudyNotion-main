import React from "react";
import { FaFacebook, FaGoogle, FaHeart, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsCCircle } from 'react-icons/bs'

function Footer(){
    return (<div className=" bg-richblack-800 pb-[50px] pt-8 text-base">
        <div className="flex flex-col mx-auto text-richblack-500 w-10/12">
            <div className="flex flex-row justify-between">
                <div  className="flex flex-row justify-between w-[45%]">
                    <div className="flex flex-col gap-2">   
                        <div className="flex flex-row items-center gap-2 text-richblack-50 text-xl font-semibold mb-3">
                            <p className="w-[32px] h-[32px] rounded-2xl bg-richblack-200 text-richblack-800 text-2xl font-bold text-center">S</p>
                            <p>StudyNotion</p>
                        </div>
                        <p className="text-richblack-200 text-l font-semibold">Company</p>
                        <p>About</p>
                        <p>Careers</p>
                        <p>Affiliates</p>
                        <div className="flex flex-row gap-4 mt-6">
                            <FaFacebook/>
                            <FaGoogle/>
                            <FaTwitter/>
                            <FaYoutube/>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col gap-2 mb-6">
                            <p className="text-richblack-200 text-l font-semibold">Resources</p>
                            <p>Articles</p>
                            <p>Chart Sheet</p>
                            <p>Code challenges</p>
                            <p>Docs</p>
                            <p>Projects</p>
                            <p>Videos</p>
                            <p>Workspaces</p>
                        </div>

                        <div>
                            <p className="text-richblack-200 text-l font-semibold mb-2">Support</p>
                            <p>Help Center</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col gap-2 mb-6">
                            <p className="text-richblack-200 text-l font-semibold">Plans</p>
                            <p>Paid memberships</p>
                            <p>For students</p>
                            <p>Business solutions</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-richblack-200 text-l font-semibold">Community</p>
                            <p>Forums</p>
                            <p>Chapters</p>
                            <p>Events</p>
                        </div>
                    </div>
                </div>

                <div className="w-[1px] bg-richblack-500"></div>

                <div className="flex flex-row justify-between w-[45%]">
                    <div className="flex flex-col gap-2">
                        <p className="text-richblack-200 text-l font-semibold">Subjects</p>
                        <p>AI</p>
                        <p>Cloud Computing</p>
                        <p>Computer Science</p>
                        <p>CyberSecurity</p>
                        <p>Data Analytics</p>
                        <p>Data Science</p>
                        <p>Data Visualisation</p>
                        <p>Developer Tools</p>
                        <p>DevOps</p>
                        <p>Game Development</p>
                        <p>IT</p>
                        <p>Machine Larning</p>
                        <p>Math</p>
                        <p>Mobile Development</p>
                        <p>Web Design</p>
                        <p>Web Development</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-richblack-200 text-l font-semibold">Languages</p>
                        <p>Bash</p>
                        <p>C</p>
                        <p>C++</p>
                        <p>C#</p>
                        <p>Go</p>
                        <p>HTML & CSS</p>
                        <p>Java</p>
                        <p>JavaScript</p>
                        <p>Kotin</p>
                        <p>PHP</p>
                        <p>Python</p>
                        <p>R</p>
                        <p>Ruby</p>
                        <p>SQL</p>
                        <p>Swift</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-richblack-200 text-l font-semibold">Career building</p>
                        <p>Career paths</p>
                        <p>Career services</p>
                        <p>Interview prep</p>
                        <p>Professional certification</p>
                        <p>-</p>
                        <p>Full Catalog</p>
                        <p>Beta Content</p>
                    </div>
                </div>
            </div>

            <div className="h-[1px] bg-richblack-500 mt-6"></div>

            <div className="flex flex-row justify-between mt-8">
                <div className="flex flex-row gap-3">
                    <p>Privacy Policy</p>
                    <p>Cookie Policy</p>
                    <p>Terms</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                    Made with <FaHeart className="text-white"/> Naveen Kalwan <BsCCircle/> 2024 StudyNotion
                </div>
            </div>
        </div>
    </div>)
}

export default Footer;