import {
    RECEIVE_API_GET_COURSE_DETAIL,
    RECEIVE_API_GET_COURSE_SIMILAR
} from './action';


export const requestGetCourseDetailReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_COURSE_DETAIL:
            return data;
        default:
            return state;
    }
}


export const requestGetCourseSimilarReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_COURSE_SIMILAR:
            return data;
        default:
            return state;
    }
}
