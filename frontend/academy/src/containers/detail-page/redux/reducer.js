import {
    RECEIVE_API_GET_COURSE_DETAIL,
    RECEIVE_API_GET_COURSE_SIMILAR,
    RECEIVE_API_GET_SLIDE_PREVIEW,
    RECEIVE_API_GET_FEEDBACK,
    RECEIVE_API_POST_FEEDBACK,
    RECEIVE_API_REMOVE_WATCHLIST,
    RECEIVE_API_ADD_WATCHLIST,
    RECEIVE_API_ENROL_COURSE,
    RECEIVE_API_GET_LESSON_PREVIEW
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


export const requestRemoveWatchlistReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_REMOVE_WATCHLIST:
            return data;
        default:
            return state;
    }
}


export const requestAddWatchlistReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_ADD_WATCHLIST:
            return data;
        default:
            return state;
    }
}


export const requestEnrolCourseReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_ENROL_COURSE:
            return data;
        default:
            return state;
    }
}


export const requestGetLessonPreviewReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_LESSON_PREVIEW:
            return data;
        default:
            return state;
    }
}