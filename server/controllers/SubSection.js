const SubSection=require('../models/SubSection');
const Section=require('../models/Section');
const {uploadImageToCloudinary}=require('../utils/imageUploder');
require('dotenv').config();


exports.createSubSection=async(req,res)=>{
    try{
        const {sectionId, title, description, timeDuration}=req.body;

        const video=req.files.videoFile;
        
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const subSectionDetails=await SubSection.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:uploadDetails.secure_url
        });

        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
                                                             {$push:{subSection:subSectionDetails._id}},
                                                             {new:true})
                                                             .populate('subSection')
                                                             .exec();

        return res.status(200).json({
            success:true,
            message:'SubSection created successfully',
            data:updatedSection
        })
    }catch(error){
        console.log('error while creating subSection');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while creating SubSection'
        })
    }
}




exports.updateSubSection=async(req,res)=>{
    try{
        const {subSectionId, title, description, timeDuration}=req.body;
        const video=req.files?.videoFile;
        
        const subSection=await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:'subsection not found'
            })
        }
        
        const uploadDetails=video?await uploadImageToCloudinary(video,process.env.FOLDER_NAME):null;

        const subSectionDetails=await SubSection.findByIdAndUpdate(
            subSectionId,
        {
            title:title||subSection.title,
            description:description||subSection.description,
            timeDuration:timeDuration||subSection.timeDuration,
            videoUrl:uploadDetails?uploadDetails.secure_url:subSection.videoUrl
        },{new:true});

        const updatedSection=await Section.findOne({ subSection: subSectionId }).populate('subSection')

        return res.status(200).json({
            success:true,
            message:'SubSection updated successfully',
            data:updatedSection
        })
    }catch(error){
        console.log('error while updating subSection');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while updating SubSection'
        })
    }
}





exports.deleteSubSection=async(req,res)=>{
    try{
        const {subSectionId}=req.body;

        await SubSection.findByIdAndDelete(subSectionId);

        const updatedSection = await Section.findOneAndUpdate(
            { subSection: subSectionId },
            { $pull: { subSection: subSectionId } },
            { new: true }
        ).populate('subSection');

        return res.status(200).json({
            success:true,
            message:'SubSection deleted successfully',
            data:updatedSection
        })
    }catch(error){
        console.log('error while deleting subSection');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while deleting SubSection'
        })
    }
}