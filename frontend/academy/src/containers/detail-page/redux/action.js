export const REQUEST_API_GET_COURSE_DETAIL = "REQUEST_API_GET_COURSE_DETAIL";
export const RECEIVE_API_GET_COURSE_DETAIL = "RECEIVE_API_GET_COURSE_DETAIL";

export const requestApiGetCourseDetail = id => ({ type: REQUEST_API_GET_COURSE_DETAIL, id });
export const receiveApiGetCourseDetail = data => ({ type: RECEIVE_API_GET_COURSE_DETAIL, data });

export const REQUEST_API_GET_COURSE_SIMILAR = "REQUEST_API_GET_COURSE_SIMILAR";
export const RECEIVE_API_GET_COURSE_SIMILAR = "RECEIVE_API_GET_COURSE_SIMILAR";

export const requestApiGetCourseSimilar = id => ({ type: REQUEST_API_GET_COURSE_SIMILAR, id });
export const receiveApiGetCourseSimilar = data => ({ type: RECEIVE_API_GET_COURSE_SIMILAR, data });