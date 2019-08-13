import { all, fork } from "redux-saga/effects";
import { watchCoreSagasAsync } from "../core/core-saga";

export default function* sagas() {
  yield all([fork(watchCoreSagasAsync)]);
}
