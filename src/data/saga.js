import { all, fork } from "redux-saga/effects";
import { watchCoreSagasAsync } from "../core/core-saga";
import { watchCategorySagasAsync } from "../category/category-saga";
import { watchCustomerSagasAsync } from "../customer/customer-saga";
import { watchProductSagasAsync } from "../product/product-saga";
import { watchSupplierSagasAsync } from "../supplier/supplier-saga";
import { watchBankSagasAsync } from "../bank/bank-saga";

export default function* sagas() {
  yield all([fork(watchCoreSagasAsync)]);
  yield all([fork(watchCategorySagasAsync)]);
  yield all([fork(watchCustomerSagasAsync)]);
  yield all([fork(watchProductSagasAsync)]);
  yield all([fork(watchSupplierSagasAsync)]);
  yield all([fork(watchBankSagasAsync)]);
}
