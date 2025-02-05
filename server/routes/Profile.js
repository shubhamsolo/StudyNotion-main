const express=require('express');
const router=express.Router();

const {auth, isStudent, isInstructor}=require('../middlewares/auth');
const {updateProfile, deleteAccount, getAllUserDetails, getEnrolledCourses, instructorDashboard}=require('../controllers/Profile');

router.put('/updateProfile', auth, updateProfile);
router.delete('/deleteAccount', auth, deleteAccount);
router.get('/getAllUserDetails', auth, getAllUserDetails);
router.get('/getEnrolledCourses',auth, getEnrolledCourses);
router.get('/instructorDashboard',auth, isInstructor, instructorDashboard);

module.exports=router;