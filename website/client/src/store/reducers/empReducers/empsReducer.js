import { FETCH_EMPS } from "../../actions/types";

export default function empsReducer(state = null, action) {
  switch (action.type) {
    case FETCH_EMPS:
      return action.payload || false;
    default:
      return state;
  }
}
