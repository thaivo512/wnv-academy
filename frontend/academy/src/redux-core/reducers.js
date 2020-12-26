
import { combineReducers } from "redux";
import { registerReducer, loginReducer, requestOPTReducer, verifyEmailReducer } from "../authenicate/redux/reducer";

const rootReducer = combineReducers({
    registerReducer, loginReducer, requestOPTReducer,
    verifyEmailReducer
})

export default rootReducer;