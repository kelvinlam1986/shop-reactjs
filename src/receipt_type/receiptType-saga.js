import { getReceiptType as getReceiptTypeApi } from "./receiptType-api"
import auth from "../auth/auth-helper";
import { redirectToLoginAction } from "../core/core-action-creator";
import { 
    getReceiptTypesActionSuccess, 
    getReceiptTypesActionFailed, 
    GET_RECEIPTTYPES 
} from "./receiptType-action-creator";
import Alert from "react-s-alert";
import { call, put, takeLatest } from "redux-saga/effects";

const getReceiptTypes = (credential, params) => {
    return getReceiptTypeApi(credential, params)
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

function* getReceiptTypesSaga(action) {
    try {
        const jwt = yield call(() => auth.isAuthenticated());
        if (jwt === false) {
            yield call(() => auth.signout());
            yield put(redirectToLoginAction());
        } else {
            const result = yield call(() => getReceiptTypes(jwt, action.params));
            if (result.error === null) {
                yield put(getReceiptTypesActionSuccess(result.payload));
            } else {
                yield put(getReceiptTypesActionFailed(result.error));
                yield put(() => Alert.error(result.error));
                if (result.isSignout === true) {
                    yield call(() => auth.signout());
                    yield put(redirectToLoginAction());
                }
            }
        }
    } catch (err) {
        console.log("err", err)
        yield put(getReceiptTypesActionFailed(err));
        yield call(() => auth.signout());
        yield put(() => Alert.error("Không thể kết nối server !"));
        yield put(redirectToLoginAction());
    }
}

export function* watchReceiptTypeSagasAsync() {
    yield takeLatest(GET_RECEIPTTYPES, getReceiptTypesSaga);
}
