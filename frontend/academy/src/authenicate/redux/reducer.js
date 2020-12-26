import {
    RECEIVE_API_LOGIN, RECEIVE_API_REGISTER,
    RECEIVE_API_OPT, RECEIVE_API_VERIFY_EMAIL,
    RECEIVE_API_LOGI_GOOGLE
} from './action';

export const loginReducer = (state = {}, { type, loginInformation }) => {
    switch (type) {
        case RECEIVE_API_LOGIN:
            return loginInformation;
        default:
            return state;
    }
}

export const registerReducer = (state = {}, { type, registerInformation }) => {
    switch (type) {
        case RECEIVE_API_REGISTER:
            return registerInformation;
        default:
            return state;
    }
}

export const requestOPTReducer = (state = {}, { type, optInformation }) => {
    switch (type) {
        case RECEIVE_API_OPT:
            return optInformation;
        default:
            return state;
    }
}

export const verifyEmailReducer = (state = {}, { type, verifyInformation }) => {
    switch (type) {
        case RECEIVE_API_VERIFY_EMAIL:
            return verifyInformation;
        default:
            return state;
    }
}

export const loginGoogleReducer = (state = {}, { type, loginGoogleInformation }) => {
    switch (type) {
        case RECEIVE_API_LOGI_GOOGLE:
            return loginGoogleInformation;
        default:
            return state;
    }
}