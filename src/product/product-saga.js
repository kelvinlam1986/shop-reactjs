import { call, put, takeLatest } from "redux-saga/effects";
import auth from "../auth/auth-helper";
import {
  getProducts as getProductsApi,
  getSelectionCategories as getCategoriesApi,
  getSelectionSuppliers as getSuppliersApi,
} from "./product-api";
import { redirectToLoginAction } from "../core/core-action-creator";

import {
  GET_PRODUCTS,
  getProductsActionSuccess,
  getProductsActionFailed,
  getCategoriesSelectionSuccess,
  getCategoriesSelectionFailed,
  getSuppliersSelectionSuccess,
  getSuppliersSelectionFailed,
} from "./product-action-creator";
import Alert from "react-s-alert";

const getProducts = (credential, params) => {
  return getProductsApi(credential, params)
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

const getCategoriesSelection = (credential, params) => {
  return getCategoriesApi(credential, params)
    .then(
      result => {
        return { data: result, error: null, isSignout: false };
      },
      err => {
        if (err.errorCode) {
          if (err.errorCode === "401") {
            return { error: err.errorMessage, data: null, isSignout: true };
          } else {
            return { error: err.errorMessage, data: null, isSignout: false };
          }
        } else {
          throw err
        }
      })
    .catch(err => console.log(err));
}

const getSuppliersSelection = (credential, params) => {
  return getSuppliersApi(credential, params)
    .then(
      result => {
        return { data: result, error: null, isSignout: false }
      },
      err => {
        if (err.errorCode) {
          if (err.errorCode === "401") {
            return { error: err.errorMessage, data: null, isSignout: true };
          } else {
            return { error: err.errorMessage, data: null, isSignout: false };
          }
        } else {
          throw err
        }
      }
    ).catch(err => console.log(err))
}

function* getProductsSaga(action) {
  try {
    const jwt = yield call(() => auth.isAuthenticated());
    if (jwt === false) {
      yield call(() => auth.signout());
      yield put(redirectToLoginAction());
    } else {
      // get product categories
      const categoriesResult = yield call(() => getCategoriesSelection(jwt, action.params));
      if (categoriesResult.error === null) {
        yield put(getCategoriesSelectionSuccess(categoriesResult.data));
      } else {
        yield put(getCategoriesSelectionFailed(categoriesResult.error));
        yield put(() => Alert.error(categoriesResult.error));
        if (categoriesResult.isSignout === true) {
          yield call(() => auth.signout());
          yield put(redirectToLoginAction());
        }
        return
      }

      // get product suppliers
      const suppliersResult = yield call(() => getSuppliersSelection(jwt, action.params));
      if (suppliersResult.error === null) {
        yield put(getSuppliersSelectionSuccess(suppliersResult.data));
      } else {
        yield put(getSuppliersSelectionFailed(suppliersResult.error));
        yield put(() => Alert.error(suppliersResult.error));
        if (suppliersResult.isSignout === true) {
          yield call(() => auth.signout());
          yield put(redirectToLoginAction());
        }
        return
      }

      const result = yield call(() => getProducts(jwt, action.params));
      if (result.error === null) {
        yield put(getProductsActionSuccess(result.payload));
      } else {
        yield put(getProductsActionFailed(result.error));
        yield put(() => Alert.error(result.error));
        if (result.isSignout === true) {
          yield call(() => auth.signout());
          yield put(redirectToLoginAction());
        }
      }
    }
  } catch (err) {
    yield put(getProductsActionFailed(err));
    yield call(() => auth.signout());
    yield put(() => Alert.error("Không thể kết nối server !"));
    yield put(redirectToLoginAction());
  }
}

export function* watchProductSagasAsync() {
  yield takeLatest(GET_PRODUCTS, getProductsSaga);
}
