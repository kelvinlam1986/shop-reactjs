import { getCustomerTypes as getCustomerTypeApi } from "./customerType-api"
import auth from "../auth/auth-helper";
import { redirectToLoginAction } from "../core/core-action-creator";
import { getCustomerTypesActionSuccess, getCustomerTypesActionFailed, GET_CUSTOMERTYPES } from "./customerType-action-creator";
import Alert from "react-s-alert";
import { call, put, takeLatest } from "redux-saga/effects";

const getCustomerTypes = (credential, params) => {
    return getCustomerTypeApi(credential, params)
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

function* getCustomerTypesSaga(action) {
    try {
        const jwt = yield call(() => auth.isAuthenticated());
        if (jwt === false) {
            yield call(() => auth.signout());
            yield put(redirectToLoginAction());
        } else {
            const result = yield call(() => getCustomerTypes(jwt, action.params));
            if (result.error === null) {
                yield put(getCustomerTypesActionSuccess(result.payload));
            } else {
                yield put(getCustomerTypesActionFailed(result.error));
                yield put(() => Alert.error(result.error));
                if (result.isSignout === true) {
                    yield call(() => auth.signout());
                    yield put(redirectToLoginAction());
                }
            }
        }
    } catch (err) {
        console.log("err", err)
        yield put(getCustomerTypesActionFailed(err));
        yield call(() => auth.signout());
        yield put(() => Alert.error("Không thể kết nối server !"));
        yield put(redirectToLoginAction());
    }
}

export function* watchCustomerTypeSagasAsync() {
    yield takeLatest(GET_CUSTOMERTYPES, getCustomerTypesSaga);
}
