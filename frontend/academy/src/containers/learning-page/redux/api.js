import { exec } from '../../../redux-core/api';

export const requestGetCourseLearning = async (id) => {
    return exec({
        method: 'GET',
        path: `course-search/learn/${id}`
    });
}

export const requestGetSlideLearning = async (id) => {
    return exec({
        method: 'GET',
        path: `slide/${id}`
    });
}

export const requestGetLessonLearning = async (id) => {
    return exec({
        method: 'GET',
        path: `lesson/learn/${id}`
    });
}


export const requestMarkDoneLesson = async (id) => {
    return exec({
        method: 'POST',
        path: `progress/done/${id}`
    });
}


export const requestTrackingLesson = async (body) => {
    return exec({
        method: 'POST',
        path: `progress/tracking`,
        body: body
    });
}
