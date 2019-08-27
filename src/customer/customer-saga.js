import { call, put, takeLatest } from "redux-saga/effects";
import auth from "../auth/auth-helper";
import { getCustomers as getCustomersApi } from "./customer-api";
import { redirectToLoginAction } from "../core/core-action-creator";

import {
  GET_CUSTOMERS,
  getCustomersActionSuccess,
  getCustomersActionFailed
} from "./customer-action-creator";
import Alert from "react-s-alert";

const getCustomers = (credential, params) => {
  return getCustomersApi(credential, params)
    .then(
      result => {
        return { payload: result, error: null, isSignout: false };
      },
      err => {
        if (err.errorCode) {
          if (err.errorCode === "401") {
            return { error: err.errorMessage, payload: null, isSignout: true };
          } else {
            return { error: err.errorMessage, payload: null, isSignout: false };
          }
        } else {
          throw err;
        }
      }
    )
    .catch(err => console.log(err));
};

function* getCustomersSaga(action) {
  try {
    const jwt = yield call(() => auth.isAuthenticated());
    if (jwt === false) {
      yield call(() => auth.signout());
      yield put(redirectToLoginAction());
    } else {
      const result = yield call(() => getCustomers(jwt, action.params));
      if (result.error === null) {
        yield put(getCustomersActionSuccess(result.payload));
      } else {
        yield put(getCustomersActionFailed(result.error));
        yield put(() => Alert.error(result.error));
        if (result.isSignout === true) {
          yield call(() => auth.signout());
          yield put(redirectToLoginAction());
        }
      }
    }
  } catch (err) {
    yield put(getCustomersActionFailed(err));
    yield call(() => auth.signout());
    yield put(() => Alert.error("Không thể kết nối server !"));
    yield put(redirectToLoginAction());
  }
}

export function* watchCustomerSagasAsync() {
  yield takeLatest(GET_CUSTOMERS, getCustomersSaga);
}
