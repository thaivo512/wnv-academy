import {
    RECEIVE_API_GET_ALL_USERS
} from './action';

export const requestGetAllUsersReducer = (state = {}, { type,  allUsers}) => {
    switch (type) {
        case RECEIVE_API_GET_ALL_USERS:
            return allUsers;
        default:
            return state;
    }
}
