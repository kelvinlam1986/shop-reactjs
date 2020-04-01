import {
    GET_RECEIPTTYPES,
    GET_RECEIPTTYPES_SUCCESS,
    GET_RECEIPTTYPES_FAILED,
    RESET_CURRENT_RECEIPTTYPE,
    LOAD_CURRENT_RECEIPTTYPE,
    SET_LOADING_RECEIPTTYPE
  } from "./receiptType-action-creator";
  
  const receiptTypeInitialState = {
    receiptTypes: [],
    loading: false,
    error: "",
    totalPages: 0,
    page: 1,
    currentReceiptType: {
      code: "",
      receiptTypeInVietnamese: "",
      receiptTypeInSecondLanguage: "",
      showReceiptTypeInVietNamese: false
    },
    addNewReceiptType: {
        code: "",
        receiptTypeInVietnamese: "",
        receiptTypeInSecondLanguage: "",
        showReceiptTypeInVietNamese: false
    }
  };

  const receiptTypeReducer = (state = receiptTypeInitialState, action) => {
    switch (action.type) {
      case SET_LOADING_RECEIPTTYPE:
        return Object.assign({}, state, {
          loading: action.isLoading
        });
      case GET_RECEIPTTYPES:
        return Object.assign({}, state, {
          loading: true
        });
      case GET_RECEIPTTYPES_SUCCESS:
        return Object.assign({}, state, {
          loading: false,
          receiptTypes: action.payload.receiptTypes,
          totalPages: action.payload.totalPages,
          page: action.payload.page,
          error: ""
        });
      case GET_RECEIPTTYPES_FAILED:
        return Object.assign({}, state, {
          loading: false,
          receiptTypes: null,
          error: action.payload.error
        });
      case RESET_CURRENT_RECEIPTTYPE:
        return Object.assign({}, state, {
            currentReceiptType: {
                code: "",
                receiptTypeInVietnamese: "",
                receiptTypeInSecondLanguage: "",
                showReceiptTypeInVietNamese: false
            }
        });
      case LOAD_CURRENT_RECEIPTTYPE:
        return Object.assign({}, state, {
            currentReceiptType: action.payload.currentReceiptType
        });
      default:
        return state;
    }
  };
  
  export default receiptTypeReducer;
  