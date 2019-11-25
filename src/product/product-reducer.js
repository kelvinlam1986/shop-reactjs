import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  SET_LOADING_PRODUCT,
  LOAD_CURRENT_PRODUCT,
  RESET_CURRENT_PRODUCT,
  GET_CATEGORIES_SELECTION,
  GET_CATEGORIES_SELECTION_SUCCESS,
  GET_CATEGORIES_SELECTION_FAILED,
  GET_SUPPLIERS_SELECTION,
  GET_SUPPLIERS_SELECTION_SUCCESS,
  GET_SUPPLIERS_SELECTION_FAILED
} from "./product-action-creator";

const productInitialState = {
  products: [],
  loading: false,
  error: "",
  totalPages: 0,
  page: 1,
  currentProduct: {
    id: 0,
    serial: "",
    name: "",
    description: "",
    supplierId: 0,
    supplierName: "",
    categoryId: 0,
    categoryName: "",
    price: 0,
    reorder: 0,

  },
  categories: [],
  suppliers: []
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
    case LOAD_CURRENT_PRODUCT:
      return Object.assign({}, state, {
        currentProduct: action.payload.currentProduct
      });
    case RESET_CURRENT_PRODUCT:
      return Object.assign({}, state, {
        currentProduct: {
          id: 0,
          serial: "",
          name: "",
          description: ""
        }
      });
    case GET_CATEGORIES_SELECTION:
      return Object.assign({}, state, {
        loading: true
      })
    case GET_CATEGORIES_SELECTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        categories: action.payload.categories
      })
    case GET_CATEGORIES_SELECTION_FAILED:
      return Object.assign({}, state, {
        loading: false,
        categories: null,
        error: action.payload.error
      })
    case GET_SUPPLIERS_SELECTION:
      return Object.assign({}, state, {
        loading: true
      })
    case GET_SUPPLIERS_SELECTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        suppliers: action.payload.suppliers
      })
    case GET_SUPPLIERS_SELECTION_FAILED:
      return Object.assign({}, state, {
        loading: false,
        suppliers: null,
        error: action.payload.error
      })
    default:
      return state;
  }
};

export default productReducer;
