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

export const REQUEST_API_GET_ALL_CATEGORIES = "REQUEST_API_GET_ALL_CATEGORIES";
export const RECEIVE_API_GET_ALL_CATEGORIES = "RECEIVE_API_GET_ALL_CATEGORIES";

export const requestApiGetAllCategories = () => ({ type: REQUEST_API_GET_ALL_CATEGORIES });
export const receiveApiGetAllCategories = categories => ({ type: RECEIVE_API_GET_ALL_CATEGORIES, categories });

export const REQUEST_API_POST_ADD_COURSE = "REQUEST_API_POST_ADD_COURSE";
export const RECEIVE_API_POST_ADD_COURSE = "RECEIVE_API_POST_ADD_COURSE";

export const requestApiPostAddCourse = (course) => ({ type: REQUEST_API_POST_ADD_COURSE, course });
export const receiveApiPostAddCourse = result => ({ type: RECEIVE_API_POST_ADD_COURSE, result });