import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_GET_COURSE_ENROLED, receiveApiGetCourseEnroled
} from './action';
import {
    requestGetCourseEnroled
} from './api';


function* getCourseEnroledSaga() {
    try {
        const data = yield call(requestGetCourseEnroled);
        yield put(receiveApiGetCourseEnroled(data));
    } catch (e) {
        console.log(e);
    }
}




export default function* courseEnroledSage() {
    
    yield takeLatest(REQUEST_API_GET_COURSE_ENROLED, getCourseEnroledSaga);
    
}