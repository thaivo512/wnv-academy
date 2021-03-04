import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_ALL_COURSES, receiveApiGetAllCourses,
    REQUEST_API_GET_ALL_SLIDES, receiveApiGetAllSlides,
    REQUEST_API_GET_ALL_LESSONS, receiveApiGetAllLessons,
    REQUEST_API_GET_ALL_FEEDBACKS, receiveApiGetAllFeedbacks,
    REQUEST_API_GET_ALL_CATEGORIES, receiveApiGetAllCategories,
    REQUEST_API_POST_ADD_COURSE, receiveApiPostAddCourse,
    REQUEST_API_POST_UPLOAD_FILE, receiveApiPostUploadFile,
    REQUEST_API_POST_ADD_SLIDE, receiveApiPostAddSlide,
    REQUEST_API_POST_ADD_LESSON, receiveApiPostAddLesson,
    REQUEST_API_POST_UPDATE_COURSE, receiveApiPostUpdateCourse
} from './action';
import {
    requestGetAllCourses, requestGetSlidesByCourseID,
    requestGetLessonsByCourseID, requestGetFeedbacksByCourseID,
    requestGetAllCategories, requestPostAddCourse,
    requestPostUploadFile, requestPostAddSlide,
    requestPostAddLesson, requestPostUpdateCourse
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

function* postAddCourse(payload) {
    try {
        const data = yield call(requestPostAddCourse, payload);
        yield put(receiveApiPostAddCourse(data));
    } catch (e) {
        console.log(e);
    }
}

function* postUpdateCourse(payload) {
    try {
        const data = yield call(requestPostUpdateCourse, payload);
        yield put(receiveApiPostUpdateCourse(data));
    } catch (e) {
        console.log(e);
    }
}

function* postUploadFile(payload) {
    try {
        const data = yield call(requestPostUploadFile, payload);
        yield put(receiveApiPostUploadFile(data));
    } catch (e) {
        console.log(e);
    }
}

function* postAddSlide(payload) {
    try {
        const data = yield call(requestPostAddSlide, payload);
        yield put(receiveApiPostAddSlide(data));
    } catch (e) {
        console.log(e);
    }
}

function* postAddLesson(payload) {
    try {
        const data = yield call(requestPostAddLesson, payload);
        yield put(receiveApiPostAddLesson(data));
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
    yield takeLatest(REQUEST_API_POST_ADD_COURSE, postAddCourse);
    yield takeLatest(REQUEST_API_POST_UPLOAD_FILE, postUploadFile);
    yield takeLatest(REQUEST_API_POST_ADD_SLIDE, postAddSlide);
    yield takeLatest(REQUEST_API_POST_ADD_LESSON, postAddLesson);
    yield takeLatest(REQUEST_API_POST_UPDATE_COURSE, postUpdateCourse);
}
