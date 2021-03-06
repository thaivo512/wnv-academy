export const REQUEST_API_GET_INFO = "REQUEST_API_GET_INFO";
export const RECEIVE_API_GET_INFO = "RECEIVE_API_GET_INFO";

export const requestApiGetInfo = () => ({ type: REQUEST_API_GET_INFO });
export const receiveApiGetInfo = data => ({ type: RECEIVE_API_GET_INFO, data });

export const REQUEST_API_CHANGE_NAME = "REQUEST_API_CHANGE_NAME";
export const RECEIVE_API_CHANGE_NAME = "RECEIVE_API_CHANGE_NAME";

export const requestApiChangeName = (name) => ({ type: REQUEST_API_CHANGE_NAME, name });
export const receiveApiChangeName = data => ({ type: RECEIVE_API_CHANGE_NAME, data });