import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, updateCourse, createCourse } from "../../../services/operations/courseAPI";
import { FaAngleDoubleRight } from "react-icons/fa";
import { toast } from "react-hot-toast";
import TagField from "./TagField";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";

function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);

    const fetchCategories = async () => {
        try {
            const categories = await getAllCategories();
            setCourseCategories(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            // Handle error as needed
        }
    }

    useEffect(() => {
        fetchCategories();
        if (editCourse && course) {
            setValue("courseTitle", course.courseName);
            setValue("courseDescription", course.courseDescription);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category._id);
            setValue("courseRequirements", course.instructions);
            setValue("coursePrice", course.price);
            setThumbnail(course.thumbnail); // Assuming thumbnail is stored in course.thumbnail
            setPreview(course.thumbnail); // Set preview if thumbnail already exists
        }
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        return (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseTags.toString() !== course.tags.toString() ||
            thumbnail !== course.thumbnail
        );
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('courseName', data.courseTitle);
        formData.append('courseDescription', data.courseDescription);
        formData.append('price', data.coursePrice);
        formData.append('whatYouWillLearn', data.courseBenefits);
        formData.append('category', data.courseCategory);
        formData.append('instructions', data.courseRequirements);
        formData.append('tag', data.courseTags);
        if (thumbnail) {
            formData.append('thumbnailImage', thumbnail);
        }
        formData.append('status', 'Draft');

        if (editCourse) {
            if (isFormUpdated()) {
                try {
                    formData.append('courseId',course._id);
                    updateCourse({ formData, token });
                    toast.success('Course updated successfully');
                    dispatch(setStep(2));
                    
                } catch (error) {
                    toast.error('Failed to update course');
                }
            } else {
                toast.error('No changes made so far');
            }
            return;
        }

        try {
            createCourse({ formData, token });
            toast.success('Course created successfully');
            dispatch(setStep(2));
        } catch (error) {
            toast.error('Failed to create course');
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 bg-richblack-800 p-8 rounded-lg mt-8">
                <div>
                    <label className="text-richblack-25 text-base">Course Title<sup className="text-pink-100">*</sup></label>
                    <input
                        id='courseTitle'
                        placeholder="Enter Course Title"
                        {...register('courseTitle', { required: true })}
                        className="w-full p-2 mt-1 rounded bg-richblack-700"
                    />
                    {errors.courseTitle && (
                        <span className="text-red-500">Course Title is Required</span>
                    )}
                </div>

                <div>
                    <label className="text-richblack-25 text-base">Course Short Description<sup className="text-pink-100">*</sup></label>
                    <input
                        id='courseDescription'
                        placeholder="Enter Description"
                        {...register('courseDescription', { required: true })}
                        className="w-full p-2 mt-1 rounded bg-richblack-700"
                    />
                    {errors.courseDescription && (
                        <span className="text-red-500">Course Description is Required</span>
                    )}
                </div>

                <div className="relative">
                    <label className="text-richblack-25 text-base">Course Price<sup className="text-pink-100">*</sup></label>
                    <input
                        id='coursePrice'
                        type="number"
                        placeholder="Enter Course Price"
                        {...register('coursePrice', { required: true, valueAsNumber: true })}
                        className="w-full p-2 mt-1 rounded bg-richblack-700"
                    />
                    {errors.coursePrice && (
                        <span className="text-red-500">Course Price is Required</span>
                    )}
                </div>

                <div>
                    <label className="text-richblack-25 text-base">Course Category<sup className="text-pink-100">*</sup></label>
                    <select
                        id='courseCategory'
                        defaultValue=""
                        {...register('courseCategory', { required: true })}
                        className="w-full p-2 mt-1 rounded bg-richblack-700"
                    >
                        <option value=''>Choose Category</option>
                        {!loading && courseCategories.map((category, index) => (
                            <option key={index} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.courseCategory && (
                        <span className="text-red-500">Course Category is Required</span>
                    )}
                </div>

                <TagField
                    name='courseTags'
                    label='Tags'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />

                <div>
                    <label className="text-richblack-25 text-base">Thumbnail<sup className="text-pink-100">*</sup></label>
                    {preview && (
                        <img src={preview} alt="Thumbnail Preview" className="w-full" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="w-full p-2 mt-1 rounded bg-richblack-700"
                    />
                    {errors.thumbnail && (
                        <span className="text-red-500">Thumbnail is Required</span>
                    )}
                </div>

                <div>
                    <label className="text-richblack-25 text-base">Benefits of the Course<sup className="text-pink-100">*</sup></label>
                    <textarea
                        id='courseBenefits'
                        placeholder="Enter Benefits of the Course"
                        {...register('courseBenefits', { required: true })}
                        className="w-full p-2 mt-1 rounded bg-richblack-700"
                    />
                    {errors.courseBenefits && (
                        <span className="text-red-500">Course Benefits are Required</span>
                    )}
                </div>

                <RequirementField
                    name='courseRequirements'
                    label='Requirements/Instructions'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />
            </div>

            <div className="flex justify-end mt-10 gap-6 mb-16">
                {editCourse && (
                    <button
                        type="button"
                        onClick={() => dispatch(setStep(2))}
                        className="bg-richblack-800 text-white py-2 px-4 rounded "
                    >
                        Continue Without Saving
                    </button>
                )}
                <button type="submit" className="bg-yellow-25 text-richblack-900 py-2 px-4 rounded flex flex-row items-center gap-2">
                    {!editCourse ? 'Next' : 'Save Changes'}
                    <FaAngleDoubleRight/>
                </button>
            </div>
        </form>
    );
}

export default CourseInformationForm;
