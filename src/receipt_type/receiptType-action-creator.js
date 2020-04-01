const GET_RECEIPTTYPES = "GET_RECEIPTTYPES";
const GET_RECEIPTTYPES_SUCCESS = "GET_RECEIPTTYPES_SUCCESS";
const GET_RECEIPTTYPES_FAILED = "GET_RECEIPTTYPES_FAILED";
const SET_LOADING_RECEIPTTYPE = "SET_LOADING_RECEIPTTYPE";
const RESET_NEW_RECEIPTTYPE = "RESET_NEW_RECEIPTTYPE";
const LOAD_CURRENT_RECEIPTTYPE = "LOAD_CURRENT_RECEIPTTYPE";
const RESET_CURRENT_RECEIPTTYPE = "RESET_CURRENT_RECEIPTTYPE";

const setLoadingReceiptType = isLoading => {
    return {
        type: SET_LOADING_RECEIPTTYPE,
        isLoading: isLoading
    };
};

const getReceiptTypesAction = params => {
    return {
        type: GET_RECEIPTTYPES,
        params: params
    };
};

const getReceiptTypesActionSuccess = data => {
    return {
        type: GET_RECEIPTTYPES_SUCCESS,
        payload: {
            receiptTypes: data.items,
            totalPages: data.totalPage,
            page: data.page + 1
        }
    };
};

const getReceiptTypesActionFailed = error => {
    return { type: GET_RECEIPTTYPES_FAILED, payload: { error: error } };
};

const resetNewReceiptType = () => {
    return { type: RESET_NEW_RECEIPTTYPE };
}

const loadCurrentReceiptType = currentReceiptType => {
    return { type: LOAD_CURRENT_RECEIPTTYPE, payload: { currentReceiptType } };
};

const resetCurrentReceiptType = () => {
    return { type: RESET_CURRENT_RECEIPTTYPE };
};

export {
    GET_RECEIPTTYPES,
    GET_RECEIPTTYPES_SUCCESS,
    GET_RECEIPTTYPES_FAILED,
    SET_LOADING_RECEIPTTYPE,
    RESET_NEW_RECEIPTTYPE,
    LOAD_CURRENT_RECEIPTTYPE,
    RESET_CURRENT_RECEIPTTYPE,
    getReceiptTypesAction,
    getReceiptTypesActionSuccess,
    getReceiptTypesActionFailed,
    setLoadingReceiptType,
    resetNewReceiptType,
    loadCurrentReceiptType,
    resetCurrentReceiptType
}