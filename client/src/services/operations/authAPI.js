import { apiConnector } from "../apiconnector";
import { allapis } from "../api";
import { toast } from 'react-hot-toast';
import { setToken, setSignupData, setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


//logout function
export function logout(navigate) {
    return async (dispatch) => {
        dispatch(setToken(null));
        dispatch(setSignupData(null));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged Out');
        navigate('/');
    };
}

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST', allapis.SEND_OTP_API, { email});
            console.log('Sendotp API response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('OTP sent successfully');
            navigate('/verify-email');
        } catch (error) {
            console.log('Send OTP API error:', error);
            toast.error('Could not send OTP');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST', allapis.RESETPASSWORDTOKEN_API, { email });
            console.log('RESET PASSWORD token response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Reset Email Sent');
            setEmailSent(true);
        } catch (error) {
            console.log('Reset password token error:', error);
            toast.error('Error in sending email');
        }
        dispatch(setLoading(false));
    };
}

export function getPasswordReset(password, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST', allapis.RESETPASSWORD_API, { password, token });
            console.log('RESET PASSWORD response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Password reset successfully');
        } catch (error) {
            console.log('Reset password error:', error);
            toast.error('Error in resetting password');
        }
        dispatch(setLoading(false));
    };
}


//login function
export function login(userData, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Logging in...');
        try {
            const response = await apiConnector('POST', allapis.LOGIN_API, userData);
            console.log('Login API response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(setToken(token));
            dispatch(setUser(user));

            toast.success('Login successful');
            navigate('/dashboard/my-profile');
        } catch (error) {
            console.log('Login API error:', error);
            toast.error('Login failed');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function signup(userData, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        console.log(userData);
        const toastId = toast.loading('Signing up...');
        try {
            const response = await apiConnector('POST', allapis.SIGNUP_API, userData);
            console.log('Signup API response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Signup successful');
            navigate('/login');
        } catch (error) {
            console.log('Signup API error:', error);
            toast.error('Signup failed');
            navigate('/signup');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function changePassword({email, oldPassword, newPassword, navigate}) {
    
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading ...');
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await apiConnector('PUT', allapis.CHANGE_PASSWORD_API, {email, oldPassword, newPassword},headers);
            console.log('Change password API response:', response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Password changed successful');
            navigate('/dashboard/my-profile');
        } catch (error) {
            console.log('changing password error:', error);
            toast.error('Changing password failed');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}
