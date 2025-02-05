const mongoose=require('mongoose');
require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Db connected successfully"))
    .catch((error)=>{
        console.log('Error in db connection');
        console.log(error);
        process.exit(1);
    })
}