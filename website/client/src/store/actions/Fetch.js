import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { FETCH_USER, FETCH_ORG } from "./types";
import ErrMessage from "../utils/ErrMessage";

const token = localStorage.getItem("token");

// Auth Fetch
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
      store(res, dispatch);
    });
  } catch (e) {
    ErrMessage(e);
  }
}

// Org Fetch
export async function CO(url, data, dispatch) {
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

// Employee Fetch
export async function createEmps(url, data, dispatch, type) {
  try {
    await axios.post(url, data).then((res) => {
      EmpStore({ res, dispatch, type });
    });
  } catch (e) {
    ErrMessage(e);
  }
}
export async function EmpsFetch(url, dispatch, type) {
  const OrgToken = localStorage.getItem("OrgToken");
  try {
    await axios.get(url, { params: { OrgToken } }).then((res) => {
      dispatch({ type, payload: res });
    });
  } catch (e) {
    ErrMessage(e);
  }
}
export async function EmpFetch(url, data, dispatch, type) {
  const { OrgToken, employeeNumber } = data;

  try {
    await axios
      .get(url, { params: { OrgToken, employeeNumber } })
      .then((res) => {
        dispatch({ type, payload: res });
      });
  } catch (e) {
    ErrMessage(e);
  }
}
export async function UpdateEmp(url, data, dispatch, type) {
  const { employeeNumber } = data;
  window.location.href = `/employee/${employeeNumber}`;
  try {
    await axios.post(url, data).then(async (res) => {
      dispatch({ type: type, payload: res });
    });
  } catch (e) {
    ErrMessage(e);
  }
}

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
function EmpStore(res, dispatch, type) {
  window.location.href = "/dashboard";
  dispatch({ type, payload: res });
}
