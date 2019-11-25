const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_FAILED = "GET_PRODUCTS_FAILED";
const SET_LOADING_PRODUCT = "SET_LOADING_PRODUCT";
const LOAD_CURRENT_PRODUCT = "LOAD_CURRENT_PRODUCT";
const RESET_CURRENT_PRODUCT = "RESET_CURRENT_PRODUCT";
const GET_CATEGORIES_SELECTION = "GET_CATEGORIES_SELECTION";
const GET_CATEGORIES_SELECTION_SUCCESS = "GET_CATEGORIES_SELECTION_SUCCESS";
const GET_CATEGORIES_SELECTION_FAILED = "GET_CATEGORIES_SELECTION_FAILED";
const GET_SUPPLIERS_SELECTION = "GET_SUPPLIERS_SELECTION";
const GET_SUPPLIERS_SELECTION_SUCCESS = "GET_SUPPLIERS_SELECTION_SUCCESS";
const GET_SUPPLIERS_SELECTION_FAILED = "GET_SUPPLIERS_SELECTION_FAILED";

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

const loadCurrentProduct = currentProduct => {
  return { type: LOAD_CURRENT_PRODUCT, payload: { currentProduct } };
};

const resetCurrentProduct = () => {
  return { type: RESET_CURRENT_PRODUCT };
};

const getCategoriesSelection = () => {
  return { type: GET_CATEGORIES_SELECTION };
}

const getCategoriesSelectionSuccess = (data) => {
  return { type: GET_CATEGORIES_SELECTION_SUCCESS, payload: { categories: data } }
}

const getCategoriesSelectionFailed = (error) => {
  return { type: GET_CATEGORIES_SELECTION_FAILED, payload: { error } }
}

const getSuppliersSelection = () => {
  return { type: GET_SUPPLIERS_SELECTION };
}

const getSuppliersSelectionSuccess = (data) => {
  return { type: GET_SUPPLIERS_SELECTION_SUCCESS, payload: { suppliers: data } };
}

const getSuppliersSelectionFailed = (error) => {
  return { type: GET_SUPPLIERS_SELECTION_FAILED, payload: { error } };
}

export {
  SET_LOADING_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  LOAD_CURRENT_PRODUCT,
  RESET_CURRENT_PRODUCT,
  GET_CATEGORIES_SELECTION,
  GET_CATEGORIES_SELECTION_SUCCESS,
  GET_CATEGORIES_SELECTION_FAILED,
  GET_SUPPLIERS_SELECTION,
  GET_SUPPLIERS_SELECTION_SUCCESS,
  GET_SUPPLIERS_SELECTION_FAILED,
  setLoadingProduct,
  getProductsAction,
  getProductsActionFailed,
  getProductsActionSuccess,
  loadCurrentProduct,
  resetCurrentProduct,
  getCategoriesSelection,
  getCategoriesSelectionSuccess,
  getCategoriesSelectionFailed,
  getSuppliersSelection,
  getSuppliersSelectionSuccess,
  getSuppliersSelectionFailed
};
