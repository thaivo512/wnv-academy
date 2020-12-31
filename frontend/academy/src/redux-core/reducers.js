
import { combineReducers } from "redux";
import { registerReducer, loginReducer, requestOPTReducer, verifyEmailReducer, loginGoogleReducer } from "../authenicate/redux/reducer";
import { requestGetAllUsersReducer, requestDeleteUserReducer } from '../containers/admin/redux/reducer';

const rootReducer = combineReducers({
    registerReducer, loginReducer, requestOPTReducer,
    verifyEmailReducer, loginGoogleReducer, requestGetAllUsersReducer,
    requestDeleteUserReducer
})

export default rootReducer;
