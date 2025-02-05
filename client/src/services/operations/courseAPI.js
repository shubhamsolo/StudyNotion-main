import { apiConnector } from "../apiconnector";
import { allapis } from "../api";
import {toast} from 'react-hot-toast';

// Fetching All Courses
export async function getAllCourses() {
    try {
        const response = await apiConnector('GET', allapis.SHOW_ALL_COURSES_API);
        console.log('SHOW_ALL_COURSES_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('SHOW_ALL_COURSES_API error', error);
        throw error;
    }
}

// Creating a Course
export async function createCourse({ formData, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('POST', allapis.CREATE_COURSE_API, formData, headers);
        // console.log('CREATE_COURSE_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('CREATE_COURSE_API error', error);
        throw error;
    }
}

// Updating a Course
export async function updateCourse({ formData, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('PUT', allapis.UPDATE_COURSE_API, formData, headers);
        // console.log('UPDATE_COURSE_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('UPDATE_COURSE_API error', error);
        throw error;
    }
}


// Deleting a Course
export async function deleteCourse({courseId, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('DELETE', allapis.DELETE_COURSE_API, {courseId}, headers);
        // console.log('DELETE_COURSE_API response ...', response);
        return response;
    } catch (error) {
        console.log('DELETE_COURSE_API error', error);
        throw error;
    }
}

// Getting Course Details
export async function getCourseDetails({ courseId , token }) {
    try {
        const response = await apiConnector(
            'GET',
            `${allapis.GET_COURSE_DETAILS_API}/${courseId}`,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );
        // console.log('GET_COURSE_DETAILS_API response ...', response);
        return response.data;
    } catch (error) {
        console.log('GET_COURSE_DETAILS_API error', error);
        throw error;
    }
}


// Fetching All Categories
export async function getAllCategories() {
    try {
        const response = await apiConnector('GET', allapis.GET_ALL_CATEGORIES_API);
        // console.log('GET_ALL_CATEGORIES_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('GET_ALL_CATEGORIES_API error', error);
    }
}

// Creating a Section
export async function createSection({ formData, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('POST', allapis.CREATE_SECTION_API, formData, headers);
        // console.log('CREATE_SECTION_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('CREATE_SECTION_API error', error);
        throw error;
    }
}

// Updating a Section
export async function updateSection({ formData, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('PUT', allapis.UPDATE_SECTION_API, formData, headers);
        // console.log('UPDATE_SECTION_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('UPDATE_SECTION_API error', error);
        throw error;
    }
}

// Deleting a Section
export async function deleteSection({ sectionId, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('DELETE', allapis.DELETE_SECTION_API, { sectionId }, headers);
        // console.log('DELETE_SECTION_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('DELETE_SECTION_API error', error);
        throw error;
    }
}

// Creating a SubSection
export async function createSubSection({ formData, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('POST', allapis.CREATE_SUBSECTION_API, formData, headers);
        // console.log('CREATE_SUBSECTION_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('CREATE_SUBSECTION_API error', error);
        throw error;
    }
}

// Updating a SubSection
export async function updateSubSection({ formData, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('PUT', allapis.UPDATE_SUBSECTION_API, formData, headers);
        // console.log('UPDATE_SUBSECTION_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('UPDATE_SUBSECTION_API error', error);
        throw error;
    }
}

// Deleting a SubSection
export async function deleteSubSection({ subSectionId, token }) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await apiConnector('DELETE', allapis.DELETE_SUBSECTION_API, { subSectionId }, headers);
        // console.log('DELETE_SUBSECTION_API response ...', response);
        return response.data.data;
    } catch (error) {
        console.log('DELETE_SUBSECTION_API error', error);
        throw error;
    }
}


// Get Category Page Details
export async function getCatalogPageData(categoryId){
    const toastId=toast.loading('Loading...')
    let result=[];
    try{
        const response=await apiConnector('GET',`${allapis.CATEGORY_PAGE_DETAILS_API}/${categoryId}`)
        // console.log('CATEGORY_PAGE_DETAILS_API response',response);
        if(!response?.data?.success){
            throw new Error('Could not fetch category page data');
        }
        result=response?.data;
    }catch(error){
        console.log('CATEGORY_PAGE_DETAILS_API error',error);
        toast.error(error.message);
        result=error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}



// Get Average  Rating
export async function getAverageRating(courseId){
    try{
        const response=await apiConnector('GET',`${allapis.GET_AVERAGE_RATING_API}/${courseId}`);
        // console.log('GET_AVERAGE_RATING_API response',response);
        return response.data.averageRating;
    }catch(error){
        console.log('CATEGORY_PAGE_DETAILS_API error',error);
        toast.error(error.message);
    }
}


export async function getStudentEnrolledCourses({token}){
    try{
        const response=await apiConnector('GET',allapis.GET_STUDENT_ENROLLED_COURSES_API,null,{Authorization:`Bearer ${token}`});
        // console.log('GET_STUDENT_ENROLLED_COURSES_API response',response);
        return response.data.data;
    }catch(error){
        console.log('CATEGORY_PAGE_DETAILS_API error',error);
        toast.error(error.message);
    }
}



export async function createRating(data,token){
    try{
        const response=await apiConnector('POST',allapis.CREATE_RATING_API,data,{Authorization:`Bearer ${token}`});
        // console.log('CREATE_RATING_API response',response);
        toast.success('Course Rated Successfully');
        return response;
    }catch(error){
        console.log('CREATE_RATING_API error',error);
        toast.error(error.message);
    }
}



export async function getAllRatingAndReview(){
    try{
        const response=await apiConnector('GET',allapis.GET_ALL_RATING_REVIEW_API);
        console.log('GET_ALL_RATING_REVIEW_API response',response);
        return response.data.data;
    }catch(error){
        console.log('CREATE_RATING_API error',error);
    }
}



export async function markLectureComplete(data,token){
    let result=null;
    console.log('marking complete data',data);
    const toastId=toast.loading('Loading...')
    try{
        const response=await apiConnector('POST',allapis.LECTURE_COMPLETE_API,data,{Authorization:`Bearer ${token}`})
        console.log('LECTURE_COMPLETE_API response',response);

        if(!response.data.message){
            throw new Error(response.data.error)
        }


        toast.success('Lecture Completed')
        result=true;
    }catch(error){
        console.log('LECTURE_COMPLETE_API api error',error);
        toast.error(error.message);
        result=false
    }
    toast.dismiss(toastId);
    return result
}