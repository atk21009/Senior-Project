import { FETCH_VISITORS } from "../../actions/types";

export default function visitorReducer(state = null, action) {
  switch (action.type) {
    case FETCH_VISITORS:
      return action.payload || false;
    default:
      return state;
  }
}
