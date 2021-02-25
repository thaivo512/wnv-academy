
import { all, fork } from "redux-saga/effects";
import authenicateSaga from '../authenicate/redux/saga';
import adminSaga from '../containers/admin/redux/saga';
import courseSaga from '../containers/teacher/redux/saga';
import homepageSage from '../containers/home-page/redux/saga';

export default function* rootSaga() {
    yield all([
        fork(authenicateSaga),
        fork(adminSaga),
        fork(courseSaga),
        fork(homepageSage)
    ]);
}
