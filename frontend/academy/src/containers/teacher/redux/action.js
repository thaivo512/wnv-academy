export const REQUEST_API_GET_ALL_COURSES = "REQUEST_API_GET_ALL_COURSES";
export const RECEIVE_API_GET_ALL_COURSES = "RECEIVE_API_GET_ALL_COURSES";

export const requestApiGetAllCourses = () => ({ type: REQUEST_API_GET_ALL_COURSES });
export const receiveApiGetAllCourses = courses => ({ type: RECEIVE_API_GET_ALL_COURSES, courses });

export const REQUEST_API_GET_ALL_SLIDES = "REQUEST_API_GET_ALL_SLIDES";
export const RECEIVE_API_GET_ALL_SLIDES = "RECEIVE_API_GET_ALL_SLIDES";

export const requestApiGetAllSlides = (id) => ({ type: REQUEST_API_GET_ALL_SLIDES, id });
export const receiveApiGetAllSlides = slides => ({ type: RECEIVE_API_GET_ALL_SLIDES, slides });

export const REQUEST_API_GET_ALL_LESSONS = "REQUEST_API_GET_ALL_LESSONS";
export const RECEIVE_API_GET_ALL_LESSONS = "RECEIVE_API_GET_ALL_LESSONS";

export const requestApiGetAllLessons = (id) => ({ type: REQUEST_API_GET_ALL_LESSONS, id });
export const receiveApiGetAllLessons = lessons => ({ type: RECEIVE_API_GET_ALL_LESSONS, lessons });

export const REQUEST_API_GET_ALL_FEEDBACKS = "REQUEST_API_GET_ALL_FEEDBACKS";
export const RECEIVE_API_GET_ALL_FEEDBACKS = "RECEIVE_API_GET_ALL_FEEDBACKS";

export const requestApiGetAllFeedbacks = (id) => ({ type: REQUEST_API_GET_ALL_FEEDBACKS, id });
export const receiveApiGetAllFeedbacks = feedbacks => ({ type: RECEIVE_API_GET_ALL_FEEDBACKS, feedbacks });