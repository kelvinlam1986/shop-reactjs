const GET_CUSTOMERS = "GET_CUSTOMERS";
const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
const GET_CUSTOMERS_FAILED = "GET_CUSTOMERS_FAILED";

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

export {
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILED,
  getCustomersAction,
  getCustomersActionFailed,
  getCustomersActionSuccess
};
