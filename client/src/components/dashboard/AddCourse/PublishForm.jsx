import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../slices/courseSlice";
import { updateCourse } from "../../../services/operations/courseAPI";
import { useNavigate } from "react-router-dom";

function PublishForm() {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (course?.status === 'Published') {
            setValue('public', true);
        }
    }, [course, setValue]);

    const goBack = () => {
        dispatch(setStep(2));
    };

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate('/dashboard/my-courses');
    };

    const handleCoursePublic = async () => {
        if ((course?.status === 'Published' && getValues('public') === true) ||
            (course?.status === 'Drafted' && getValues('public') === false)) {
            goToCourses();
            return;
        }

        const formData = new FormData();
        formData.append('courseId', course._id);
        const courseStatus = getValues('public') ? 'Published' : 'Drafted';
        formData.append('status', courseStatus);
        setLoading(true);
        let result;
        try {
            result = await updateCourse({formData, token});
        } catch (error) {
            console.log(error);
        }

        if (result) {
            goToCourses();
        }
        setLoading(false);
    };

    const onSubmit = () => {
        handleCoursePublic();
    };

    return (
        <div className="flex flex-col justify-between gap-10 mx-auto max-w-2xl">  
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-richblack-800 p-8 rounded-lg mt-10">
                    <p className="text-3xl font-semibold text-richblack-25 mb-8">Publish Course</p>
                    <div>
                        <label htmlFor="public">
                            <input
                                type="checkbox"
                                id="public"
                                {...register('public')}
                                className="rounded h-4 w-4"
                            />
                            <span className="ml-4">Make this Course public</span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-6 mt-10"> 
                    <button disabled={loading} type="button" onClick={goBack} className="flex flex-row items-center gap-2 bg-richblack-700 text-white py-2 px-4 rounded">Back</button>
                    <button disabled={loading} type="submit" className="flex flex-row items-center bg-yellow-25 text-richblack-900 py-2 px-4 rounded">Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default PublishForm;
