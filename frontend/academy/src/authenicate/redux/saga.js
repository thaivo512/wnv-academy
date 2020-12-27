import { call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_API_REGISTER, receiveApiRegister,
    REQUEST_API_LOGIN, receiveApiLogin,
    REQUEST_API_OPT, receiveApiOPT,
    REQUEST_API_VERIFY_EMAIL, receiveApiVerify,
    REQUEST_API_LOGIN_GOOGLE, receiveApiLoginGoole
} from './action';
import {
    registerApi, loginApi,
    requestOptToEmailApi, verifyYourEmailApi,
    loginWithGoogle
} from './api';

function* postRegisterSaga(action) {
    try {
        const data = yield call(registerApi, action.payload);
        yield put(receiveApiRegister(data));
    } catch (e) {
        console.log(e);
    }
}

function* postLoginSaga(action) {
    try {
        const data = yield call(loginApi, action.payload);
        yield put(receiveApiLogin(data))
    } catch (e) {
        console.log(e);
    }
}

function* postRequestOPTSaga(action) {
    try {
        const data = yield call(requestOptToEmailApi, action.payload);
        yield put(receiveApiOPT(data))
    } catch (e) {
        console.log(e);
    }
}

function* postVerifyEmailSaga(action) {
    try {
        const data = yield call(verifyYourEmailApi, action.payload);
        yield put(receiveApiVerify(data))
    } catch (e) {
        console.log(e);
    }
}

function* postLoginByGoogle(action) {
    try {
        const data = yield call(loginWithGoogle, action.payload);
        yield put(receiveApiLoginGoole(data))
    } catch (e) {
        console.log(e);
    }
}

export default function* authenicateSaga() {
    yield takeLatest(REQUEST_API_REGISTER, postRegisterSaga);
    yield takeLatest(REQUEST_API_LOGIN, postLoginSaga);
    yield takeLatest(REQUEST_API_OPT, postRequestOPTSaga);
    yield takeLatest(REQUEST_API_VERIFY_EMAIL, postVerifyEmailSaga);
    yield takeLatest(REQUEST_API_LOGIN_GOOGLE, postLoginByGoogle);
}