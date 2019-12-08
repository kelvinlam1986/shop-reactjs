import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import coreReducer from "../core/core-reducer";
import categoryReducer from "../category/category-reducer";
import customerReducer from "../customer/customer-reducer";
import productReducer from "../product/product-reducer";
import supplierReducer from "../supplier/supplier-reducer";
import bankReducer from "../bank/bank-reducer";

const rootReducer = combineReducers({
  form: formReducer,
  core: coreReducer,
  category: categoryReducer,
  customer: customerReducer,
  product: productReducer,
  supplier: supplierReducer,
  bank: bankReducer
});

export default rootReducer;
