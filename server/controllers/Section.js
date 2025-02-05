const Course = require('../models/Course');
const Section = require('../models/Section');

// Create Section
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;
        const newSection = await Section.create({ sectionName });

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        ).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection',
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            data: updatedCourseDetails,
        });

    } catch (error) {
        console.error('Error in creating section:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating Section',
        });
    }
};

// Update Section
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;

        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

        const updatedCourse = await Course.findOne({ courseContent: sectionId })
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection',
                }
            });

        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            data: updatedCourse,
        });

    } catch (error) {
        console.error('Error in updating section:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating Section',
        });
    }
};

// Delete Section
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId } = req.body;
        await Section.findByIdAndDelete(sectionId);

        const updatedCourse = await Course.findOneAndUpdate(
            { courseContent: sectionId },
            { $pull: { courseContent: sectionId } },
            { new: true }
        ).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection',
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully',
            data: updatedCourse,
        });

    } catch (error) {
        console.error('Error in deleting section:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting Section',
        });
    }
};
