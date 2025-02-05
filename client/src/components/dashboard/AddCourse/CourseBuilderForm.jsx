import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setEditCourse, setCourse } from "../../../slices/courseSlice";
import { toast } from 'react-hot-toast';
import { updateSection, createSection } from "../../../services/operations/courseAPI";
import NestedView from "./NestedView";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";


function CourseBuilderForm() {
    const { course } = useSelector((state) => state.course);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [editSectionName, setEditSectionName] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue('sectionName', '');
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if (course?.courseContent?.length === 0) {
            toast.error('Please add atleast one Section');
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error('Please add atleast one lecture in each section');
            return;
        }
        dispatch(setStep(3));
    }

    const onSubmit = async(data) => {
        setLoading(true);
        let result;

        if (editSectionName) {
            try {
                result = await updateSection({
                    formData: {
                        sectionName: data.sectionName,
                        sectionId: editSectionName
                    }, token
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                result = await createSection({
                    formData: {
                        sectionName: data.sectionName,
                        courseId: course._id
                    }, token
                })
            } catch (error) {
                console.log(error);
            }
        }
        if (result) {
            console.log(result);
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue('sectionName', '');
        }
        setLoading(false);
    }

    const handleChangedSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue('sectionName', sectionName);
    }



    return (
        <div className="flex flex-col justify-between gap-10 mx-auto max-w-2xl">
            <div className="bg-richblack-800 p-8 rounded-lg mt-10">
            <p className="text-3xl font-semibold text-richblack-25 mb-8">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="sectionName" className="text-richblack-25 text-base">Section name<sup className="text-pink-100">*</sup></label>
                    <input
                        id='sectionName'
                        placeholder="Add section name"
                        {...register('sectionName', { required: true })}
                        className="w-full p-2 mt-1 rounded bg-richblack-700"
                    />
                    {
                        errors.sectionName && (
                            <span>Section Name is required</span>
                        )
                    }
                </div>
                <div className="mb-10 flex flex-row gap-10 items-end">
                    <button type='submit' className="mt-4 flex flex-row items-center border border-yellow-25 text-yellow-25 py-2 px-4 rounded flex flex-row items-center gap-2">
                        {editSectionName ? 'Edit Section Name' : 'Create Section'}
                    </button>
                    {editSectionName && (
                        <button type='button' className="text-richblack-300" onClick={cancelEdit}>Cancel Edit</button>
                    )}
                </div>
            </form>

            {
                course?.courseContent?.length > 0 && (
                    <NestedView handleChangedSectionName={handleChangedSectionName} />
                )
            }
            </div>
            <div className="flex justify-end gap-6">
                <button onClick={goBack} className=" flex flex-row items-center gap-2 bg-richblack-800 text-white py-2 px-4 rounded "><FaAngleDoubleLeft/>  Back </button>
                <button onClick={goToNext} className=" flex flex-row items-center bg-yellow-25 text-richblack-900 py-2 px-4 rounded flex flex-row items-center gap-2">Next <FaAngleDoubleRight/> </button>
            </div>
        </div>
    )
}

export default CourseBuilderForm;