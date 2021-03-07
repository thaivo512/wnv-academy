
import { combineReducers } from "redux";
import {
    registerReducer, loginReducer,
    requestOPTReducer, verifyEmailReducer,
    loginGoogleReducer
} from "../authenicate/redux/reducer";
import { requestGetAllUsersReducer, requestDeleteUserReducer } from '../containers/admin/redux/reducer';
import {
    requestGetAllCoursesReducer, requestGetAllSlidesReducer,
    requestGetAllLessonsReducer, requestGetAllFeedbacksReducer,
    requestGetAllCategoriesReducer, requestUploadFileReducer,
    requestAddSlideReducer, requestAddLessonReducer
} from '../containers/teacher/redux/reducer';
import {
    requestGetTop10CourseViewReducer,
    requestGetTop10CourseNewReducer,
    requestGetTopCategoryWeekReducer,
    requestGetTopCourseWeekReducer
} from '../containers/home-page/redux/reducer';

import {
    requestSearchCourseReducer
} from '../containers/search-page/redux/reducer';

import {
    requestGetCourseDetailReducer,
    requestGetCourseSimilarReducer,
    requestGetSlidePreviewReducer,
    requestGetFeedbackReducer,
    requestPostFeedbackReducer,
    requestRemoveWatchlistReducer,
    requestAddWatchlistReducer,
    requestEnrolCourseReducer
} from '../containers/detail-page/redux/reducer';

import {
    requestGetInfoReducer,
    requestChangeNameReducer
} from '../containers/info-page/redux/reducer';

import {
    requestGetCourseEnroledReducer
} from '../containers/enroled-page/redux/reducer';

import {
    requestGetWatchlistReducer
} from '../containers/watchlist-page/redux/reducer';

const rootReducer = combineReducers({
    registerReducer, loginReducer, requestOPTReducer,
    verifyEmailReducer, loginGoogleReducer, requestGetAllUsersReducer,
    requestDeleteUserReducer, requestGetAllCoursesReducer,
    requestGetAllSlidesReducer, requestGetAllLessonsReducer,
    requestGetAllFeedbacksReducer, requestGetAllCategoriesReducer,
    requestGetTop10CourseViewReducer, requestGetTop10CourseNewReducer,
    requestUploadFileReducer, requestAddSlideReducer,
    requestAddLessonReducer,
    requestGetTopCategoryWeekReducer, requestGetTopCourseWeekReducer,
    requestSearchCourseReducer, requestGetCourseDetailReducer,
    requestGetCourseSimilarReducer, requestGetSlidePreviewReducer,
    requestGetFeedbackReducer, requestPostFeedbackReducer,
    requestRemoveWatchlistReducer, requestAddWatchlistReducer,
    requestEnrolCourseReducer,
    requestGetInfoReducer, requestChangeNameReducer,
    requestGetCourseEnroledReducer,
    requestGetWatchlistReducer
})

export default rootReducer;
