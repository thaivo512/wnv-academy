import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from 'redux-logger';
import rootSaga from "./saga";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();
export default createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);