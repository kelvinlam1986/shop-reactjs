import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  LOAD_CURRENT_CATEGORY,
  RESET_CURRENT_CATEGORY,
  LOAD_ADD_NEW_CATEGORY,
  RESET_ADD_NEW_CATEGORY
} from "./category-action-creator";

const categoryInitialState = {
  categories: [],
  loading: false,
  error: "",
  totalPages: 0,
  page: 1,
  currentCategory: {
    id: 0,
    name: ""
  },
  addNewCategory: {
    id: 0,
    name: ""
  }
};

const categoryReducer = (state = categoryInitialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, {
        loading: true
      });
    case GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        categories: action.payload.categories,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
        error: ""
      });
    case GET_CATEGORIES_FAILED:
      return Object.assign({}, state, {
        loading: false,
        categories: null,
        error: action.payload.error
      });
    case LOAD_CURRENT_CATEGORY:
      return Object.assign({}, state, {
        currentCategory: action.payload.currentCategory
      });
    case RESET_CURRENT_CATEGORY:
      return Object.assign({}, state, {
        currentCategory: { id: 0, name: "" }
      });
    case LOAD_ADD_NEW_CATEGORY:
      return Object.assign({}, state, {
        addNewCategory: action.payload.addNewCategory
      });
    case RESET_ADD_NEW_CATEGORY:
      return Object.assign({}, state, {
        addNewCategory: { id: 0, name: "" }
      });
    default:
      return state;
  }
};

export default categoryReducer;
