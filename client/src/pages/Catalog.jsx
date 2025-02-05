import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { getAllCategories, getCatalogPageData } from "../services/operations/courseAPI";
import CourseCard from "../components/catalog/Course_Card";
import CourseSlider from "../components/catalog/CourseSlider";

function Catalog(){
    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData]=useState(null);
    const [categoryId, setCategoryId]=useState('');

    useEffect(()=>{
        const getCategories=async()=>{
            const res=await getAllCategories();
            const category_id=res.filter((ct)=>ct.name.split(' ').join('-')===catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName])


    useEffect(()=>{
        const getcategoryDetails=async()=>{
            const res=await getCatalogPageData(categoryId);
            setCatalogPageData(res);
        }
        if(categoryId)
        getcategoryDetails();
        
    },[categoryId])


    return (
        <div className="text-richblack-300">
            <div className="bg-richblack-800">
                <div className="w-10/12 mx-auto py-10 flex flex-col gap-4">
                <p>{`Home / Catalog / `}<span className="text-yellow-25">{catalogPageData?.data?.selectedCategory?.name}</span></p>
                <p className="text-4xl font-semibold text-richblack-25">{catalogPageData?.data?.selectedCategory?.name}</p>
                <p>{catalogPageData?.data?.selectedCategory?.description}</p>
                </div>
            </div>

            <div className="w-10/12 mx-auto flex flex-col gap-12 py-10">
                {/* section 1 */}
                <div className="flex flex-col gap-3">
                    <div className="text-4xl font-semibold text-richblack-25">Courses to get you started</div>
                    <div className=" flex gap-x-3">
                        <p>Most Popular</p>
                        <p>New</p>
                    </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.differentCourses}/>
                        {/* <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} sliderId={'1'}/> */}
                    </div>
                </div>

                {/* section 2 */}
                <div className="flex flex-col gap-3">
                    <p className="text-4xl font-semibold text-richblack-25">Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}  sliderId={'2'}/>
                    </div>
                </div>

                {/* section 3 */}
                <div className="flex flex-col gap-3">
                    <p className="text-4xl font-semibold text-richblack-25">Frequently Bought</p>
                    <div className="py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {
                                catalogPageData?.data?.mostSellingCourses?.map((course,index)=>(
                                    <div key={index}>
                                    <CourseCard course={course} key={index} Height={'h-[330px]'}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Catalog;