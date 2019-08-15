import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import coreReducer from "../core/core-reducer";
import categoryReducer from "../category/category-reducer";

const rootReducer = combineReducers({
  form: formReducer,
  core: coreReducer,
  category: categoryReducer
});

export default rootReducer;
