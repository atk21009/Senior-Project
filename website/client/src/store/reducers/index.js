import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducers/authReducer";
import orgReducer from "./orgReducers/orgReducer";
import empReducer from "./empReducers/empReducer";
import orgDataReducer from "./orgReducers/orgDataReducer";
import createEmpReducer from "./empReducers/createEmpReducer";
import empsReducer from "./empReducers/empsReducer";
import visitorsReducer from "./visitorReducers/visitorsReducer";
import visitorReducer from "./visitorReducers/visitorReducer";

export default combineReducers({
  // auth
  auth: authReducer,

  // org
  org: orgReducer,
  orgData: orgDataReducer,

  // emp
  emp: empReducer,
  emps: empsReducer,
  createEmp: createEmpReducer,

  // visitor
  visitor: visitorReducer,
  visitors: visitorsReducer,

  // component
  form: reduxForm,
});
