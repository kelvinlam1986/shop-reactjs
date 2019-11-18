import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  SET_LOADING_PRODUCT
} from "./product-action-creator";

const productInitialState = {
  products: [],
  loading: false,
  error: "",
  totalPages: 0,
  page: 1
};

const productReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case SET_LOADING_PRODUCT:
      return Object.assign({}, state, {
        loading: action.isLoading
      });
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        loading: true
      });
    case GET_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
        error: ""
      });
    case GET_PRODUCTS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        customers: null,
        error: action.payload.error
      });
    default:
      return state;
  }
};

export default productReducer;
