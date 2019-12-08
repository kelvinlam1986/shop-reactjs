import { SET_LOADING_BANK, GET_BANKS, GET_BANKS_SUCCESS, GET_BANKS_FAILED } from "./bank-action-creator";


const bankInitialState = {
    banks: [],
    loading: false,
    error: "",
    totalPages: 0,
    page: 1,
    currentBank: {
        code: "",
        name: "",
        address: ""
    },
    addNewBank: {
        code: "",
        name: "",
        address: ""
    }
};

const bankReducer = (state = bankInitialState, action) => {
    switch (action.type) {
        case SET_LOADING_BANK:
            return Object.assign({}, state, {
                loading: action.isLoading
            });
        case GET_BANKS:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_BANKS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                banks: action.payload.banks,
                totalPages: action.payload.totalPages,
                page: action.payload.page,
                error: ""
            });
        case GET_BANKS_FAILED:
            return Object.assign({}, state, {
                loading: false,
                banks: null,
                error: action.payload.error
            });
        default:
            return state;
    }
}

export default bankReducer;
