import {
    RECEIVE_API_GET_COURSE_DETAIL,
    RECEIVE_API_GET_COURSE_SIMILAR,
    RECEIVE_API_GET_SLIDE_PREVIEW,
    RECEIVE_API_GET_FEEDBACK,
    RECEIVE_API_POST_FEEDBACK
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




export const requestGetSlidePreviewReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_SLIDE_PREVIEW:
            return data;
        default:
            return state;
    }
}


export const requestGetFeedbackReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_FEEDBACK:
            return data;
        default:
            return state;
    }
}



export const requestPostFeedbackReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_POST_FEEDBACK:
            return data;
        default:
            return state;
    }
}
