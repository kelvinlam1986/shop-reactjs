const GET_CATEGORIES = "GET_CATEGORIES";
const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
const GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED";
const LOAD_CURRENT_CATEGORY = "LOAD_CURRENT_CATEGORY";
const RESET_CURRENT_CATEGORY = "RESET_CURRENT_CATEGORY";
const LOAD_ADD_NEW_CATEGORY = "LOAD_ADD_NEW_CATEGORY";
const RESET_ADD_NEW_CATEGORY = "RESET_ADD_NEW_CATEGORY";
const SET_LOADING_CATEGORY = "SET_LOADING_CATEGORY";

const setLoadingCategory = isLoading => {
  return {
    type: SET_LOADING_CATEGORY,
    isLoading: isLoading
  };
};

const getCategoriesAction = params => {
  return {
    type: GET_CATEGORIES,
    params: params
  };
};

const getCategoriesActionSuccess = data => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: {
      categories: data.items,
      totalPages: data.totalPage,
      page: data.page + 1
    }
  };
};

const getCategoriesActionFailed = error => {
  return { type: GET_CATEGORIES_FAILED, payload: { error: error } };
};

const loadCurrentCategory = currentCategory => {
  return { type: LOAD_CURRENT_CATEGORY, payload: { currentCategory } };
};

const resetCurrentCategory = () => {
  return { type: RESET_CURRENT_CATEGORY };
};

const loadAddNewCategory = addNewCategory => {
  return { type: LOAD_ADD_NEW_CATEGORY, payload: { addNewCategory } };
};

const resetAddNewCategory = () => {
  return { type: RESET_ADD_NEW_CATEGORY };
};

export {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  LOAD_CURRENT_CATEGORY,
  RESET_CURRENT_CATEGORY,
  LOAD_ADD_NEW_CATEGORY,
  RESET_ADD_NEW_CATEGORY,
  SET_LOADING_CATEGORY,
  getCategoriesAction,
  getCategoriesActionSuccess,
  getCategoriesActionFailed,
  loadCurrentCategory,
  resetCurrentCategory,
  loadAddNewCategory,
  resetAddNewCategory,
  setLoadingCategory
};
