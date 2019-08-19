import { call, put, takeLatest } from "redux-saga/effects";
import auth from "../auth/auth-helper";
import { getCategories as getCategoriesApi } from "./category-api";
import { redirectToLoginAction } from "../core/core-action-creator";

import {
  GET_CATEGORIES,
  getCategoriesActionSuccess,
  getCategoriesActionFailed
} from "./category-action-creator";
import Alert from "react-s-alert";

const getCategories = (credential, params) => {
  return getCategoriesApi(credential, params)
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

function* getCategoriesSaga(action) {
  try {
    const jwt = yield call(() => auth.isAuthenticated());
    if (jwt === false) {
      yield call(() => auth.signout());
      yield put(redirectToLoginAction());
    } else {
      const result = yield call(() => getCategories(jwt, action.params));
      if (result.error === null) {
        yield put(getCategoriesActionSuccess(result.payload));
      } else {
        yield put(getCategoriesActionFailed(result.error));
        yield put(() => Alert.error(result.error));
        if (result.isSignout === true) {
          yield call(() => auth.signout());
          yield put(redirectToLoginAction());
        }
      }
    }
  } catch (err) {
    yield put(getCategoriesActionFailed(err));
    yield call(() => auth.signout());
    yield put(() => Alert.error("Không thể kết nối server !"));
    yield put(redirectToLoginAction());
  }
}

export function* watchCategorySagasAsync() {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
}
