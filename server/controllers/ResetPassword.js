const User=require('../models/User');
const mailSender=require('../utils/mailSender');
const bcrypt=require('bcrypt');


exports.resetPasswordToken=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'Your email is not registered'
            })
        }
        const token=crypto.randomUUID();
        const updatedDetails=await User.findOneAndUpdate({email:email},{token:token, resetPasswordExpires:Date.now()+5*60*1000},{new:true});

        const url=`http://localhost:3000/update-password/${token}`
        await mailSender(email,'Password Reset link',`Password reset link: ${url}`);

        return res.status(200).json({
            success:true,
            message:'Email sent successfully. Please check email and change password',
            token
        })
    }catch(error){
        console.log('error in sending mail for reseting password');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending mail for reset password'
        })
    }
}




exports.resetPassword=async(req,res)=>{
    try{
        const {token,password}=req.body;

        const userDetails=await User.findOne({token:token});

        if(!userDetails){
            return res.json({
                success:false,
                message:'Token is Invalid'
            });
        }

        if(userDetails.resetPasswordExpires<Date.now()){
            return res.json({
                success:false,
                message:'Token is Expired. Please regenerate your token'
            });
        }

        const hashedPassword=await bcrypt.hash(password,10);

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:'Password reset successfully'
        })
    }catch(error){
        console.log('Error in reseting password while sending mail');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reseting password on mail send'
        });
    }
}