import {
    GET_CUSTOMERTYPES,
    GET_CUSTOMERTYPES_SUCCESS,
    GET_CUSTOMERTYPES_FAILED,
    RESET_CURRENT_CUSTOMERTYPE,
    LOAD_CURRENT_CUSTOMERTYPE,
    SET_LOADING_CUSTOMERTYPE
  } from "./customerType-action-creator";
  
  const customerTypeInitialState = {
    customerTypes: [],
    loading: false,
    error: "",
    totalPages: 0,
    page: 1,
    currentCustomerType: {
      code: "",
      name: "",
    },
    addNewCustomerType: {
      code: "",
      name: ""
    }
  };
  
  const customerTypeReducer = (state = customerTypeInitialState, action) => {
    switch (action.type) {
      case SET_LOADING_CUSTOMERTYPE:
        return Object.assign({}, state, {
          loading: action.isLoading
        });
      case GET_CUSTOMERTYPES:
        return Object.assign({}, state, {
          loading: true
        });
      case GET_CUSTOMERTYPES_SUCCESS:
        return Object.assign({}, state, {
          loading: false,
          customerTypes: action.payload.customerTypes,
          totalPages: action.payload.totalPages,
          page: action.payload.page,
          error: ""
        });
      case GET_CUSTOMERTYPES_FAILED:
        return Object.assign({}, state, {
          loading: false,
          customerTypes: null,
          error: action.payload.error
        });
      case RESET_CURRENT_CUSTOMERTYPE:
        return Object.assign({}, state, {
            currentCustomerType: {
                code: "",
                name: ""
            }
        });
      case LOAD_CURRENT_CUSTOMERTYPE:
        return Object.assign({}, state, {
            currentCustomerType: action.payload.currentCustomerType
        });
      default:
        return state;
    }
  };
  
  export default customerTypeReducer;
  