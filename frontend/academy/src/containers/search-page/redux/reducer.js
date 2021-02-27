import {
    RECEIVE_API_SEARCH_COURSE,
} from './action';

export const requestSearchCourseReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_SEARCH_COURSE:
            return data;
        default:
            return state;
    }
}
