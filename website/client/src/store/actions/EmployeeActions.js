// Module Imports
import axios from "axios";
// Component Imports
import {
  CREATE_EMPS_RES,
  CREATE_EMP_RES,
  FETCH_EMP,
  FETCH_EMPS,
  UPDATE_EMP,
} from "./types";
import ErrMessage from "../../utils/ErrMessage";

////////////////////////////////////////////////////////////////////////////
// Create Employee
////////////////////////////////////////////////////////////////////////////
export const createEmployee = (data) => async (dispatch) => {
  const OrgToken = localStorage.getItem("OrgToken");
  await createEmps(
    "/api/create-emp",
    { OrgToken, data },
    dispatch,
    CREATE_EMP_RES
  );
};

////////////////////////////////////////////////////////////////////////////
// Create Employees
////////////////////////////////////////////////////////////////////////////
export const createEmployees = (data) => async (dispatch) => {
  await createEmps("/api/create-employees", data, dispatch, CREATE_EMPS_RES);
};

////////////////////////////////////////////////////////////////////////////
// View Employees
////////////////////////////////////////////////////////////////////////////
export const viewEmployees = () => async (dispatch) => {
  await EmpsFetch("/api/view-employees", dispatch, FETCH_EMPS);
};

////////////////////////////////////////////////////////////////////////////
// View Employee
////////////////////////////////////////////////////////////////////////////
export const viewEmployee = (data) => async (dispatch) => {
  await EmpFetch("/api/view-employee", data, dispatch, FETCH_EMP);
};

////////////////////////////////////////////////////////////////////////////
// Update Employee
////////////////////////////////////////////////////////////////////////////
export const updateEmployee = (data) => async (dispatch) => {
  await UpdateEmp("/api/update-employee", data, dispatch, UPDATE_EMP).then();
};

////////////////////////////////////////////////////////////////////////////
// Delete Employee
////////////////////////////////////////////////////////////////////////////
export const deleteEmployee = (data) => async (dispatch) => {
  try {
    await axios.post("/api/delete-employee", data).then((res) => {
      window.location.href = "/employees";
    });
  } catch (e) {
    ErrMessage(e);
  }
};

////////////////////////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////
// Store Functions
////////////////////////////////////////////////////////////////////////////
function EmpStore(res, dispatch, type) {
  window.location.href = "/dashboard";
  dispatch({ type, payload: res });
}
