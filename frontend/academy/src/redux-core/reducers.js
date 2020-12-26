
import { combineReducers } from "redux";
import { registerReducer, loginReducer, requestOPTReducer, verifyEmailReducer, loginGoogleReducer } from "../authenicate/redux/reducer";

const rootReducer = combineReducers({
    registerReducer, loginReducer, requestOPTReducer,
    verifyEmailReducer, loginGoogleReducer
})

export default rootReducer;