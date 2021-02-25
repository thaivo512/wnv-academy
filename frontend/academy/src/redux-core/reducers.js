
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
    requestGetTop10CourseNewReducer
} from '../containers/home-page/redux/reducer';

const rootReducer = combineReducers({
    registerReducer, loginReducer, requestOPTReducer,
    verifyEmailReducer, loginGoogleReducer, requestGetAllUsersReducer,
    requestDeleteUserReducer, requestGetAllCoursesReducer,
    requestGetAllSlidesReducer, requestGetAllLessonsReducer,
    requestGetAllFeedbacksReducer, requestGetAllCategoriesReducer,
    requestGetTop10CourseViewReducer, requestGetTop10CourseNewReducer
})

export default rootReducer;
