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
  return getCategoriesApi(credential, params).then(result => {
    return { payload: result };
  });
};

function* getCategoriesSaga(action) {
  try {
    const jwt = yield call(() => auth.isAuthenticated());
    if (jwt === false) {
      yield call(() => auth.signout());
      yield put(redirectToLoginAction());
    } else {
      const result = yield call(() => getCategories(jwt, action.params));
      yield put(getCategoriesActionSuccess(result.payload));
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
