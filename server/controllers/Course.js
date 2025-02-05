const Course = require('../models/Course');
const Section=require('../models/Section');
const SubSection=require('../models/SubSection');
const Category = require('../models/Category');
const User = require('../models/User');
const CourseProgress = require('../models/CourseProgress');
const { uploadImageToCloudinary } = require('../utils/imageUploder');
require('dotenv').config();

exports.createCourse = async (req, res) => {
    try {
        
        const { courseName, courseDescription, whatYouWillLearn, price, tag, category, instructions } = req.body;
        const thumbnail = req.files.thumbnailImage;
        const userId = req.user.id;

        const categoryDetails = await Category.findOne({ _id: category });

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'Category Details not found'
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: userId,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            tag: tag,
            thumbnail: thumbnailImage.secure_url,
            instructions: instructions
        });
        // console.log(newCourse);

        await User.findByIdAndUpdate(userId, { $push: { courses: newCourse._id } }, { new: true });

        await Category.findByIdAndUpdate(categoryDetails._id, { $push: { courses: newCourse._id } }, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Course created successfully',
            data: newCourse
        });
    } catch (error) {
        console.log('Error in creating course');
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating course',
            error: error.message
        });
    }
};

exports.getStudentEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const userWithCourses = await User.findById(userId)
            .populate({
                path: 'courses',
                populate: {
                    path: 'courseContent',
                    populate: {
                        path: 'subSection'
                    }
                }
            }).exec();

        if (!userWithCourses) {
            return res.status(404).json({
                success: false,
                message: "User not found or no courses enrolled"
            });
        }

        const courseIds = userWithCourses.courses.map(course => course._id);
        const progressData = await CourseProgress.find({ userId, courseId: { $in: courseIds } }).exec();

        const progressMap = progressData.reduce((acc, progress) => {
            acc[progress.courseId] = progress.completedSubSections;
            return acc;
        }, {});

        const coursesData = userWithCourses.courses.map(course => {
            let totalDuration = 0;
            let totalSubSections = 0;
            let completedSubSections = 0;

            course.courseContent.forEach(section => {
                section.subSection.forEach(subSection => {
                    const duration = subSection.timeDuration;
                    totalDuration += duration;
                    totalSubSections += 1;
                    
                    if (progressMap[course._id]?.includes(subSection._id)) {
                        completedSubSections += 1;
                    }
                });
            });

            const progressPercentage = totalSubSections > 0 ? (completedSubSections / totalSubSections) * 100 : 0;

            return {
                totalDuration,
                progressPercentage,
                course
            };
        });

        return res.status(200).json({
            success: true,
            data: coursesData
        });

    } catch (error) {
        console.log('Error in fetching user courses', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({status:'Published'}, {
            courseName: true,
            courseDescription:true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }).populate('instructor').exec();

        return res.status(200).json({
            success: true,
            message: 'All courses data fetched successfully',
            data: allCourses
        });
    } catch (error) {
        console.log('Error in fetching all courses');
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching all courses'
        });
    }
};

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;
        if(!courseId){
            return res.status(401).json({
                success:false,
                message:'provide courseId'
            })
        }
        const courseDetails = await Course.findOne({ _id: courseId })
            .populate({
                path: 'instructor',
                populate: {
                    path: 'profileDetails'
                }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection',
                }
            })
            .exec();

        let courseProgressCount=await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Could not find course with given courseId'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Course Details fetched successfully',
            courseDetails,
            completedVideos:courseProgressCount?.completedVideos?courseProgressCount?.completedVideos:[],
        });
    } catch (error) {
        console.log('Error in fetching course details');
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { courseId, courseName, courseDescription, whatYouWillLearn, price, tag, category, instructions, status } = req.body;
        const thumbnail = req.files ? req.files.thumbnailImage : null;
        const userId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (category) {
            const categoryDetails = await Category.findOne({ _id: category });
            if (!categoryDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
            course.category = categoryDetails._id;
        }

        if (thumbnail) {
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        course.courseName = courseName || course.courseName;
        course.courseDescription = courseDescription || course.courseDescription;
        course.whatYouWillLearn = whatYouWillLearn || course.whatYouWillLearn;
        course.price = price || course.price;
        course.tag = tag  || course.tag;
        course.instructions = instructions  || course.instructions;
        course.status = status || course.status

        await course.save();

        return res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: course
        });
    } catch (error) {
        console.log('Error in updating course');
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating course',
            error: error.message
        });
    }
};


exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (course.instructor.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to delete this course'
            });
        }

        if (course.status !== 'Drafted') {
            return res.status(400).json({
                success: false,
                message: 'Only drafted courses can be deleted'
            });
        }

        // Delete associated subsections
        const sections = course.courseContent;
        for (const sectionId of sections) {
            const section = await Section.findById(sectionId);
            if (section) {
                await SubSection.deleteMany({ _id: { $in: section.subSection } });
            }
        }

        // Delete associated sections
        await Section.deleteMany({ _id: { $in: sections } });

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        // Update user and category
        await User.findByIdAndUpdate(userId, { $pull: { courses: courseId } });
        await Category.findByIdAndUpdate(course.category, { $pull: { courses: courseId } });

        return res.status(200).json({
            success: true,
            message: 'Course and associated sections and subsections deleted successfully'
        });
    } catch (error) {
        console.log('Error in deleting course', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting course',
            error: error.message
        });
    }
};