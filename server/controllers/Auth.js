const User=require('../models/User');
const OTP=require('../models/OTP');
const Profile=require('../models/Profile');
const otpGenerator=require('otp-generator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mailSender=require('../utils/mailSender');
require('dotenv').config();

exports.sendOTP=async(req,res)=>{
    try{
        const {email}=req.body;

        const checkUserPresent=await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            })
        }

        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        
        let result=await OTP.findOne({otp:otp});

        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
    
            result=await OTP.findOne({otp:otp});    
        }

        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            message:'OTP sent successfully',
            otp
        })
    }catch(error){
        console.log('Error in sending otp');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.signUp=async (req,res)=>{
    try{
        const {firstName, lastName, email, password, accountType, contactNumber, otp}=req.body;

        const existinUser=await User.findOne({email});
        if(existinUser){
            return res.status(400).json({
                success:false,
                message:'User already registered'
            });
        }

        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:'OTP not found'
            });
        }else if(recentOtp[0].otp!=otp){
            return res.status(400).json({
                success:false,
                message:'Invalid OTP'
            });
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });

        const user=await User.create({
            firstName, 
            lastName, 
            email, 
            contactNumber, 
            password:hashedPassword, 
            accountType, 
            profileDetails:profileDetails._id, 
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:'User registered successfully',
            user
        })
    }catch(error){
        console.log('Error in signing Up');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered. Please try again'
        })
    }
}



exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email}).populate('profileDetails').exec();
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered'
            });
        }

        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            };
            const token=jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'2h'});
            user.token=token;
            user.password=undefined;

            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            };
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully'
            })
        }else{
            return res.status(401).json({
                success:false,
                message:'Invalid Password'
            })
        }
    }catch(error){
        console.log('Error in loging In');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'LogIn failed. Please try again'
        })
    }
}



exports.changePassword=async(req,res)=>{
    try{
        const {email, oldPassword, newPassword}=req.body;

        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered'
            });
        }

        if(await bcrypt.compare(oldPassword,user.password)){
            const hashedPassword=await bcrypt.hash(newPassword,10);
            
            await User.findByIdAndUpdate(user._id,{password:hashedPassword},{new:true});

            await mailSender(email,"Password Update","<h2>Password Updated Successfully</h2>");

            return res.status(200).json({
                success:true,
                message:'Password updated successflly'
            });
        }else{
            return res.status(401).json({
                success:false,
                message:'Old Password did not match'
            })
        }
    }catch(error){
        console.log('Error in changing password');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Password can not be changed. Please try again'
        })
    }
}