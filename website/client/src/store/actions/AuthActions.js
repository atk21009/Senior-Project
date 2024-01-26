// Module Imports
import axios from "axios";
// Component Imports
import ErrMessage from "../../utils/ErrMessage";
import { FETCH_USER } from "./types";
import {
  DeleteOrg,
  saveOrgData,
} from "../../pages/Dashboard/components/EditOrg";
import { deleteEmp, saveData } from "../../utils/EmployeeProfileUtils";

////////////////////////////////////////////////////////////////////////////
// Fetch User
////////////////////////////////////////////////////////////////////////////
export const fetchUser = () => async (dispatch) => {
  await FetchUser(dispatch);
};

////////////////////////////////////////////////////////////////////////////
// Register User
////////////////////////////////////////////////////////////////////////////
export const signup = (data) => async (dispatch) => {
  await AuthPost("/api/register", data, dispatch);
};

////////////////////////////////////////////////////////////////////////////
// Login User
////////////////////////////////////////////////////////////////////////////
export const login = (data) => async (dispatch) => {
  await AuthPost("/api/login", data, dispatch);
};

////////////////////////////////////////////////////////////////////////////
// Logout User
////////////////////////////////////////////////////////////////////////////
export const logout = () => async (dispatch) => {
  window.location.href = "/";
  localStorage.removeItem("token");
  localStorage.removeItem("OrgToken");
};

////////////////////////////////////////////////////////////////////////////
// Prompt User Password
////////////////////////////////////////////////////////////////////////////
export const promptPass = (pass, _this, type, data) => async (dispatch) => {
  // Initalization
  const pw = { Password: pass, id: _this.props.auth.id };
  document.getElementById("PromptPass").remove();

  // Validate correct password
  try {
    await axios.post("/api/prompt-pass", pw).then((res) => {
      const { status } = res;

      // Validate Status
      if (!status === 202) {
        throw new Error(`Error while performing ${type}`);
      }

      // Perform action
      switch (type) {
        case "delete":
          deleteEmp(_this);
          return;
        case "update":
          saveData(_this, data);
          return;
        case "updateOrg":
          saveOrgData(_this, data);
          return;
        case "delOrg":
          DeleteOrg(_this, data);
          return;
        default:
          throw new Error(`Error while performing ${type}`);
      }
    });
  } catch (e) {
    ErrMessage(e);
  }
};

////////////////////////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////////////////////////
export async function FetchUser(dispatch) {
  try {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/currentUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.organization && !localStorage.getItem("OrgToken")) {
        localStorage.setItem("OrgToken", res.data.organization);
      }

      dispatch({ type: FETCH_USER, payload: res.data });
    }
  } catch (e) {
    window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("OrgToken");
    ErrMessage(e);
  }
}

export async function AuthPost(url, data, dispatch) {
  try {
    await axios.post(url, data).then((res) => {
      store(res);
    });
  } catch (e) {
    ErrMessage(e);
  }
}

////////////////////////////////////////////////////////////////////////////
// Store
////////////////////////////////////////////////////////////////////////////
function store(res) {
  const token = res.data.accessToken;

  localStorage.setItem("token", token);
  window.location.href = "/dashboard";
}
