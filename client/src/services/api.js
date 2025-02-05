const BASE_URL = process.env.REACT_APP_BASE_URL;

export const allapis = {
    // Authentication APIs
    LOGIN_API: `${BASE_URL}/auth/login`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    SEND_OTP_API: `${BASE_URL}/auth/sendotp`,
    CHANGE_PASSWORD_API: `${BASE_URL}/auth/changePassword`,
    RESET_PASSWORD_TOKEN_API: `${BASE_URL}/auth/resetPasswordToken`,
    RESET_PASSWORD_API: `${BASE_URL}/auth/resetPassword`,

    // Profile APIs
    UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`,
    DELETE_ACCOUNT_API: `${BASE_URL}/profile/deleteAccount`,
    USER_DETAILS_API: `${BASE_URL}/profile/getAllUserDetails`,
    USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/getEnrolledCourses`,
    GET_INSTRUCTOR_DATA_API: `${BASE_URL}/profile/instructorDashboard`,

    // Course APIs
    CREATE_COURSE_API: `${BASE_URL}/course/createCourse`,
    SHOW_ALL_COURSES_API: `${BASE_URL}/course/showAllCourses`,
    GET_COURSE_DETAILS_API: `${BASE_URL}/course/getCourseDetails`,
    UPDATE_COURSE_API: `${BASE_URL}/course/updateCourse`,
    DELETE_COURSE_API: `${BASE_URL}/course/deleteCourse`,
    GET_STUDENT_ENROLLED_COURSES_API: `${BASE_URL}/course/getStudentEnrolledCourses`,
    LECTURE_COMPLETE_API: `${BASE_URL}/course/updateCourseProgress`,

    // Section APIs
    CREATE_SECTION_API: `${BASE_URL}/course/createSection`,
    UPDATE_SECTION_API: `${BASE_URL}/course/updateSection`,
    DELETE_SECTION_API: `${BASE_URL}/course/deleteSection`,

    // SubSection APIs
    CREATE_SUBSECTION_API: `${BASE_URL}/course/createSubSection`,
    UPDATE_SUBSECTION_API: `${BASE_URL}/course/updateSubSection`,
    DELETE_SUBSECTION_API: `${BASE_URL}/course/deleteSubSection`,

    // Category APIs
    GET_ALL_CATEGORIES_API: `${BASE_URL}/course/getAllCategories`,
    CATEGORY_PAGE_DETAILS_API: `${BASE_URL}/course/categoryPageDetails`,

    // Rating APIs
    CREATE_RATING_API: `${BASE_URL}/course/createRating`,
    GET_AVERAGE_RATING_API: `${BASE_URL}/course/getAverageRating`,
    GET_ALL_RATING_REVIEW_API: `${BASE_URL}/course/getAllRatingAndReview`,

    // Payment APIs
    CAPTURE_PAYMENT_API: `${BASE_URL}/payment/capturePayemt`,
    VERIFY_SIGNATURE_API: `${BASE_URL}/payment/verifySignature`,
    SEND_PAYMENT_SUCCESS_EMAIL_API: `${BASE_URL}/payment/sendPaymentSuccessEmail`,
};
