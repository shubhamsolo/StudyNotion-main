const express=require('express');
const router=express.Router();

const {auth, isStudent, isAdmin, isInstructor}=require('../middlewares/auth');
const {getAllRatingAndReview, getAverageRating, createRating}=require('../controllers/RatingAndReview');
const {createCategory, getAllCategories, categoryPageDetails}=require('../controllers/Category');
const {createCourse, showAllCourses, getCourseDetails, updateCourse, deleteCourse, getStudentEnrolledCourses}=require('../controllers/Course');
const {createSection, updateSection, deleteSection}=require('../controllers/Section');
const {createSubSection, updateSubSection, deleteSubSection}=require('../controllers/SubSection');
const {updateCourseProgress}=require('../controllers/CourseProgress')

router.post('/updateCourseProgress',auth,isStudent,updateCourseProgress);

router.post('/createCourse', auth, isInstructor, createCourse);
router.get('/showAllCourses', showAllCourses);
router.get('/getCourseDetails/:courseId', auth, getCourseDetails);
router.put('/updateCourse',auth,isInstructor,updateCourse);
router.delete('/deleteCourse',auth,isInstructor,deleteCourse);
router.get('/getStudentEnrolledCourses',auth,isStudent,getStudentEnrolledCourses);

router.post('/createSection', auth, isInstructor, createSection);
router.put('/updateSection', auth, isInstructor, updateSection);
router.delete('/deleteSection', auth, isInstructor, deleteSection);

router.post('/createSubSection', auth, isInstructor, createSubSection);
router.put('/updateSubSection', auth, isInstructor, updateSubSection);
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection); 

router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/getAllCategories', getAllCategories);
router.get('/categoryPageDetails/:categoryId', categoryPageDetails);

router.post('/createRating', auth, isStudent, createRating);
router.get('/getAverageRating/:courseId', getAverageRating);
router.get('/getAllRatingAndReview', getAllRatingAndReview);

module.exports=router;