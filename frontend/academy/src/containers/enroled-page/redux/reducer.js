import {
    RECEIVE_API_GET_COURSE_ENROLED
} from './action';


export const requestGetCourseEnroledReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_COURSE_ENROLED:
            return data;
        default:
            return state;
    }
}