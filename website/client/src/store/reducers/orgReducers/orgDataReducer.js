import { FETCH_DATA_ORG } from "../../actions/types";

export default function orgDataReducer(state = null, action) {
  switch (action.type) {
    case FETCH_DATA_ORG:
      return action.payload || false;
    default:
      return state;
  }
}
