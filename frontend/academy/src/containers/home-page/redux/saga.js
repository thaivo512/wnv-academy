import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_TOP_10_COURSE_VIEW, receiveApiGetTop10CourseView,
    REQUEST_API_GET_TOP_10_COURSE_NEW, receiveApiGetTop10CourseNew,
    REQUEST_API_GET_TOP_CATEGORY_WEEK, receiveApiGetTopCategoryWeek,
    REQUEST_API_GET_TOP_COURSE_WEEK, receiveApiGetTopCourseWeek

} from './action';
import {
    requestGetTop10CourseView, 
    requestGetTop10CourseNew,
    requestGetTopCategoryWeek,
    requestGetTopCourseWeek
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


function* getTopCategoryWeekSaga() {
    try {
        const data = yield call(requestGetTopCategoryWeek);
        yield put(receiveApiGetTopCategoryWeek(data));
    } catch (e) {
        console.log(e);
    }
}


function* getTopCourseWeekSaga() {
    try {
        const data = yield call(requestGetTopCourseWeek);
        yield put(receiveApiGetTopCourseWeek(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* homepageSage() {
    yield takeLatest(REQUEST_API_GET_TOP_10_COURSE_VIEW, getTop10CoursesViewSaga);
    yield takeLatest(REQUEST_API_GET_TOP_10_COURSE_NEW, getTop10CoursesNewSaga);

    yield takeLatest(REQUEST_API_GET_TOP_CATEGORY_WEEK, getTopCategoryWeekSaga);
    
    yield takeLatest(REQUEST_API_GET_TOP_COURSE_WEEK, getTopCourseWeekSaga);
}