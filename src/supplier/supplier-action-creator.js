const GET_SUPPLIERS = "GET_SUPPLIERS";
const GET_SUPPLIERS_SUCCESS = "GET_SUPPLIERS_SUCCESS";
const GET_SUPPLIERS_FAILED = "GET_SUPPLIERS_FAILED";
const SET_LOADING_SUPPLIER = "SET_LOADING_SUPPLIER";
const LOAD_CURRENT_SUPPLIER = "LOAD_CURRENT_SUPPLIER";
const RESET_CURRENT_SUPPLIER = "RESET_CURRENT_SUPPLIER";

const setLoadingSupplier = isLoading => {
    return {
        type: SET_LOADING_SUPPLIER,
        isLoading: isLoading
    };
};

const getSuppliersAction = params => {
    return {
        type: GET_SUPPLIERS,
        params: params
    };
};

const getSuppliersActionSuccess = data => {
    return {
        type: GET_SUPPLIERS_SUCCESS,
        payload: {
            suppliers: data.items,
            totalPages: data.totalPage,
            page: data.page + 1
        }
    };
};

const getSuppliersActionFailed = error => {
    return { type: GET_SUPPLIERS_FAILED, payload: { error: error } };
};

const loadCurrentSupplier = currentSupplier => {
    return { type: LOAD_CURRENT_SUPPLIER, payload: { currentSupplier } };
};

const resetCurrentSupplier = () => {
    return { type: RESET_CURRENT_SUPPLIER };
};

export {
    GET_SUPPLIERS,
    GET_SUPPLIERS_SUCCESS,
    GET_SUPPLIERS_FAILED,
    SET_LOADING_SUPPLIER,
    LOAD_CURRENT_SUPPLIER,
    RESET_CURRENT_SUPPLIER,
    getSuppliersAction,
    getSuppliersActionSuccess,
    getSuppliersActionFailed,
    setLoadingSupplier,
    loadCurrentSupplier,
    resetCurrentSupplier
}