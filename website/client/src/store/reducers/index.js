import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import orgReducer from "./orgReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  org: orgReducer,
});
