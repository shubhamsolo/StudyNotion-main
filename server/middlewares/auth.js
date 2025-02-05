const jwt=require('jsonwebtoken');
const User=require('../models/User');
require('dotenv').config();

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            });
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is Invalid"
            });
        }
        next();
    }catch(error){
        console.log('error in authprisation',error);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        });
    }
}


exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Student only"
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role connot be varified"
        });
    }
}



exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor only"
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role connot be varified"
        });
    }
}



exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only"
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role connot be varified"
        });
    }
}