import axios from "axios";
import {
  FETCH_USER,
  FETCH_ORG,
  FETCH_EMP,
  FETCH_DATA_ORG,
  CREATE_EMP_RES,
} from "./types";
import { jwtDecode } from "jwt-decode";

// Authorization Actions ----------------------------------------------------
export const fetchUser = () => async (dispatch) => {
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
  }
};
export const signup = (data) => async (dispatch) => {
  await axios.post("/api/register", data).then((res) => {
    store(res, dispatch);
  });
};
export const login = (data) => async (dispatch) => {
  await axios.post("/api/login", data).then((res) => {
    store(res, dispatch);
  });
};
export const logout = () => async (dispatch) => {
  window.location.href = "/";
  localStorage.removeItem("token");
  localStorage.removeItem("OrgToken");
};

// Organization Actions ----------------------------------------------------
export const createOrganization = (data) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/currentUser", {
    headers: { Authorization: `Bearer ${token}` },
  });
  await axios.post("/api/create-org", { res, data }).then((res) => {
    OrgStore(res, dispatch);
  });
};
export const updateOrganization = (data) => async (dispatch) => {
  console.log(data);
};
export const viewOrganization = (data) => async (dispatch) => {
  await axios.get("/api/view-org", { params: data }).then((res) => {
    dispatch({ type: FETCH_ORG, payload: res });
  });
};
export const deleteOrganization = () => async (dispatch) => {};
export const getOrganizationData = () => async (dispatch) => {
  const OrgToken = localStorage.getItem("OrgToken");

  await axios.get("/api/org-data", { params: { OrgToken } }).then((res) => {
    dispatch({ type: FETCH_DATA_ORG, payload: res });
  });
};

// Employee Actions ----------------------------------------------------
export const createEmployee = (data) => async (dispatch) => {
  const OrgToken = localStorage.getItem("OrgToken");

  await axios.post("/api/create-emp", { OrgToken, data }).then((res) => {
    EmpStore(res, dispatch);
  });
};
export const createEmployees = (data) => async (dispatch) => {
  await axios.post("/api/create-employees", data).then((res) => {
    dispatch({ type: CREATE_EMP_RES, payload: res });
  });
};
export const viewEmployees = () => async (dispatch) => {
  const token = localStorage.getItem("OrgToken");

  await axios.get("/api/view-employees", { params: { token } }).then((res) => {
    dispatch({ type: FETCH_EMP, payload: res });
  });
};

// Visitor Actions ----------------------------------------------------

// Store Functions ----------------------------------------------------
function store(res, dispatch) {
  const token = res.data.accessToken;
  const user = jwtDecode(token);

  localStorage.setItem("token", token);
  window.location.href = "/dashboard";
  dispatch({ type: FETCH_USER, payload: { token, user } });
}
function OrgStore(res, dispatch) {
  const OrgToken = res.data._id;
  const Org = res.data;
  localStorage.setItem("OrgToken", OrgToken);
  window.location.href = "/dashboard";
  dispatch({ type: FETCH_ORG, payload: { OrgToken, Org } });
}
function EmpStore(res, dispatch) {
  window.location.href = "/dashboard";
  dispatch({ type: FETCH_EMP, payload: { res } });
}
