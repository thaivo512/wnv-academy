import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_ALL_USERS, receiveApiGetAllUser,
    REQUEST_API_DELETE_USER, receiveApiDeleteUser,
    REQUEST_API_ADD_TEACHER,
    REQUEST_API_GET_ALL_COURSES_ADMIN, receiveApiGetAllCoursesAdmin
} from './action';
import {
    requestGetAllUsers, requestDeleteUser,
    requestPostAddUser, requestGetAllCourses
} from './api';

function* getallUsersSaga() {
    try {
        const data = yield call(requestGetAllUsers);
        yield put(receiveApiGetAllUser(data));
    } catch (e) {
        console.log(e);
    }
}

function* getallCoursesSaga() {
    try {
        const data = yield call(requestGetAllCourses);
        yield put(receiveApiGetAllCoursesAdmin(data));
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


function* requestAddUser(payload) {
    try {
        yield call(requestPostAddUser, payload);
    } catch (e) {
        console.log(e);
    }
}

export default function* adminSaga() {
    yield takeLatest(REQUEST_API_GET_ALL_USERS, getallUsersSaga);
    yield takeLatest(REQUEST_API_DELETE_USER, requestDeleteUserSaga);
    yield takeLatest(REQUEST_API_ADD_TEACHER, requestAddUser);
    yield takeLatest(REQUEST_API_GET_ALL_COURSES_ADMIN, getallCoursesSaga);
}
