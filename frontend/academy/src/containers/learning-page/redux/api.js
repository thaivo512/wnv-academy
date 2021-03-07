import { exec } from '../../../redux-core/api';

export const requestGetCourseLearning = async (id) => {
    return exec({
        method: 'GET',
        path: `course-search/${id}`
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
