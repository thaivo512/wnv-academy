
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
    requestGetAllCategoriesReducer
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
    requestPostFeedbackReducer
} from '../containers/detail-page/redux/reducer';



const rootReducer = combineReducers({
    registerReducer, loginReducer, requestOPTReducer,
    verifyEmailReducer, loginGoogleReducer, requestGetAllUsersReducer,
    requestDeleteUserReducer, requestGetAllCoursesReducer,
    requestGetAllSlidesReducer, requestGetAllLessonsReducer,
    requestGetAllFeedbacksReducer, requestGetAllCategoriesReducer,
    requestGetTop10CourseViewReducer, requestGetTop10CourseNewReducer,
    requestGetTopCategoryWeekReducer, requestGetTopCourseWeekReducer,
    requestSearchCourseReducer, requestGetCourseDetailReducer,
    requestGetCourseSimilarReducer, requestGetSlidePreviewReducer,
    requestGetFeedbackReducer, requestPostFeedbackReducer
})

export default rootReducer;
