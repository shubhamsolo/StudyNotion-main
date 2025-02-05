import React, { useEffect, useState } from "react";
import  { useForm } from 'react-hook-form';


function ContactFormsection({heading, description}){
    const [loading,setLoading]=useState(false);
    const {
        register, 
        handleSubmit, 
        reset, 
        formState:{errors, isSubmitSuccessful}
    }=useForm();

    const submitContactForm=async(data)=>{
        console.log('contact from data...',data);
        // api call
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:'',
                firstName:'',
                lastName:'',
                message:'',
                contactNumber:''
            })
        }
    },[isSubmitSuccessful,reset])

    return (
        <div className="flex flex-col justify-center items-center mx-auto gap-2">
            <h1 className="text-4xl font-semibold text-white">{heading}</h1>
            <p className="text-richblack-300">{description}</p>
            <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-4 mt-14">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-richblack-25" htmlFor="firstName">First name</label>
                        <input
                            className="w-[200px] bg-richblack-800 h-10 rounded p-4"
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder="Enter first name"
                            {...register('firstName',{required:true})}
                        />
                        {
                            errors.firstName && (
                                <span>Please enter Your first name</span>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-richblack-25" htmlFor="lastname">Last name</label>
                        <input
                            className="w-[200px] bg-richblack-800 h-10 rounded p-4"
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder="Enter last name"
                            {...register('lastName')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-richblack-25" htmlFor="email">Email Address</label>
                    <input
                        className=" bg-richblack-800 h-10 rounded p-4"
                        type='email'
                        name='email'
                        id='email'
                        placeholder="Enter email address"
                        {...register('email',{required:true})}
                    />
                    {
                        errors.email && (
                            <span>Please enter Your email address</span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-richblack-25" htmlFor="contactNumber">Phone Number</label>
                    <input
                        className="bg-richblack-800 h-10 rounded p-4"
                        type='tel'
                        name='contactNumber'
                        id='contactNumber'
                        placeholder="Enter phone number"
                        {...register('contactNumber',{required:true})}
                    />
                    {
                        errors.contactNumber && (
                            <span>Please enter Your phone number</span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-richblack-25" htmlFor="message">Message</label>
                    <textarea
                        className=" bg-richblack-800 h-20 rounded p-4"
                        type='text'
                        name='message'
                        id='message'
                        placeholder="Enter message"
                        {...register('message',{required:true})}
                    />
                    {
                        errors.message && (
                            <span>Please enter Your message</span>
                        )
                    }
                </div>
                <button type="submit" className="mt-4 text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200">Send Message</button>
            </form>
        </div>
    )
}

export default ContactFormsection;