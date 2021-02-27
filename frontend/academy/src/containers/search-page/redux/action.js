export const REQUEST_API_SEARCH_COURSE = "REQUEST_API_SEARCH_COURSE";
export const RECEIVE_API_SEARCH_COURSE = "RECEIVE_API_SEARCH_COURSE";

export const requestApiSearchCourse = params => ({ type: REQUEST_API_SEARCH_COURSE, params });
export const receiveApiSearchCourse = data => ({ type: RECEIVE_API_SEARCH_COURSE, data });