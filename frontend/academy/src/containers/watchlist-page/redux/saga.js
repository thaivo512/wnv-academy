import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_WATCHLIST, receiveApiGetWatchlist
} from './action';
import {
    requestGetWatchlist
} from './api';


function* getWatchlistSaga() {
    try {
        const data = yield call(requestGetWatchlist);
        console.log(data)
        yield put(receiveApiGetWatchlist(data));
    } catch (e) {
        console.log(e);
    }
}




export default function* watchlistSage() {
    
    yield takeLatest(REQUEST_API_GET_WATCHLIST, getWatchlistSaga);
    
}