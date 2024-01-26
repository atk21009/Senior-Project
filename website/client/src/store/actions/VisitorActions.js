// Module Imports
import axios from "axios";
// Component Imports
import ErrMessage from "../../utils/ErrMessage";
import { FETCH_VISITOR, FETCH_VISITORS } from "./types";

////////////////////////////////////////////////////////////////////////////
// Fetch Visitors
////////////////////////////////////////////////////////////////////////////
export const fetchVisitors = () => async (dispatch) => {
  const orgToken = localStorage.getItem("OrgToken");
  if (orgToken) {
    try {
      await axios
        .get("/api/view-visitors", { params: { orgToken } })
        .then((res) => {
          dispatch({ type: FETCH_VISITORS, payload: res.data });
        });
    } catch (e) {
      ErrMessage(e);
    }
  }
};

////////////////////////////////////////////////////////////////////////////
// Fetch Visitor
////////////////////////////////////////////////////////////////////////////
export const fetchVisitor = (_id) => async (dispatch) => {
  try {
    await axios.get("/api/view-visitor", { params: { _id } }).then((res) => {
      dispatch({ type: FETCH_VISITOR, payload: res.data });
    });
  } catch (e) {
    ErrMessage(e);
  }
};

////////////////////////////////////////////////////////////////////////////
// Delete Visitor
////////////////////////////////////////////////////////////////////////////
export const deleteVisitor = (_id) => async (dispatch) => {
  try {
    await axios.post("/api/delete-visitor", { _id }).then((res) => {
      window.location.href = "/dashboard";
    });
  } catch (e) {
    ErrMessage(e);
  }
};
