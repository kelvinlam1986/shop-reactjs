import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import coreReducer from "../core/core-reducer";

const rootReducer = combineReducers({
  form: formReducer,
  core: coreReducer
});

export default rootReducer;
