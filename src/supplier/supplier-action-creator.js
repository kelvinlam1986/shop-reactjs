const GET_SUPPLIERS = "GET_SUPPLIERS";
const GET_SUPPLIERS_SUCCESS = "GET_SUPPLIERS_SUCCESS";
const GET_SUPPLIERS_FAILED = "GET_SUPPLIERS_FAILED";
const SET_LOADING_SUPPLIER = "SET_LOADING_SUPPLIER";

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

export {
    GET_SUPPLIERS,
    GET_SUPPLIERS_SUCCESS,
    GET_SUPPLIERS_FAILED,
    SET_LOADING_SUPPLIER,
    getSuppliersAction,
    getSuppliersActionSuccess,
    getSuppliersActionFailed,
    setLoadingSupplier
}