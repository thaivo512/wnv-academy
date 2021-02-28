import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_COURSE_DETAIL, receiveApiGetCourseDetail,
    REQUEST_API_GET_COURSE_SIMILAR, receiveApiGetCourseSimilar,
    REQUEST_API_GET_SLIDE_PREVIEW, receiveApiGetSlidePreview,
    REQUEST_API_GET_FEEDBACK, receiveApiGetFeedback,
    REQUEST_API_POST_FEEDBACK, receiveApiPostFeedback, requestApiPostFeedback
} from './action';
import {
    requestGetCourseDetail,
    requestGetCourseSimilar,
    requestGetSlidePreview,
    requestGetFeedback,
    requestPostFeedback
} from './api';


function* getCourseDetailSaga({ id }) {
    try {
        const data = yield call(requestGetCourseDetail, id);
        yield put(receiveApiGetCourseDetail(data));
    } catch (e) {
        console.log(e);
    }
}



function* getCourseSimilarSaga({ id }) {
    try {
        const data = yield call(requestGetCourseSimilar, id);
        yield put(receiveApiGetCourseSimilar(data));
    } catch (e) {
        console.log(e);
    }
}


function* getSlidePreviewSaga({ id }) {
    try {
        const data = yield call(requestGetSlidePreview, id);
        yield put(receiveApiGetSlidePreview(data));
    } catch (e) {
        console.log(e);
    }
}


function* getFeedbackSaga({ id }) {
    try {
        const data = yield call(requestGetFeedback, id);
        yield put(receiveApiGetFeedback(data));
    } catch (e) {
        console.log(e);
    }
}


function* postFeedbackSaga({ body }) {
    try {
        const data = yield call(requestPostFeedback, body);
        yield put(receiveApiPostFeedback(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* getCourseDetailSage() {
    yield takeLatest(REQUEST_API_GET_COURSE_DETAIL, getCourseDetailSaga);

    yield takeLatest(REQUEST_API_GET_COURSE_SIMILAR, getCourseSimilarSaga);

    yield takeLatest(REQUEST_API_GET_SLIDE_PREVIEW, getSlidePreviewSaga);

    yield takeLatest(REQUEST_API_GET_FEEDBACK, getFeedbackSaga);

    yield takeLatest(REQUEST_API_POST_FEEDBACK, postFeedbackSaga);
}