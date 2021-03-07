export const REQUEST_API_GET_COURSE_ENROLED = "REQUEST_API_GET_COURSE_ENROLED";
export const RECEIVE_API_GET_COURSE_ENROLED = "RECEIVE_API_GET_COURSE_ENROLED";

export const requestApiGetCourseEnroled = () => ({ type: REQUEST_API_GET_COURSE_ENROLED });
export const receiveApiGetCourseEnroled = data => ({ type: RECEIVE_API_GET_COURSE_ENROLED, data });