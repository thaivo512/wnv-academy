export const REQUEST_API_GET_TOP_10_COURSE_VIEW = "REQUEST_API_GET_TOP_10_COURSE_VIEW";
export const RECEIVE_API_GET_TOP_10_COURSE_VIEW = "RECEIVE_API_GET_TOP_10_COURSE_VIEW";

export const requestApiGetTop10CourseView = () => ({ type: REQUEST_API_GET_TOP_10_COURSE_VIEW });
export const receiveApiGetTop10CourseView = courses => ({ type: RECEIVE_API_GET_TOP_10_COURSE_VIEW, courses });


export const REQUEST_API_GET_TOP_10_COURSE_NEW = "REQUEST_API_GET_TOP_10_COURSE_NEW";
export const RECEIVE_API_GET_TOP_10_COURSE_NEW = "RECEIVE_API_GET_TOP_10_COURSE_NEW";

export const requestApiGetTop10CourseNew = () => ({ type: REQUEST_API_GET_TOP_10_COURSE_NEW });
export const receiveApiGetTop10CourseNew = courses => ({ type: RECEIVE_API_GET_TOP_10_COURSE_NEW, courses });

export const REQUEST_API_GET_TOP_CATEGORY_WEEK = "REQUEST_API_GET_TOP_CATEGORY_WEEK";
export const RECEIVE_API_GET_TOP_CATEGORY_WEEK = "RECEIVE_API_GET_TOP_CATEGORY_WEEK";

export const requestApiGetTopCategoryWeek = () => ({ type: REQUEST_API_GET_TOP_CATEGORY_WEEK });
export const receiveApiGetTopCategoryWeek = categories => ({ type: RECEIVE_API_GET_TOP_CATEGORY_WEEK, categories });


export const REQUEST_API_GET_TOP_COURSE_WEEK = "REQUEST_API_GET_TOP_COURSE_WEEK";
export const RECEIVE_API_GET_TOP_COURSE_WEEK = "RECEIVE_API_GET_TOP_COURSE_WEEK";

export const requestApiGetTopCourseWeek = () => ({ type: REQUEST_API_GET_TOP_COURSE_WEEK });
export const receiveApiGetTopCourseWeek = course => ({ type: RECEIVE_API_GET_TOP_COURSE_WEEK, course });