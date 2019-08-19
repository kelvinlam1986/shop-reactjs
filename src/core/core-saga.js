import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import auth from "../auth/auth-helper";
import { getBranchDefault } from "./core-api";
import { signin } from "../auth/api-auth";
import {
  GET_BRANCH,
  LOGIN_REQUEST,
  redirectToLoginAction,
  getBranchActionSuccess,
  getBranchActionFailed,
  loginSuccess,
  loginFailed
} from "./core-action-creator";
import { setBranchToCache } from "./core-helper";
import Alert from "react-s-alert";

const login = user => {
  return signin(user).then(result => {
    if (result.error) {
      return { error: result.error, payload: null };
    } else {
      return { payload: result, error: null };
    }
  });
};

function* loginSaga(action) {
  try {
    const result = yield call(() => login(action.user));
    if (result.error !== null) {
      yield call(() => Alert.error(result.error));
      yield put(loginFailed(result.error));
    } else {
      yield put(loginSuccess(action.user.username));
      yield call(() => auth.authenticate(result.payload, action.user.username));
      yield call(() => action.history.push("/"));
    }
  } catch (err) {
    yield put(loginFailed(err));
    yield call(() => auth.signout());
    yield put(() => Alert.error("Không thể kết nối server !"));
  }
}

const getBranch = credential => {
  return getBranchDefault(credential).then(
    result => {
      return { payload: result, error: null, isSignOut: false };
    },
    err => {
      if (err.errorCode) {
        if (err.errorCode === "404") {
          return {
            payload: null,
            error: "Không tìm thấy chủ shop nào hết",
            isSignOut: true
          };
        } else if (err.errorCode === "401") {
          return {
            payload: null,
            error: err.errorMessage,
            isSignOut: true
          };
        } else {
          return {
            payload: null,
            error: err.errorMessage,
            isSignOut: false
          };
        }
      } else {
        throw err;
      }
    }
  );
};

function* getBranchSaga() {
  try {
    const jwt = yield call(() => auth.isAuthenticated());
    if (jwt === false) {
      yield call(() => auth.signout());
      yield put(redirectToLoginAction());
    } else {
      const result = yield call(() => getBranch(jwt));
      if (result.error) {
        yield put(getBranchActionFailed(result.error));
        yield call(() => Alert.error(result.error));
        if (result.isSignOut === true) {
          yield call(() => auth.signout());
          yield put(redirectToLoginAction());
        }
      } else {
        yield put(getBranchActionSuccess(result.payload));
        yield call(() => setBranchToCache(result.payload));
      }
    }
  } catch (err) {
    yield put(getBranchActionFailed(err));
    yield call(() => auth.signout());
    yield put(() => Alert.error("Không thể kết nối server !"));
    yield put(redirectToLoginAction());
  }
}

export function* watchCoreSagasAsync() {
  yield takeLatest(GET_BRANCH, getBranchSaga);
  yield takeEvery(LOGIN_REQUEST, loginSaga);
}
