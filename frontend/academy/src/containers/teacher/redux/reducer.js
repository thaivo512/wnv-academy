import {
    RECEIVE_API_GET_ALL_COURSES, RECEIVE_API_GET_ALL_SLIDES,
    RECEIVE_API_GET_ALL_LESSONS, RECEIVE_API_GET_ALL_FEEDBACKS,
    RECEIVE_API_GET_ALL_CATEGORIES
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

