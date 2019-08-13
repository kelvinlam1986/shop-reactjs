import { call, put, takeLatest } from "redux-saga/effects";
import auth from "../auth/auth-helper";
import { getBranchDefault } from "./core-api";
import {
  GET_BRANCH,
  redirectToLoginAction,
  getBranchActionSuccess,
  getBranchActionFailed
} from "./core-action-creator";
import Alert from "react-s-alert";

const getBranch = credential => {
  console.log("we are here", "getBranch");
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
    Alert.error("Không thể kết nối server !");
    yield call(() => auth.signout());
    yield put(redirectToLoginAction());
  }
}

export function* watchCoreSagasAsync() {
  yield takeLatest(GET_BRANCH, getBranchSaga);
}
