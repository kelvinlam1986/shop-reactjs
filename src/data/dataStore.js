import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import sagas from "./saga";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = compose(applyMiddleware(sagaMiddleware))(
  createStore
);

export const store = createStoreWithMiddleware(rootReducer, initialState);

sagaMiddleware.run(sagas);
