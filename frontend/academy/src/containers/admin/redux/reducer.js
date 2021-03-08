import {
    RECEIVE_API_GET_ALL_USERS, RECEIVE_API_DELETE_USER,
    RECEIVE_API_GET_ALL_COURSES_ADMIN
} from './action';

export const requestGetAllUsersReducer = (state = {}, { type, allUsers }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_USERS:
            return [...allUsers];
        default:
            return state;
    }
}

export const requestGetAllCoursesAdminReducer = (state = {}, { type, allCourses }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_COURSES_ADMIN:
            return [...allCourses];
        default:
            return state;
    }
}

export const requestDeleteUserReducer = (state = {}, { type, result }) => {
    switch (type) {
        case RECEIVE_API_DELETE_USER:
            return result;
        default:
            return state;
    }
}
