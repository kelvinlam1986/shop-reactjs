import { call, put, takeLatest } from "redux-saga/effects";
import { getSuppliers as getSuppliersApi } from "./supplier-api";
import { redirectToLoginAction } from "../core/core-action-creator";
import auth from "../auth/auth-helper";
import { getSuppliersActionSuccess, getSuppliersActionFailed, GET_SUPPLIERS } from "./supplier-action-creator";
import Alert from "react-s-alert";

const getSuppliers = (credential, params) => {
    return getSuppliersApi(credential, params)
        .then(result => {
            return { data: result, error: null, isSignout: false };
        }, err => {
            if (err.errorCode) {
                if (err.errorCode === "401") {
                    return { error: err.errorMessage, data: null, isSignout: true };
                } else {
                    return { error: err.errorMessage, data: null, isSignout: false }
                }
            } else {
                throw err;
            }
        }).catch(err => console.log(err))
}

function* getSuppliersSaga(action) {
    try {
        const jwt = yield call(() => auth.isAuthenticated());
        if (jwt === false) {
            yield call(() => auth.signout());
            yield put(redirectToLoginAction());
        } else {
            const result = yield call(() => getSuppliers(jwt, action.params));
            if (result.error === null) {
                yield put(getSuppliersActionSuccess(result.data));
            } else {
                yield put(getSuppliersActionFailed(result.error));
                yield put(() => Alert.error(result.error));
                if (result.isSignout === true) {
                    yield call(() => auth.signout());
                    yield put(redirectToLoginAction());
                }
            }
        }
    } catch (err) {
        yield put(getSuppliersActionFailed(err));
        yield call(() => auth.signout());
        yield put(() => Alert.error("Không thể kết nối server !"));
        yield put(redirectToLoginAction());
    }
}

export function* watchSupplierSagasAsync() {
    yield takeLatest(GET_SUPPLIERS, getSuppliersSaga);
}