import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_ALL_COURSES, receiveApiGetAllCourses,
    REQUEST_API_GET_ALL_SLIDES, receiveApiGetAllSlides,
    REQUEST_API_GET_ALL_LESSONS, receiveApiGetAllLessons,
    REQUEST_API_GET_ALL_FEEDBACKS, receiveApiGetAllFeedbacks,
    REQUEST_API_GET_ALL_CATEGORIES, receiveApiGetAllCategories,
    REQUEST_API_POST_ADD_COURSE, receiveApiPostAddCourse

} from './action';
import {
    requestGetAllCourses, requestGetSlidesByCourseID,
    requestGetLessonsByCourseID, requestGetFeedbacksByCourseID,
    requestGetAllCategories, requestPostAddCourse
} from './api';

function* getAllCoursesSaga() {
    try {
        const data = yield call(requestGetAllCourses);
        yield put(receiveApiGetAllCourses(data));
    } catch (e) {
        console.log(e);
    }
}

function* getAllSlidesSaga(id) {
    try {
        const data = yield call(requestGetSlidesByCourseID, id);
        yield put(receiveApiGetAllSlides(data));
    } catch (e) {
        console.log(e);
    }
}

function* getAllLessonsSaga(id) {
    try {
        const data = yield call(requestGetLessonsByCourseID, id);
        yield put(receiveApiGetAllLessons(data));
    } catch (e) {
        console.log(e);
    }
}

function* getAllFeedbacksSaga(id) {
    try {
        const data = yield call(requestGetFeedbacksByCourseID, id);
        yield put(receiveApiGetAllFeedbacks(data));
    } catch (e) {
        console.log(e);
    }
}

function* getAllCategories() {
    try {
        const data = yield call(requestGetAllCategories);
        yield put(receiveApiGetAllCategories(data));
    } catch (e) {
        console.log(e);
    }
}


export default function* courseSaga() {
    yield takeLatest(REQUEST_API_GET_ALL_COURSES, getAllCoursesSaga);
    yield takeLatest(REQUEST_API_GET_ALL_SLIDES, getAllSlidesSaga);
    yield takeLatest(REQUEST_API_GET_ALL_LESSONS, getAllLessonsSaga);
    yield takeLatest(REQUEST_API_GET_ALL_FEEDBACKS, getAllFeedbacksSaga);
    yield takeLatest(REQUEST_API_GET_ALL_CATEGORIES, getAllCategories);
}
