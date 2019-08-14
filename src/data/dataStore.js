import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import { createLogger } from "redux-logger";
import sagas from "./saga";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware, logger)
)(createStore);

export const store = createStoreWithMiddleware(rootReducer, initialState);

sagaMiddleware.run(sagas);
