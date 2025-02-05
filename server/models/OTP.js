const mongoose=require('mongoose');
const mailSenderUtil = require('../utils/mailSender');

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000
    }
});

async function sendVerificationEmail(email,otp){
    try{
        const mailSender=await mailSenderUtil(email,"Verification Email from StudyNotation",otp);
    }catch{
        console.log('error in sending verification mail');
        console.log(error);
    }
}

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("OTP",OTPSchema);