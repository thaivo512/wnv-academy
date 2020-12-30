import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_ALL_USERS, receiveApiGetAllUser,
} from './action';
import {
    requestGetAllUsers
} from './api';

function* getallUsersSaga() {
    try {
        const data = yield call(requestGetAllUsers);
        yield put(receiveApiGetAllUser(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* adminSaga() {
    yield takeLatest(REQUEST_API_GET_ALL_USERS, getallUsersSaga);
}
