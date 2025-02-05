const CourseProgress = require('../models/CourseProgress');
const SubSection=require('../models/SubSection');

exports.updateCourseProgress=async(req,res)=>{
    try{
        const {courseId, subSectionId}=req.body;
        const {userId}=req.user.id;

        const subSection=await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:'Invalid SubSection'
            })
        }

        let courseProgress=await CourseProgress.findOne({courseId:courseId,userId:userId});
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:'Course Progree does not exist'
            })
        }

        if(courseProgress.completedVideos.includes(subSectionId)){
            return res.status(400).json({
                success:false,
                message:'SubSection already completed'
            })
        }

        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:'SubSection completed successfully'
        })

    }catch(error){
        console.log('Error in updating course progress',error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}