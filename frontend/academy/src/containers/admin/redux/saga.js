import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_ALL_USERS, receiveApiGetAllUser,
    REQUEST_API_DELETE_USER, receiveApiDeleteUser
} from './action';
import {
    requestGetAllUsers, requestDeleteUser
} from './api';

function* getallUsersSaga() {
    try {
        const data = yield call(requestGetAllUsers);
        yield put(receiveApiGetAllUser(data));
    } catch (e) {
        console.log(e);
    }
}

function* requestDeleteUserSaga(payload) {
    try {
        const data = yield call(requestDeleteUser, payload);
        yield put(receiveApiDeleteUser(data));
    } catch (e) {
        console.log(e);
    }
}


export default function* adminSaga() {
    yield takeLatest(REQUEST_API_GET_ALL_USERS, getallUsersSaga);
    yield takeLatest(REQUEST_API_DELETE_USER, requestDeleteUserSaga);
}
