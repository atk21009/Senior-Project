import { FETCH_ORG } from "../../actions/types";

export default function authReducer(state = null, action) {
  switch (action.type) {
    case FETCH_ORG:
      return action.payload || false;
    default:
      return state;
  }
}
