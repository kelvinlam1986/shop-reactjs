const GET_CUSTOMERTYPES = "GET_CUSTOMERTYPES";
const GET_CUSTOMERTYPES_SUCCESS = "GET_CUSTOMERTYPES_SUCCESS";
const GET_CUSTOMERTYPES_FAILED = "GET_CUSTOMERTYPES_FAILED";
const SET_LOADING_CUSTOMERTYPE = "SET_LOADING_CUSTOMERTYPE";
const RESET_NEW_CUSTOMERTYPE = "RESET_NEW_CUSTOMERTYPE";
const LOAD_CURRENT_CUSTOMERTYPE = "LOAD_CURRENT_CUSTOMERTYPE";
const RESET_CURRENT_CUSTOMERTYPE = "RESET_CURRENT_CUSTOMERTYPE";

const setLoadingCustomerType = isLoading => {
    return {
        type: SET_LOADING_CUSTOMERTYPE,
        isLoading: isLoading
    };
};

const getCustomerTypesAction = params => {
    return {
        type: GET_CUSTOMERTYPES,
        params: params
    };
};

const getCustomerTypesActionSuccess = data => {
    return {
        type: GET_CUSTOMERTYPES_SUCCESS,
        payload: {
            customerTypes: data.items,
            totalPages: data.totalPage,
            page: data.page + 1
        }
    };
};

const getCustomerTypesActionFailed = error => {
    return { type: GET_CUSTOMERTYPES_FAILED, payload: { error: error } };
};

const resetNewCustomerType = () => {
    return { type: RESET_NEW_CUSTOMERTYPE };
}

const loadCurrentCustomerType = currentCustomerType => {
    return { type: LOAD_CURRENT_CUSTOMERTYPE, payload: { currentCustomerType } };
};

const resetCurrentCustomerType = () => {
    return { type: RESET_CURRENT_CUSTOMERTYPE };
};

export {
    GET_CUSTOMERTYPES,
    GET_CUSTOMERTYPES_SUCCESS,
    GET_CUSTOMERTYPES_FAILED,
    SET_LOADING_CUSTOMERTYPE,
    RESET_NEW_CUSTOMERTYPE,
    LOAD_CURRENT_CUSTOMERTYPE,
    RESET_CURRENT_CUSTOMERTYPE,
    getCustomerTypesAction,
    getCustomerTypesActionSuccess,
    getCustomerTypesActionFailed,
    setLoadingCustomerType,
    resetNewCustomerType,
    loadCurrentCustomerType,
    resetCurrentCustomerType
}