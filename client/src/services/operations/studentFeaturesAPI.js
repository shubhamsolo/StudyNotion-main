import toast from "react-hot-toast";
import { allapis } from "../api";
import { apiConnector } from "../apiconnector";
import tempImage from '../../assets/images/about1.png';
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement('script');
        script.src=src;

        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);  // Corrected line
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId = toast.loading('Loading...');
    try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            toast.error('Razorpay SDK failed to load');
            toast.dismiss(toastId);
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const orderResponse = await apiConnector('POST', allapis.CAPTURE_PAYMENT_API, { courses }, headers);

        // console.log('CAPTURE_PAYMENT_API response ...', orderResponse);

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: 'StudyNotion',
            description: 'Thank You for Purchasing the course',
            image: tempImage,
            prefill: {
                name: `${userDetails.firstName}`,
                email: `${userDetails.email}`
            },
            handler: function(response) {
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', function(response) {
            toast.error('Oops, payment failed');
        });
    } catch (error) {
        console.log('payment api response', error);
        toast.error(error?.response?.data?.message || 'Could not make payment');
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token){
    try {
        await apiConnector('POST', allapis.SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        });
    } catch (error) {
        console.log('SEND_PAYMENT_SUCCESS_EMAIL_API error...', error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading('Verifying Payment ...');
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector('POST', allapis.VERIFY_SIGNATURE_API, bodyData, { Authorization: `Bearer ${token}` });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success('Payment Successful, you are added to the course');
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());
    } catch (error) {
        // console.log('VERIFY_SIGNATURE_API error...', error);
        toast.error('Could not verify Payment');
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
