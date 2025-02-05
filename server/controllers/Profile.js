const User=require('../models/User');
const Profile=require('../models/Profile');
const Course=require('../models/Course');
const RatingAndReview=require('../models/RatingAndReview')
const {uploadImageToCloudinary}=require('../utils/imageUploder');

exports.updateProfile=async(req,res)=>{
    try{
        const {dateOfBirth, about, contactNumber, gender}=req.body;
        const userId=req.user.id;
        
        const userDetails=await User.findById(userId);
        
        const profileId=userDetails.profileDetails;
        
        const profileDetails=await Profile.findById(profileId);
        
        if(dateOfBirth)profileDetails.dateOfBirth=dateOfBirth;
        if(about)profileDetails.about=about;
        if(contactNumber)profileDetails.contactNumber=contactNumber;
        if(gender)profileDetails.gender=gender;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            profileDetails
        });
    }catch(error){
        console.log('error in updating profile');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong while updating profile'
        });
    }
}




exports.deleteAccount=async(req,res)=>{
    try{
        const userId=req.user.id;
        
        const userDetails=await User.findById(userId);
        
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }

        await Profile.findByIdAndDelete({_id:userDetails.profileDetails});

        await RatingAndReview.deleteMany({ user: userId });

        await Course.updateMany(
            { studentEnrolled: userId },
            { $pull: { studentEnrolled: userId } }
        );

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success:true,
            message:'Account deleted successfully'
        })
    }catch(error){
        console.log('error in deleting profile');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong while deleting profile'
        });
    }
}




exports.getAllUserDetails=async(req,res)=>{
    try{
        const userId=req.user.id;
        
        const userDetails=await User.findById(userId).populate('profileDetails').exec();

        return res.status(200).json({
            success:true,
            message:'User details fetched successfully',
            data:userDetails
        });
    }catch(error){
        console.log('error in fetching user details');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong fetching user details'
        });
    }
}




exports.updateProfilePicture=async(req,res)=>{
    try{
        const displayPicture=req.files.displayPicture;
        const userId=req.user.id;
        const image=await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        const updatedProfile=await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:'Image uploaded successfully',
            user:updatedProfile
        })
    }catch(error){
        console.log('error in updating profile picture');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong updating profile picture'
        });
    }
}




exports.getEnrolledCourses=async(req,res)=>{
    try{
        const userId=req.user.id;
        const userDetails=await User.findOne({
            _id:userId
        }).populate('courses').exec();

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'Could not find user'
            })
        }
        return res.status(200).json({
            success:true,
            data:userDetails.courses
        })
    }catch(error){
        console.log('error in fetching enrolle course');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};




exports.instructorDashboard=async(req,res)=>{
    try{
        const userId=req.user.id;
        const courseDeatils=await Course.find({instructor:userId});

        const courseData=courseDeatils.map((course)=>{
            const totalStudentsEnrolled=course.studentsEnrolled.length;
            const totalAmountGenerated=totalStudentsEnrolled*course.price;

            const courseDataWithStats={
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats;
        })

        return res.status(200).json({
            success:true,
            courses:courseData
        })

    }catch(error){
        console.log('error in fetching intsructor dashboard data');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}