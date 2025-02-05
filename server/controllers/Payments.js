const { default: mongoose } = require('mongoose');
const {instance}=require('../config/razorpay');
const Course=require('../models/Course');
const User=require('../models/User');
const mailSender=require('../utils/mailSender');
require('dotenv').config();
const crypto=require('crypto')
const {courseEnrollmentEmail} =require( '../mail/templates/courseEnrollmentEmail');
const CourseProgress = require('../models/CourseProgress');

exports.capturePayment = async(req,res)=>{
    try{
        const {courses}=req.body;
        const userId=req.user.id;

        if(courses.length===0){
            return res.status(400).json({
                success:false,
                message:'Please provide course Id'
            })
        }

        let totalAmount=0;

        for(const course_id of courses){
            const course=await Course.findById(course_id);
            if(!course){
                return res.status(404).json({
                    success:false,
                    message:'Could not found'
                })
            }

            const uid=new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:'student is already enrolled'
                })
            }

            totalAmount+=course.price;
        }

        const options={
            amount:totalAmount*100,
            currency:'INR',
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courses,
                userId
            }
        }

        const paymentResponse=await instance.orders.create(options);

        return res.status(200).json({
            success:true,
            message:paymentResponse
        })

    }catch(error){
        console.log('error in capturing payment');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}



exports.verifySignature=async(req,res)=>{
    try{    
        const razorpay_order_id=req.body?.razorpay_order_id;
        const razorpay_payment_id=req.body?.razorpay_payment_id;
        const razorpay_signature=req.body?.razorpay_signature;
        const courses=req.body?.courses;
        const userId=req.user.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
            return res.status(404).json({
                success:false,
                message:'Payment Failed'
            })
        }

        let body=razorpay_order_id+'|'+razorpay_payment_id;
        const expectedSignature=crypto
            .createHmac('sha256',process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');
        if(expectedSignature===razorpay_signature){
            for(const courseId of courses){
                const enrolledCourse=await Course.findOneAndUpdate(
                                {_id:courseId},
                                {$push:{studentsEnrolled:userId}},
                                {new:true}
                );
                    
                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:'Course not found'
                    });
                }

                const courseProgress=await CourseProgress.create({
                    courseId:courseId,
                    userId:userId,
                    completedVideos:[]
                })
    
                const enrollledStudent=await User.findOneAndUpdate(
                                    {_id:userId},
                                    {$push:{
                                        courses:courseId,
                                        courseProgress:courseProgress._id
                                    }},
                                    {new:true}
                );
    
                if(!enrollledStudent){
                    return res.status(500).json({
                        success:false,
                        message:'User not found'
                    });
                }

                const emailResponse=await mailSender(
                    enrollledStudent.email,
                    `Successfully Enrolled into ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(enrolledCourse.courseName,`${enrollledStudent.firstName}`)
                )
            }

            return res.status(200).json({
                success:true,
                message:'Payment Verified'
            })
        }
        return res.status(200).json({
            success:true,
            message:'Payment Failed'
        })
    }catch(error){
        console.log('error in verifying signature');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}



exports.sendPaymentSuccessEmail=async(req,res)=>{
    try{
        const {orderId, paymentId, amount}=req.body;
        const userId=req.user.id;

        if(!orderId || !paymentId || !amount || !userId){
            return res.status(400).json({
                success:false,
                message:'please provide all the fields'
            })
        }

        const enrollStudent=await User.findById(userId);
        await mailSender(enrollStudent.email,'Payment Received','Your payment has done successfully and u have been added in new courses');

    }catch(error){
        console.log('Error in sending payment successfull mail',error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



// exports.capturePayment=async(req,res)=>{
//     const {courseId}=req.body;
//     const userId=req.body.id;

//     let course;
//     try{
//         course=await Course.findById(courseId);
//         if(!course){
//             return res.status(404).json({
//                 success:false,
//                 message:'Course did not find'
//             });
//         }

//         const uid=new mongoose.Types.ObjectId(userId);
//         if(course.studentEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:'Student is already enrolled'
//             });
//         }
//     }catch(error){
//         console.log('error in capturing payment');
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:'Internal server error'
//         });
//     }

//     const amount=course.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId,
//             userId
//         }
//     };

//     try{
//         const paymentResponse=await instance.orders.create(options);

//         return res.sttus(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount
//         })
//     }catch(error){
//         console.log('error in capturing payment');
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:'Internal server error'
//         });
//     }
// };



// exports.verifySignature=async(req,res)=>{
//     const webBookSecret=process.env.WEB_BOOK_SECRET;

//     const signature=req.headers['x-razorpay-signature'];

//     const shasum=crypto.createHmac("sha256",webBookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(signature==digest){
//         console.log('Payment is autorised');

//         const {userId, courseId}=req.body.payload.payment.entity.notes;

//         try{
//             const enrolledCourse=await Course.findByOneAndUpdate(
//                             {_id:courseId},
//                             {$push:{studentEnrolled:userId}},
//                             {new:true}
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:'Course not found'
//                 });
//             }

//             const enrollledStudent=await User.findByOneAndUpdate(
//                                 {_id:userId},
//                                 {$push:{courses:courseId}},
//                                 {new:true}
//             );

//             if(!enrollledStudent){
//                 return res.status(500).json({
//                     success:false,
//                     message:'User not found'
//                 });
//             }

//             const emailResponse=mailSender(
//                             enrollledStudent.email, 
//                             'Congratulation',
//                             'You have enrolled in new course'
//                         );

//             return res.status(200).json({
//                 success:true,
//                 message:'Signature varified successfully'
//             });

//         }catch(error){
//             console.log('error in verifying signature');
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:'Internal server error'
//             });
//         }
//     }else{
//             return res.status(400).json({
//                 success:false,
//                 message:'Invalid signature'
//             });
//     }
// }