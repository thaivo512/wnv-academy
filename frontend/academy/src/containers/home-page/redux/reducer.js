import {
    RECEIVE_API_GET_TOP_10_COURSE_VIEW,
    RECEIVE_API_GET_TOP_10_COURSE_NEW
} from './action';

export const requestGetTop10CourseViewReducer = (state = {}, { type, courses }) => {
    switch (type) {
        case RECEIVE_API_GET_TOP_10_COURSE_VIEW:
            return [...courses];
        default:
            return state;
    }
}


export const requestGetTop10CourseNewReducer = (state = {}, { type, courses }) => {
    switch (type) {
        case RECEIVE_API_GET_TOP_10_COURSE_NEW:
            return [...courses];
        default:
            return state;
    }
}