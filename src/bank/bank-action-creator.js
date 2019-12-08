const GET_BANKS = "GET_BANKS";
const GET_BANKS_SUCCESS = "GET_BANKS_SUCCESS";
const GET_BANKS_FAILED = "GET_BANKS_FAILED";
const SET_LOADING_BANK = "SET_LOADING_BANK";
const RESET_NEW_BANK = "RESET_NEW_BANK";

const setLoadingBank = isLoading => {
    return {
        type: SET_LOADING_BANK,
        isLoading: isLoading
    };
};

const getBanksAction = params => {
    return {
        type: GET_BANKS,
        params: params
    };
};

const getBanksActionSuccess = data => {
    return {
        type: GET_BANKS_SUCCESS,
        payload: {
            banks: data.items,
            totalPages: data.totalPage,
            page: data.page + 1
        }
    };
};

const getBanksActionFailed = error => {
    return { type: GET_BANKS_FAILED, payload: { error: error } };
};

const resetNewBank = () => {
    return { type: RESET_NEW_BANK };
}

export {
    GET_BANKS,
    GET_BANKS_SUCCESS,
    GET_BANKS_FAILED,
    SET_LOADING_BANK,
    RESET_NEW_BANK,
    getBanksAction,
    getBanksActionSuccess,
    getBanksActionFailed,
    setLoadingBank,
    resetNewBank
}