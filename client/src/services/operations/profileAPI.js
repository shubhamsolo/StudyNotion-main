import { apiConnector } from "../apiconnector";
import { allapis } from "../api";
import { toast } from 'react-hot-toast';
import {  setLoading, setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";


export function updateProfile({dateOfBirth, about, contactNumber, gender, navigate}) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await apiConnector('PUT', allapis.UPDATE_PROFILE_API, { dateOfBirth, about, contactNumber, gender},headers);
            // console.log('Update Profile API response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            let user=JSON.parse(localStorage.getItem('user'))
            user.profileDetails=response.data.profileDetails;
            dispatch(setUser(user))

            navigate('/dashboard/my-profile')
            toast.success('Profile Updated Successfully');
        } catch (error) {
            console.log('Updating profile error:', error);
            toast.error('Could not update Profile');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function deleteProfile({navigate}) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await apiConnector('DELETE', allapis.DELETE_ACCOUNT_API,null,headers);
            // console.log('Delete Profile API response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch(logout());

            navigate('/')
            toast.success('Profile Deleted Successfully');
        } catch (error) {
            console.log('Deleting  profile error:', error);
            toast.error('Could not delete Profile');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}


export function getUserDetails({ setUser }) {
    return async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await apiConnector('GET', allapis.USER_DETAILS_API,null, headers);
            // console.log('GET_ALL_USER_DETAILS_API response ...', response);
            setUser(response.data.data);
        } catch (error) {
            console.log('GET_ALL_USER_DETAILS_API error', error);
        }
    };
}

export async function getUserEnrolledCourses({token,setEnrolledCourses}){
    // const toastId=toast.loading('Loading...')
    try{
        const response=await apiConnector(
            'GET',
            allapis.USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        // console.log('user enrolled courses api response',response)
        setEnrolledCourses(response.data.data);
    }catch(error){
        console.log('GET_ALL_USER_DETAILS_API error', error);
    }
    // toast.dismiss(toastId);
}



export async function getInstructorData(token) {
    const toastId = toast.loading('Loading...');

    let result = [];
    try {
        const response = await apiConnector('GET', allapis.GET_INSTRUCTOR_DATA_API, null, { Authorization: `Bearer ${token}` });
        console.log('GET_INSTRUCTOR_DATA_API response', response);
        result = response?.data?.courses;
    } catch (error) {
        console.log('GET_INSTRUCTOR_DATA_API error', error);
        toast.error('Could not get Instructor data');
    }
    toast.dismiss(toastId);
    return result;
}
