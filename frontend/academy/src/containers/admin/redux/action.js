
export const REQUEST_API_GET_ALL_USERS = "REQUEST_API_GET_ALL_USERS";
export const RECEIVE_API_GET_ALL_USERS = "RECEIVE_API_GET_ALL_USERS";

export const requestApiGetAllUser = () => ({ type: REQUEST_API_GET_ALL_USERS });
export const receiveApiGetAllUser = allUsers => ({ type: RECEIVE_API_GET_ALL_USERS, allUsers });
