import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_COURSE_LEARNING, receiveApiGetCourseLearning,
    REQUEST_API_GET_SLIDE_LEARNING, receiveApiGetSlideLearning,
    REQUEST_API_GET_LESSON_LEARNING, receiveApiGetLessonLearning
} from './action';
import {
    requestGetCourseLearning,
    requestGetSlideLearning,
    requestGetLessonLearning
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


export default function* getCourseLearningSage() {
    yield takeLatest(REQUEST_API_GET_COURSE_LEARNING, getCourseLearningSaga);


    yield takeLatest(REQUEST_API_GET_SLIDE_LEARNING, getSlideLearningSaga);


    yield takeLatest(REQUEST_API_GET_LESSON_LEARNING, getLessonLearningSaga);
}