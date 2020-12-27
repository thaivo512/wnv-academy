
import { all, fork } from "redux-saga/effects";
import authenicateSaga from '../authenicate/redux/saga';

export default function* rootSaga() {
    yield all([
        fork(authenicateSaga),
    ]);
}