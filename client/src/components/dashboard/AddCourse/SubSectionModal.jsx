import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../slices/courseSlice";
import { IoMdClose } from "react-icons/io";
import { updateSubSection, createSubSection } from "../../../services/operations/courseAPI";

function SubSectionModal({ modalData, setModalData, add = false, view = false, edit = false }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues
    } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    useEffect(() => {
        if (view || edit) {
            setValue('lectureTitle', modalData.title);
            setValue('lectureDesc', modalData.description);
            setValue('lectureVideo', modalData.videoUrl);
            setVideoPreview(modalData.videoUrl);
        }
    }, [view, edit, modalData, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        return (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        );
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append('subSectionId', modalData._id);
        formData.append('sectionId', modalData.sectionId);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append('title', currentValues.lectureTitle);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append('description', currentValues.lectureDesc);
        }
        if (videoFile) {
            formData.append('videoFile', videoFile);
        }

        setLoading(true);
        try {
            const result = await updateSubSection({ formData, token });
            if (result!==null) {
                const updatedCourseContent = course.courseContent.map((section) =>
                    section._id === modalData.sectionId ? { ...section, subSections: section.subSections.map((subSection) => (subSection._id === modalData._id ? result.payload : subSection)) } : section
                );
                const updatedCourse = { ...course, courseContent: updatedCourseContent };
                dispatch(setCourse(updatedCourse));
                toast.success('Subsection updated successfully');
            }
        } catch (error) {
            toast.error('Failed to update subsection');
        } finally {
            setLoading(false);
            setModalData(null);
        }
    };

    const onSubmit = async (data) => {
        if (view) return;
        if (edit) {
            if (!isFormUpdated()) {
                toast.error('No changes made to the form');
            } else {
                await handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append('sectionId', modalData);
        formData.append('title', data.lectureTitle);
        formData.append('description', data.lectureDesc);
        if (videoFile) {
            formData.append('videoFile', videoFile);
        }

        setLoading(true);
        try {
            // console.log('before creating subsection');
            const result = await createSubSection({ formData, token });
            // console.log(result); 
            // console.log('after creating subsection');
            
            if (result !==null) { // Check if result exists and is successful
                const updatedCourseContent = course.courseContent.map((section) =>
                    section._id === modalData.sectionId ? {
                        ...section,
                        subSection: [...section.subSection, result.payload]
                      }  : section
                );
                const updatedCourse = { ...course, courseContent: updatedCourseContent };
                dispatch(setCourse(updatedCourse));
                // console.log(updatedCourse);
                toast.success('Subsection created successfully');
            }
            console.log('after updating course with new subsection');
        } catch (error) {
            console.error('Error creating subsection:', error); // Log any errors for debugging
            toast.error('Failed to create subsection');
        } finally {
            setLoading(false);
            setModalData(null);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
            <div className="bg-richblack-700 text-richblack-25 w-[600px] rounded-lg">
                <div className="flex flex-row justify-between px-6 p-4 font-semibold ">
                    <p className="">{view && "Viewing"} {add && 'Adding'} {edit && 'Editing'} Lecture</p>
                    <button onClick={() => !loading && setModalData(null)}>
                        <IoMdClose />
                    </button>
                </div>
                <form className="bg-richblack-800 p-6 flex flex-col gap-6 rounded-b-lg" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-richblack-25 text-base">Lecture Video<sup className="text-pink-100">*</sup></label>
                        {videoPreview && (
                            <video src={videoPreview} controls className="w-full" />
                        )}
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                        className="bg-richblack-700 w-full text-richblack-300 py-2 px-4 rounded "
                        />
                        {errors.lectureVideo && (
                            <span>Lecture Video is required</span>
                        )}
                    </div>
                    <div>
                        <label className="text-richblack-25 text-base">Lecture Title<sup className="text-pink-100">*</sup></label>
                        <input
                            id='lectureTitle'
                            placeholder="Enter Lecture Title"
                            {...register('lectureTitle', { required: true })}
                        className="bg-richblack-700 w-full text-richblack-300 py-2 px-4 rounded "
                        />
                        {errors.lectureTitle && (
                            <span>Lecture Title is required</span>
                        )}
                    </div>
                    <div>
                        <label className="text-richblack-25 text-base">Lecture Description<sup className="text-pink-100">*</sup></label>
                        <textarea
                            id='lectureDesc'
                            placeholder="Enter Lecture Description"
                            {...register('lectureDesc', { required: true })}
                        className="bg-richblack-700 text-richblack-300 w-full py-2 px-4 rounded "
                        />
                        {errors.lectureDesc && (
                            <span>Lecture Description is required</span>
                        )}
                    </div>
                    {!view && (
                        <div className="flex flex-row justify-end gap-6">
                            <button type='button' onClick={() => !loading && setModalData(null)} className="bg-richblack-700 text-white py-2 px-4 rounded ">Cancel</button>
                            <button type="submit" className="bg-yellow-25 text-richblack-900 py-2 px-4 rounded flex flex-row items-center gap-2">
                                {loading ? 'Loading...' : edit ? 'Save Changes' : 'Save'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default SubSectionModal;
