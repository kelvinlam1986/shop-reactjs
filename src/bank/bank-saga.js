import { getBanks as getBanksApi } from "./bank-api"
import auth from "../auth/auth-helper";
import { redirectToLoginAction } from "../core/core-action-creator";
import { getBanksActionSuccess, getBanksActionFailed, GET_BANKS } from "./bank-action-creator";
import Alert from "react-s-alert";
import { call, put, takeLatest } from "redux-saga/effects";

const getBanks = (credential, params) => {
    return getBanksApi(credential, params)
        .then(result => {
            return { payload: result, error: null, isSignout: false };
        }, err => {
            if (err.errorCode) {
                if (err.errorCode === "401") {
                    return { error: err.errorMessage, payload: null, isSignout: true };
                } else {
                    return { error: err.errorMessage, payload: null, isSignout: false };
                }
            } else {
                throw err;
            }
        }).catch(err => console.log(err));
}

function* getBanksSaga(action) {
    try {
        const jwt = yield call(() => auth.isAuthenticated());
        if (jwt === false) {
            yield call(() => auth.signout());
            yield put(redirectToLoginAction());
        } else {
            const result = yield call(() => getBanks(jwt, action.params));
            if (result.error === null) {
                yield put(getBanksActionSuccess(result.payload));
            } else {
                yield put(getBanksActionFailed(result.error));
                yield put(() => Alert.error(result.error));
                if (result.isSignout === true) {
                    yield call(() => auth.signout());
                    yield put(redirectToLoginAction());
                }
            }
        }
    } catch (err) {
        console.log("err", err)
        yield put(getBanksActionFailed(err));
        yield call(() => auth.signout());
        yield put(() => Alert.error("Không thể kết nối server !"));
        yield put(redirectToLoginAction());
    }
}

export function* watchBankSagasAsync() {
    yield takeLatest(GET_BANKS, getBanksSaga);
}
