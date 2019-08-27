import {
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILED
} from "./customer-action-creator";

const customerInitialState = {
  customers: [],
  loading: false,
  error: "",
  totalPages: 0,
  page: 1,
  currentCustomer: {
    id: 0,
    name: ""
  },
  addNewCustomer: {
    id: 0,
    name: ""
  }
};

const customerReducer = (state = customerInitialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return Object.assign({}, state, {
        loading: true
      });
    case GET_CUSTOMERS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        customers: action.payload.customers,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
        error: ""
      });
    case GET_CUSTOMERS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        customers: null,
        error: action.payload.error
      });
    default:
      return state;
  }
};

export default customerReducer;
