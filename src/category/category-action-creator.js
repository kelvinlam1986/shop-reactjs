const GET_CATEGORIES = "GET_CATEGORIES";
const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
const GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED";
const LOAD_CURRENT_CATEGORY = "LOAD_CURRENT_CATEGORY";

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

export {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  LOAD_CURRENT_CATEGORY,
  getCategoriesAction,
  getCategoriesActionSuccess,
  getCategoriesActionFailed,
  loadCurrentCategory
};
