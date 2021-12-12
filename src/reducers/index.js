import { combineReducers } from "redux";
import { inquiryReducer } from "./inquiry";
import { authReducer } from "./auth";
import { customerReducer } from "./customer";
import { labelReducer } from "./labels";
import { taskReducer } from "./tasks";
import { employeeReducer } from "./employee";
import { chatReducer } from "./chat";
import { SearchReducer } from "./search";

const allReducers = combineReducers({
  inquiryReducer,
  authReducer,
  customerReducer,
  labelReducer,
  taskReducer,
  employeeReducer,
  chatReducer,
  SearchReducer,
});

export default allReducers;
