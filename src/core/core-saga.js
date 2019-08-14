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
  return getBranchDefault(credential).then(result => {
    if (result.errorCode === "404") {
      return { isNotFound: true, payload: null };
    } else {
      return { payload: result };
    }
  });
};

function* getBranchSaga() {
  try {
    const jwt = yield call(() => auth.isAuthenticated());
    if (jwt === false) {
      yield call(() => auth.signout());
      yield put(redirectToLoginAction());
    } else {
      const result = yield call(() => getBranch(jwt));
      if (result.isNotFound) {
        yield call(() => Alert.error("Không tìm thấy chủ shop nào hết"));
        yield put(redirectToLoginAction());
      } else {
        yield put(getBranchActionSuccess(result.payload));
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
