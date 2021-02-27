import {
    RECEIVE_API_GET_TOP_10_COURSE_VIEW,
    RECEIVE_API_GET_TOP_10_COURSE_NEW,
    RECEIVE_API_GET_TOP_CATEGORY_WEEK,
    RECEIVE_API_GET_TOP_COURSE_WEEK
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

export const requestGetTopCategoryWeekReducer = (state = {}, { type, categories }) => {
    switch (type) {
        case RECEIVE_API_GET_TOP_CATEGORY_WEEK:
            return [...categories];
        default:
            return state;
    }
}

export const requestGetTopCourseWeekReducer = (state = {}, { type, course }) => {
    switch (type) {
        case RECEIVE_API_GET_TOP_COURSE_WEEK:
            return [...course];
        default:
            return state;
    }
}