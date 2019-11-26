import {
    GET_SUPPLIERS,
    GET_SUPPLIERS_SUCCESS,
    GET_SUPPLIERS_FAILED,
    SET_LOADING_SUPPLIER,
    LOAD_CURRENT_SUPPLIER,
    RESET_CURRENT_SUPPLIER
} from "./supplier-action-creator"

const supplierInitialState = {
    suppliers: [],
    loading: false,
    error: "",
    totalPages: 0,
    page: 1,
    currentSupplier: {
        id: 0,
        name: "",
        address: "",
        contact: ""
    },
    addNewSupplier: {
        id: 0,
        name: ""
    }
};

const supplierReducer = (state = supplierInitialState, action) => {
    switch (action.type) {
        case SET_LOADING_SUPPLIER:
            return Object.assign({}, state, {
                loading: action.isLoading
            });
        case GET_SUPPLIERS:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_SUPPLIERS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                suppliers: action.payload.suppliers,
                totalPages: action.payload.totalPages,
                page: action.payload.page,
                error: ""
            });
        case GET_SUPPLIERS_FAILED:
            return Object.assign({}, state, {
                loading: false,
                suppliers: null,
                error: action.payload.error
            });
        case LOAD_CURRENT_SUPPLIER:
            return Object.assign({}, state, {
                currentSupplier: action.payload.currentSupplier
            });
        case RESET_CURRENT_SUPPLIER:
            return Object.assign({}, state, {
                currentSupplier: {
                    id: 0,
                    name: "",
                    address: "",
                    contact: ""
                }
            });
        default:
            return state;
    }
}

export default supplierReducer;