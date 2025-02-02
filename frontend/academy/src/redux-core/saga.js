
import { all, fork } from "redux-saga/effects";
import authenicateSaga from '../authenicate/redux/saga';
import adminSaga from '../containers/admin/redux/saga';
import courseSaga from '../containers/teacher/redux/saga';
import homepageSage from '../containers/home-page/redux/saga';
import searchpageSage from '../containers/search-page/redux/saga';
import getCourseDetailSage from '../containers/detail-page/redux/saga';
import getInfoSaga from '../containers/info-page/redux/saga';
import courseEnroledSage from '../containers/enroled-page/redux/saga';
import watchlistSage from '../containers/watchlist-page/redux/saga';
import getCourseLearningSage from '../containers/learning-page/redux/saga';

export default function* rootSaga() {
    yield all([
        fork(authenicateSaga),
        fork(adminSaga),
        fork(courseSaga),
        fork(homepageSage),
        fork(searchpageSage),
        fork(getCourseDetailSage),
        fork(getInfoSaga),
        fork(courseEnroledSage),
        fork(watchlistSage),
        fork(getCourseLearningSage)
    ]);
}
