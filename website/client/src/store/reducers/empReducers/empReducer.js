import { FETCH_EMP } from "../../actions/types";

export default function empReducer(state = null, action) {
  switch (action.type) {
    case FETCH_EMP:
      return action.payload || false;
    default:
      return state;
  }
}
