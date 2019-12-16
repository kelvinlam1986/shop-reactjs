import { call, put, takeLatest } from "redux-saga/effects";
import Alert from "react-s-alert";
import { getCountries as getCountriesApi } from "./country-api"
import auth from "../auth/auth-helper";
import { redirectToLoginAction } from "../core/core-action-creator";
import { getCountriesActionSuccess, getCountriesActionFailed, GET_COUNTRIES } from "./country-action-creator";

const getCountries = (credential, params) => {
    return getCountriesApi(credential, params)
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
        }).catch(err => console.log(err))
}

function* getCountriesSaga(action) {
    try {
        const jwt = yield call(() => auth.isAuthenticated());
        if (jwt === false) {
            yield call(() => auth.signout());
            yield put(redirectToLoginAction());
        } else {
            const result = yield call(() => getCountries(jwt, action.params));
            if (result.error === null) {
                yield put(getCountriesActionSuccess(result.payload));
            } else {
                yield put(getCountriesActionFailed(result.error));
                yield put(() => Alert.error(result.error));
                if (result.isSignout === true) {
                    yield call(() => auth.signout());
                    yield put(redirectToLoginAction());
                }
            }
        }
    } catch (err) {
        yield put(getCountriesActionFailed(err));
        yield call(() => auth.signout());
        yield put(() => Alert.error("Không thể kết nối server !"));
        yield put(redirectToLoginAction());
    }
}

export function* watchCountriesSagasAsync() {
    yield takeLatest(GET_COUNTRIES, getCountriesSaga);
}