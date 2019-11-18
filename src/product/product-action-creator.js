const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_FAILED = "GET_PRODUCTS_FAILED";
const SET_LOADING_PRODUCT = "SET_LOADING_PRODUCT";

const setLoadingProduct = isLoading => {
  return {
    type: SET_LOADING_PRODUCT,
    isLoading: isLoading
  };
};

const getProductsAction = params => {
  return {
    type: GET_PRODUCTS,
    params: params
  };
};

const getProductsActionSuccess = data => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: {
      products: data.items,
      totalPages: data.totalPage,
      page: data.page + 1
    }
  };
};

const getProductsActionFailed = error => {
  return { type: GET_PRODUCTS_FAILED, payload: { error: error } };
};

export {
  SET_LOADING_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  setLoadingProduct,
  getProductsAction,
  getProductsActionFailed,
  getProductsActionSuccess
};
