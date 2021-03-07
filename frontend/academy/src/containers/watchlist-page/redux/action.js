export const REQUEST_API_GET_WATCHLIST = "REQUEST_API_GET_WATCHLIST";
export const RECEIVE_API_GET_WATCHLIST = "RECEIVE_API_GET_WATCHLIST";

export const requestApiGetWatchlist = () => ({ type: REQUEST_API_GET_WATCHLIST });
export const receiveApiGetWatchlist = data => ({ type: RECEIVE_API_GET_WATCHLIST, data });