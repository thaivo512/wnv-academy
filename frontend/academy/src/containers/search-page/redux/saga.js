import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_SEARCH_COURSE, receiveApiSearchCourse,
} from './action';
import {
    requestSearchCourse
} from './api';


function* searchCourseSaga({ params }) {
    try {
        const data = yield call(requestSearchCourse, params);
        yield put(receiveApiSearchCourse(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* searchCourseSage() {
    yield takeLatest(REQUEST_API_SEARCH_COURSE, searchCourseSaga);
}