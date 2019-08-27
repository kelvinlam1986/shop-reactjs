const GET_CUSTOMERS = "GET_CUSTOMERS";
const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
const GET_CUSTOMERS_FAILED = "GET_CUSTOMERS_FAILED";
const RESET_CURRENT_CUSTOMER = "RESET_CURRENT_CUSTOMER";
const LOAD_CURRENT_CUSTOMER = "LOAD_CURRENT_CUSTOMER";

const getCustomersAction = params => {
  return {
    type: GET_CUSTOMERS,
    params: params
  };
};

const getCustomersActionSuccess = data => {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload: {
      customers: data.items,
      totalPages: data.totalPage,
      page: data.page + 1
    }
  };
};

const getCustomersActionFailed = error => {
  return { type: GET_CUSTOMERS_FAILED, payload: { error: error } };
};

const resetCurrentCustomer = () => {
  return { type: RESET_CURRENT_CUSTOMER };
};

const loadCurrentCustomer = currentCustomer => {
  return { type: LOAD_CURRENT_CUSTOMER, payload: { currentCustomer } };
};

export {
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILED,
  RESET_CURRENT_CUSTOMER,
  LOAD_CURRENT_CUSTOMER,
  getCustomersAction,
  getCustomersActionFailed,
  getCustomersActionSuccess,
  resetCurrentCustomer,
  loadCurrentCustomer
};
