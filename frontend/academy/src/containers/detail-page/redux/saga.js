import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_COURSE_DETAIL, receiveApiGetCourseDetail,
    REQUEST_API_GET_COURSE_SIMILAR, receiveApiGetCourseSimilar,
    REQUEST_API_GET_SLIDE_PREVIEW, receiveApiGetSlidePreview,
    REQUEST_API_GET_FEEDBACK, receiveApiGetFeedback,
    REQUEST_API_POST_FEEDBACK, receiveApiPostFeedback, 
    REQUEST_API_REMOVE_WATCHLIST, receiveApiRemoveWatchlist,
    REQUEST_API_ADD_WATCHLIST, receiveApiAddWatchlist,
    REQUEST_API_ENROL_COURSE, receiveApiEnrolCourse,
    REQUEST_API_GET_LESSON_PREVIEW, receiveApiGetLessonPreview
} from './action';
import {
    requestGetCourseDetail,
    requestGetCourseSimilar,
    requestGetSlidePreview,
    requestGetFeedback,
    requestPostFeedback,
    requestRemoveWatchlist,
    requestAddWatchlist,
    requestEnrolCourse,
    requestGetLessonPreview
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


function* removeWatchlistSaga({ id }) {
    try {
        const data = yield call(requestRemoveWatchlist, id);
        yield put(receiveApiRemoveWatchlist(data));
    } catch (e) {
        console.log(e);
    }
}

function* addWatchlistSaga({ id }) {
    try {
        const data = yield call(requestAddWatchlist, id);
        yield put(receiveApiAddWatchlist(data));
    } catch (e) {
        console.log(e);
    }
}

function* enrolCourseSaga({ id }) {
    try {
        const data = yield call(requestEnrolCourse, id);
        yield put(receiveApiEnrolCourse(data));
    } catch (e) {
        console.log(e);
    }
}


function* getLessonPreviewSaga({ id }) {
    try {
        const data = yield call(requestGetLessonPreview, id);
        yield put(receiveApiGetLessonPreview(data));
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

    yield takeLatest(REQUEST_API_REMOVE_WATCHLIST, removeWatchlistSaga);

    yield takeLatest(REQUEST_API_ADD_WATCHLIST, addWatchlistSaga);

    yield takeLatest(REQUEST_API_ENROL_COURSE, enrolCourseSaga);

    yield takeLatest(REQUEST_API_GET_LESSON_PREVIEW, getLessonPreviewSaga);
}