import { all, fork } from "redux-saga/effects";
import { watchCoreSagasAsync } from "../core/core-saga";
import { watchCategorySagasAsync } from "../category/category-saga";
import { watchCustomerSagasAsync } from "../customer/customer-saga";
import { watchProductSagasAsync } from "../product/product-saga";

export default function* sagas() {
  yield all([fork(watchCoreSagasAsync)]);
  yield all([fork(watchCategorySagasAsync)]);
  yield all([fork(watchCustomerSagasAsync)]);
  yield all([fork(watchProductSagasAsync)]);
}
