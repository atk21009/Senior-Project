// Module Imports
import axios from "axios";
// Component Imports
import ErrMessage from "../../utils/ErrMessage";
import { FETCH_ORG, FETCH_DATA_ORG } from "./types";

////////////////////////////////////////////////////////////////////////////
// Create Organization
////////////////////////////////////////////////////////////////////////////
export const createOrganization = (data) => async (dispatch) => {
  await CO("/api/create-org", data, dispatch);
};

////////////////////////////////////////////////////////////////////////////
// Update Organization
////////////////////////////////////////////////////////////////////////////
export const updateOrganization = (data) => async (dispatch) => {
  try {
    await axios.post("/api/update-org", data).then((res) => {
      window.location.href = "/dashboard";
    });
  } catch (e) {
    ErrMessage(e);
  }
};

////////////////////////////////////////////////////////////////////////////
// View Organization
////////////////////////////////////////////////////////////////////////////
export const viewOrganization = (data) => async (dispatch) => {
  await OrgData("/api/view-org", data, dispatch, FETCH_ORG);
};

////////////////////////////////////////////////////////////////////////////
// Delete Organization
////////////////////////////////////////////////////////////////////////////
export const deleteOrganization = (data) => async (dispatch) => {
  try {
    await axios.post("/api/delete-org", data).then((res) => {
      localStorage.removeItem("OrgToken");
      window.location.href = "/dashboard";
    });
  } catch (e) {
    ErrMessage(e);
  }
};

////////////////////////////////////////////////////////////////////////////
// Get Organization Data
////////////////////////////////////////////////////////////////////////////
export const getOrganizationData = () => async (dispatch) => {
  const OrgToken = localStorage.getItem("OrgToken");

  await OrgData("/api/org-data", { OrgToken }, dispatch, FETCH_DATA_ORG);
};

////////////////////////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////////////////////////
export async function CO(url, data, dispatch) {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get("/api/currentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    await axios.post(url, { res, data }).then((res) => {
      OrgStore(res, dispatch);
    });
  } catch (e) {
    ErrMessage(e);
  }
}
export async function OrgData(url, data, dispatch, type) {
  try {
    await axios.get(url, { params: data }).then((res) => {
      dispatch({ type, payload: res });
    });
  } catch (e) {
    ErrMessage(e);
  }
}

////////////////////////////////////////////////////////////////////////////
// Store Functions
////////////////////////////////////////////////////////////////////////////
function OrgStore(res, dispatch) {
  const OrgToken = res.data._id;
  const Org = res.data;
  localStorage.setItem("OrgToken", OrgToken);
  window.location.href = "/dashboard";
  dispatch({ type: FETCH_ORG, payload: { OrgToken, Org } });
}
