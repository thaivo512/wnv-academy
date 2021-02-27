import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_COURSE_DETAIL, receiveApiGetCourseDetail,
    REQUEST_API_GET_COURSE_SIMILAR, receiveApiGetCourseSimilar
} from './action';
import {
    requestGetCourseDetail,
    requestGetCourseSimilar
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

export default function* getCourseDetailSage() {
    yield takeLatest(REQUEST_API_GET_COURSE_DETAIL, getCourseDetailSaga);

    yield takeLatest(REQUEST_API_GET_COURSE_SIMILAR, getCourseSimilarSaga);
}