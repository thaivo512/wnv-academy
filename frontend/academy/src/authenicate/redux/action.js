export const REQUEST_API_LOGIN = "REQUEST_API_LOGIN";
export const RECEIVE_API_LOGIN = "RECEIVE_API_LOGIN";

export const REQUEST_API_LOGIN_GOOGLE = "REQUEST_API_LOGIN_GOOGLE";
export const RECEIVE_API_LOGI_GOOGLE = "RECEIVE_API_LOGIN_GOOGLE";

export const REQUEST_API_REGISTER = "REQUEST_API_REGISTER";
export const RECEIVE_API_REGISTER = "RECEIVE_API_REGISTER";

export const REQUEST_API_OPT = "REQUEST_API_OPT";
export const RECEIVE_API_OPT = "RECEIVE_API_OPT";

export const REQUEST_API_VERIFY_EMAIL = "REQUEST_API_VERIFY_EMAIL";
export const RECEIVE_API_VERIFY_EMAIL = "RECEIVE_API_VERIFY_EMAIL";

export const requestApiLogin = payload => ({ type: REQUEST_API_LOGIN, payload });
export const receiveApiLogin = loginInformation => ({ type: RECEIVE_API_LOGIN, loginInformation });

export const requestApiRegister = payload => ({ type: REQUEST_API_REGISTER, payload });
export const receiveApiRegister = registerInformation => ({ type: RECEIVE_API_REGISTER, registerInformation });

export const requestApiOPT = payload => ({ type: REQUEST_API_OPT, payload });
export const receiveApiOPT = optInformation => ({ type: RECEIVE_API_OPT, optInformation });

export const requestApiVerify = payload => ({ type: REQUEST_API_VERIFY_EMAIL, payload });
export const receiveApiVerify = verifyInformation => ({ type: RECEIVE_API_VERIFY_EMAIL, verifyInformation });

export const requestApiLoginGoogle = payload => ({ type: REQUEST_API_LOGIN_GOOGLE, payload });
export const receiveApiLoginGoole = loginGoogleInformation => ({ type: RECEIVE_API_LOGI_GOOGLE, loginGoogleInformation });