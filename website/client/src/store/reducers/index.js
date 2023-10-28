import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import orgReducer from "./orgReducer";
import empReducer from "./empReducer";
import orgDataReducer from "./orgDataReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  org: orgReducer,
  emp: empReducer,
  orgData: orgDataReducer,
});
