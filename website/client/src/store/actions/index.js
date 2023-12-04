import {
  FETCH_ORG,
  FETCH_EMP,
  FETCH_EMPS,
  FETCH_DATA_ORG,
  CREATE_EMP_RES,
  CREATE_EMPS_RES,
  UPDATE_EMP,
  FETCH_VISITORS,
  FETCH_VISITOR,
} from "./types";
import {
  AuthPost,
  CO,
  EmpFetch,
  EmpsFetch,
  FetchUser,
  OrgData,
  createEmps,
  UpdateEmp,
} from "./Fetch";

import { saveData, deleteEmp } from "../utils/EmployeeProfileUtils";
import axios from "axios";
import ErrMessage from "../utils/ErrMessage";
import {
  DeleteOrg,
  saveOrgData,
} from "../../pages/Dashboard/components/EditOrg";

// Authorization Actions ----------------------------------------------------
export const fetchUser = () => async (dispatch) => {
  await FetchUser(dispatch);
};
export const signup = (data) => async (dispatch) => {
  await AuthPost("/api/register", data, dispatch);
};
export const login = (data) => async (dispatch) => {
  await AuthPost("/api/login", data, dispatch);
};
export const logout = () => async (dispatch) => {
  window.location.href = "/";
  localStorage.removeItem("token");
  localStorage.removeItem("OrgToken");
};

export const promptPass = (pass, _this, type, data) => async (dispatch) => {
  const pw = { Password: pass, id: _this.props.auth.id };
  document.getElementById("PromptPass").remove();
  try {
    await axios.post("/api/prompt-pass", pw).then((res) => {
      const { status } = res;
      if (status === 202 && type === "delete") {
        deleteEmp(_this);
      } else if (status === 202 && type === "update") {
        saveData(_this, data);
      } else if (status === 202 && type === "updateOrg") {
        saveOrgData(_this, data);
      } else if (status === 202 && type === "delOrg") {
        DeleteOrg(_this, data);
      }
    });
  } catch (e) {
    ErrMessage(e);
  }
};

// Organization Actions ----------------------------------------------------
export const createOrganization = (data) => async (dispatch) => {
  await CO("/api/create-org", data, dispatch);
};
export const updateOrganization = (data) => async (dispatch) => {
  try {
    await axios.post("/api/update-org", data).then((res) => {
      window.location.href = "/dashboard";
    });
  } catch (e) {
    ErrMessage(e);
  }
};
export const viewOrganization = (data) => async (dispatch) => {
  await OrgData("/api/view-org", data, dispatch, FETCH_ORG);
};
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
export const getOrganizationData = () => async (dispatch) => {
  const OrgToken = localStorage.getItem("OrgToken");

  await OrgData("/api/org-data", { OrgToken }, dispatch, FETCH_DATA_ORG);
};

// Employee Actions ----------------------------------------------------
export const createEmployee = (data) => async (dispatch) => {
  const OrgToken = localStorage.getItem("OrgToken");
  await createEmps(
    "/api/create-emp",
    { OrgToken, data },
    dispatch,
    CREATE_EMP_RES
  );
};
export const createEmployees = (data) => async (dispatch) => {
  await createEmps("/api/create-employees", data, dispatch, CREATE_EMPS_RES);
};
export const viewEmployees = () => async (dispatch) => {
  await EmpsFetch("/api/view-employees", dispatch, FETCH_EMPS);
};
export const viewEmployee = (data) => async (dispatch) => {
  await EmpFetch("/api/view-employee", data, dispatch, FETCH_EMP);
};
export const updateEmployee = (data) => async (dispatch) => {
  await UpdateEmp("/api/update-employee", data, dispatch, UPDATE_EMP).then();
};
export const deleteEmployee = (data) => async (dispatch) => {
  try {
    await axios.post("/api/delete-employee", data).then((res) => {
      window.location.href = "/employees";
    });
  } catch (e) {
    ErrMessage(e);
  }
};

// Visitor Actions ----------------------------------------------------
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

export const fetchVisitor = (_id) => async (dispatch) => {
  try {
    await axios.get("/api/view-visitor", { params: { _id } }).then((res) => {
      dispatch({ type: FETCH_VISITOR, payload: res.data });
    });
  } catch (e) {
    ErrMessage(e);
  }
};

export const deleteVisitor = (_id) => async (dispatch) => {
  try {
    await axios.post("/api/delete-visitor", { _id }).then((res) => {
      window.location.href = "/dashboard";
    });
  } catch (e) {
    ErrMessage(e);
  }
};
