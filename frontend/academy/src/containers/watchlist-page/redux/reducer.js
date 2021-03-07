import {
    RECEIVE_API_GET_WATCHLIST
} from './action';


export const requestGetWatchlistReducer = (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_GET_WATCHLIST:
            return data;
        default:
            return state;
    }
}