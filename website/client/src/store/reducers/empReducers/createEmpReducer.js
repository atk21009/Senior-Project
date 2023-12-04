import { CREATE_EMP_RES } from "../../actions/types";

export default function empReducer(state = null, action) {
  switch (action.type) {
    case CREATE_EMP_RES:
      return action.payload || false;
    default:
      return state;
  }
}
