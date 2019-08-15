import { all, fork } from "redux-saga/effects";
import { watchCoreSagasAsync } from "../core/core-saga";
import { watchCategorySagasAsync } from "../category/category-saga";

export default function* sagas() {
  yield all([fork(watchCoreSagasAsync)]);
  yield all([fork(watchCategorySagasAsync)]);
}
