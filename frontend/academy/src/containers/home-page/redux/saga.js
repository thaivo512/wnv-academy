import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_TOP_10_COURSE_VIEW, receiveApiGetTop10CourseView,
    REQUEST_API_GET_TOP_10_COURSE_NEW, receiveApiGetTop10CourseNew

} from './action';
import {
    requestGetTop10CourseView, requestGetTop10CourseNew
} from './api';


function* getTop10CoursesViewSaga() {
    try {
        const data = yield call(requestGetTop10CourseView);
        yield put(receiveApiGetTop10CourseView(data));
    } catch (e) {
        console.log(e);
    }
}

function* getTop10CoursesNewSaga() {
    try {
        const data = yield call(requestGetTop10CourseNew);
        yield put(receiveApiGetTop10CourseNew(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* homepageSage() {
    yield takeLatest(REQUEST_API_GET_TOP_10_COURSE_VIEW, getTop10CoursesViewSaga);
    yield takeLatest(REQUEST_API_GET_TOP_10_COURSE_NEW, getTop10CoursesNewSaga);
}