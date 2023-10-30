import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import orgReducer from "./orgReducer";
import empReducer from "./empReducer";
import orgDataReducer from "./orgDataReducer";
import createEmpReducer from "./createEmpReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  org: orgReducer,
  emp: empReducer,
  orgData: orgDataReducer,
  createEmp: createEmpReducer,
});
