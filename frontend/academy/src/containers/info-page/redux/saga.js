import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_INFO, receiveApiGetInfo,
    REQUEST_API_CHANGE_NAME, receiveApiChangeName
} from './action';
import {
    requestGetInfo,
    requestChangeName
} from './api';


function* requestInfoSaga() {
    try {
        const data = yield call(requestGetInfo);
        yield put(receiveApiGetInfo(data));
    } catch (e) {
        console.log(e);
    }
}


function* changeNameSaga({ name }) {
    try {
        const data = yield call(requestChangeName, name);
        yield put(receiveApiChangeName(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* getInfoSaga() {
    yield takeLatest(REQUEST_API_GET_INFO, requestInfoSaga);

    yield takeLatest(REQUEST_API_CHANGE_NAME, changeNameSaga);
}