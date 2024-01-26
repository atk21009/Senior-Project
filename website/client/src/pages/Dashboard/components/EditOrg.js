import ErrMessage from "../../../utils/ErrMessage";
import PromptPassword from "../../../utils/PromptPassword";
import compareDict from "../../../utils/Validation/compareDict";

const labels = ["Location", "Admin", "HR", "Company"];
const id_labels = ["location", "admin", "hr", "company"];

export function editOrg(_this) {
  const { data } = _this.props.org;

  labels.forEach((label) => {
    const input = document.createElement("input");
    input.value = data[label.toLowerCase()];
    if (label === "Company") {
      input.classList.add("dshbrd-fields-data-input-title");
    } else {
      input.classList.add("dshbrd-fields-data-input");
    }

    input.id = label.toLowerCase();
    const field = document.getElementById(label);
    field.innerHTML = null;
    field.append(input);
  });

  toggleBtn(_this);
}

// Toggle Buttons
function toggleBtn(_this) {
  const editOrg = document.getElementById("editOrgBtn");
  const ctnr = document.getElementById("dsh-edit-ctnr");
  if (editOrg) {
    editOrg.remove();
    cancelBtn(_this, ctnr);
    submitBtn(_this, ctnr);
    deleteBtn(_this);
  } else {
    removeBtn();
    editBtn(_this, ctnr);
  }
}
function removeBtn() {
  document.getElementById("saveBtn").remove();
  document.getElementById("cancelBtn").remove();
  //   document.getElementById("delBtn").remove();
}

// Edit Button
const editBtn = (_this, ctnr) => {
  const editBtn = document.createElement("button");
  editBtn.classList.add("dashboard-edit-link");
  editBtn.onclick = () => editOrg(_this);
  editBtn.id = "editOrgBtn";

  const i = document.createElement("i");
  i.classList.add("fa-solid");
  i.classList.add("fa-chevron-right");

  const msg = "Edit Organization";

  editBtn.innerHTML = msg;
  editBtn.appendChild(i);

  ctnr.appendChild(editBtn);
};

// Cancel Button
const cancelBtn = (_this, ctnr) => {
  const { data } = _this.props.org;

  const btn = document.createElement("button");
  btn.textContent = "Cancel";
  btn.classList.add("Emp-Data-Cancel");
  btn.classList.add("Emp-Data-Btn");
  btn.id = "cancelBtn";
  btn.onclick = () => orgCancelSave(_this, data);

  ctnr.appendChild(btn);
};
function orgCancelSave(_this, data) {
  labels.forEach((label) => {
    const val = document.getElementById(label);
    const _id = label.toLowerCase();

    if (_id === "admin" || _id === "hr") {
      if (data[_id].length > 0) {
        val.innerHTML = data[_id];
      } else {
        val.innerHTML = "None";
      }
    } else {
      if (data[_id]) {
        val.innerHTML = data[_id];
      } else {
        val.innerHTML = "None";
      }
    }
  });
  toggleBtn(_this);
}

// Submit Button
const submitBtn = (_this, ctnr) => {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("Emp-Data-Save");
  saveBtn.classList.add("Emp-Data-Btn");
  saveBtn.id = "saveBtn";

  saveBtn.onclick = () => saveOrg(_this);
  ctnr.appendChild(saveBtn);
};
function saveOrg(_this) {
  const { data } = _this.props.org;
  const prevData = getData(data);
  let newData = getData(data);
  const input = document.getElementsByTagName("input");
  const inputs = [...input];

  inputs.forEach((e) => {
    if (id_labels.includes(e.id)) {
      if (e.id === "hr" || e.id === "admin") {
        if (e.value) {
          newData[e.id] = e.value;
        }
      } else {
        newData[e.id] = e.value;
      }
    }
  });

  const same = compareDict(prevData, newData);
  if (same) {
    const error = {
      response: { data: "No values have been updated" },
    };
    ErrMessage(error);
    toggleBtn(_this);
  } else {
    PromptPassword(_this, "updateOrg", newData);
  }
}
const getData = (data) => {
  const _data = {
    company: data.company,
    location: data.location,
    admin: data.admin,
    hr: data.hr,
    _id: data._id,
  };

  return _data;
};
export async function saveOrgData(_this, data) {
  await _this.props.updateOrganization(data);
}

// Delete Button
const deleteBtn = (_this) => {
  const title = document.getElementById("Company");
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("del-org-btn");
  delBtn.classList.add("Emp-Data-Btn");

  delBtn.id = "delBtn";

  delBtn.onclick = () => delOrg(_this);
  title.appendChild(delBtn);
};
function delOrg(_this) {
  const { data } = _this.props.org;
  const { _id } = _this.props.org.data;
  orgCancelSave(_this, data);
  PromptPassword(_this, "delOrg", _id);
}
export async function DeleteOrg(_this, _id) {
  const data = { auth_id: _this.props.auth.id, Org_id: _id };

  await _this.props.deleteOrganization(data);
}
