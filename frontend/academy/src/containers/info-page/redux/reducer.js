import {
    RECEIVE_API_GET_INFO,
    RECEIVE_API_CHANGE_NAME
} from './action';

export const requestGetInfoReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_INFO:
            return data;
        default:
            return state;
    }
}

export const requestChangeNameReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_CHANGE_NAME:
            return data;
        default:
            return state;
    }
}
