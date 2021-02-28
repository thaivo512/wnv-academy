import {
    RECEIVE_API_GET_ALL_COURSES, RECEIVE_API_GET_ALL_SLIDES,
    RECEIVE_API_GET_ALL_LESSONS, RECEIVE_API_GET_ALL_FEEDBACKS,
    RECEIVE_API_GET_ALL_CATEGORIES, RECEIVE_API_POST_UPLOAD_FILE,
    RECEIVE_API_POST_ADD_SLIDE, RECEIVE_API_POST_ADD_LESSON
} from './action';

export const requestGetAllCoursesReducer = (state = {}, { type, courses }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_COURSES:
            return [...courses];
        default:
            return state;
    }
}

export const requestGetAllSlidesReducer = (state = {}, { type, slides }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_SLIDES:
            return [...slides];
        default:
            return state;
    }
}

export const requestGetAllLessonsReducer = (state = {}, { type, lessons }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_LESSONS:
            return [...lessons];
        default:
            return state;
    }
}

export const requestGetAllFeedbacksReducer = (state = {}, { type, feedbacks }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_FEEDBACKS:
            return [...feedbacks];
        default:
            return state;
    }
}

export const requestGetAllCategoriesReducer = (state = {}, { type, categories }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_CATEGORIES:
            return [...categories];
        default:
            return state;
    }
}

export const requestUploadFileReducer = (state = {}, { type, fileResult }) => {
    switch (type) {
        case RECEIVE_API_POST_UPLOAD_FILE:
            return fileResult;
        default:
            return state;
    }
}

export const requestAddSlideReducer = (state = {}, { type, slideResult }) => {
    switch (type) {
        case RECEIVE_API_POST_ADD_SLIDE:
            return slideResult;
        default:
            return state;
    }
}

export const requestAddLessonReducer = (state = {}, { type, lessonResult }) => {
    switch (type) {
        case RECEIVE_API_POST_ADD_LESSON:
            return lessonResult;
        default:
            return state;
    }
}



