export const REQUEST_API_GET_ALL_USERS = "REQUEST_API_GET_ALL_USERS";
export const RECEIVE_API_GET_ALL_USERS = "RECEIVE_API_GET_ALL_USERS";

export const requestApiGetAllUser = () => ({ type: REQUEST_API_GET_ALL_USERS });
export const receiveApiGetAllUser = allUsers => ({ type: RECEIVE_API_GET_ALL_USERS, allUsers });

export const REQUEST_API_DELETE_USER = "REQUEST_API_DELETE_USER";
export const RECEIVE_API_DELETE_USER = "RECEIVE_API_DELETE_USER";

export const requestApiDeleteUser = payload => ({ type: REQUEST_API_DELETE_USER, payload });
export const receiveApiDeleteUser = result => ({ type: RECEIVE_API_DELETE_USER, result });
