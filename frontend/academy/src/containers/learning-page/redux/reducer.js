import {
    RECEIVE_API_GET_COURSE_LEARNING,
    RECEIVE_API_GET_SLIDE_LEARNING,
    RECEIVE_API_GET_LESSON_LEARNING,
    RECEIVE_API_MARK_DONE_LESSON
} from './action';


export const requestGetCourseLearningReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_COURSE_LEARNING:
            return data;
        default:
            return state;
    }
}


export const requestGetSlideLearningReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_SLIDE_LEARNING:
            return data;
        default:
            return state;
    }
}

export const requestGetLessonLearningReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_LESSON_LEARNING:
            return data;
        default:
            return state;
    }
}

export const requestMarkDoneLessonReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_MARK_DONE_LESSON:
            return data;
        default:
            return state;
    }
}