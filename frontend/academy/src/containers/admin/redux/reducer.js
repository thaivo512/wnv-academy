import {
    RECEIVE_API_GET_ALL_USERS, RECEIVE_API_DELETE_USER
} from './action';

export const requestGetAllUsersReducer = (state = {}, { type, allUsers }) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_USERS:
            return [...allUsers];
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
