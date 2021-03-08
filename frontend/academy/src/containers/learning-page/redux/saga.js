import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_COURSE_LEARNING, receiveApiGetCourseLearning,
    REQUEST_API_GET_SLIDE_LEARNING, receiveApiGetSlideLearning,
    REQUEST_API_GET_LESSON_LEARNING, receiveApiGetLessonLearning,
    REQUEST_API_MARK_DONE_LESSON, receiveApiMarkDoneLesson,
    REQUEST_API_TRACKING_LESSON
} from './action';
import {
    requestGetCourseLearning,
    requestGetSlideLearning,
    requestGetLessonLearning,
    requestMarkDoneLesson,
    requestTrackingLesson
} from './api';


function* getCourseLearningSaga({ id }) {
    try {
        const data = yield call(requestGetCourseLearning, id);
        yield put(receiveApiGetCourseLearning(data));
    } catch (e) {
        console.log(e);
    }
}


function* getSlideLearningSaga({ id }) {
    try {
        const data = yield call(requestGetSlideLearning, id);
        yield put(receiveApiGetSlideLearning(data));
    } catch (e) {
        console.log(e);
    }
}


function* getLessonLearningSaga({ id }) {
    try {
        const data = yield call(requestGetLessonLearning, id);
        yield put(receiveApiGetLessonLearning(data));
    } catch (e) {
        console.log(e);
    }
}


function* markDoneLessonSaga({ id }) {
    try {
        const data = yield call(requestMarkDoneLesson, id);
        yield put(receiveApiMarkDoneLesson(data));
    } catch (e) {
        console.log(e);
    }
}


function* trackingLessonSaga({ body }) {
    try {
        yield call(requestTrackingLesson, body);
    } catch (e) {
        console.log(e);
    }
}



export default function* getCourseLearningSage() {
    yield takeLatest(REQUEST_API_GET_COURSE_LEARNING, getCourseLearningSaga);


    yield takeLatest(REQUEST_API_GET_SLIDE_LEARNING, getSlideLearningSaga);


    yield takeLatest(REQUEST_API_GET_LESSON_LEARNING, getLessonLearningSaga);


    yield takeLatest(REQUEST_API_MARK_DONE_LESSON, markDoneLessonSaga);


    yield takeLatest(REQUEST_API_TRACKING_LESSON, trackingLessonSaga);
}