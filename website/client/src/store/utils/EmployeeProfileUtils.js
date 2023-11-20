import ErrMessage from "./ErrMessage";
import PromptPassword from "./PromptPassword";
import compareDict from "./Validation/compareDict";
import isCurrency from "./Validation/isCurrency";

export const dataKeys = [
  "email",
  "phonenumber",
  "employeeNumber",
  "hoursPayPeriod",
  "clockStatus",
  "hourlyRate",
  "position",
  "hireDate",
  "address",
  "birthDate",
];
export const dataKeysLabels = {
  email: "Email",
  address: "Address",
  birthDate: "Birth Date",
  clockStatus: "Clock Status",
  employeeNumber: "Employee Number",
  hireDate: "Hire Date",
  hourlyRate: "Hourly Rate",
  hoursPayPeriod: "Hours Worked",
  phonenumber: "Phone Number",
  position: "Position",
};
export const hoursWorkedLabel = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
export const allowChange = [
  "email",
  "phonenumber",
  "hourlyRate",
  "position",
  "address",
  "birthDate",
];

function hrCheck(e) {
  const insert = e.inputType === "insertText";

  const hr = document.getElementById("hourlyRateInput");
  const len = hr.value.length;
  const lenCon = len === 1;

  if ((lenCon && insert) || (lenCon && insert)) {
    hr.value = "$" + hr.value;
  }

  if (insert && hr.value.charAt(hr.value.length - 1) === ".") {
    hr.value = hr.value + "00";
  }
  console.log(isCurrency(hr.value));
}
export function toggleCollapse(e) {
  const data = document.getElementById(e);
  const title = document.getElementById(e + "-label");
  if (data.style.maxHeight) {
    data.style.maxHeight = null;
    data.classList.remove("EP-Paystub-active");
    title.classList.remove("Paystub-active");
  } else {
    const scrollHeight = data.scrollHeight;
    data.style.maxHeight = scrollHeight + "px";
    data.classList.add("EP-Paystub-active");
    title.classList.add("Paystub-active");
  }
}

export async function deleteEmp(_this) {
  const { employeeNumber } = _this.props.emp.data;
  const company = _this.props.org.data._id;
  const data = { employeeNumber, company };
  await _this.props.deleteEmployee(data);
}

export function addDelete(_this, init) {
  if (!init) {
    // Add Cancel
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("Emp-Data-Cancel");
    deleteBtn.classList.add("Emp-Data-Btn");
    deleteBtn.id = "deleteBtn";
    deleteBtn.onclick = () => deleteEmp(_this);

    // Btn Container
    const btnCtnr = document.getElementById("BtnCtnr");

    // Append
    btnCtnr.append(deleteBtn);
    const Title = document.getElementById("Emp-Profile-Title");
    Title.append(btnCtnr);
  } else {
    return (
      <div className="Emp-Data-Btn-Ctnr" id="BtnCtnr">
        <button
          className="Emp-Data-Cancel Emp-Data-Btn"
          onClick={() => PromptPassword(_this, "delete")}
          id="deleteBtn"
        >
          Delete
        </button>
      </div>
    );
  }
}

export function DBLClick(e, data, _this) {
  if (allowChange.includes(e)) {
    // Add Input
    const input = document.createElement("input");
    input.value = data[e];
    input.classList.add("Emp-Data-Input");
    input.id = e + "Input";

    if (e === "hourlyRate") {
      input.oninput = hrCheck;
    }
    let type = "";
    switch (e) {
      case "email":
        type = e;
        break;
      case "birthDate":
        type = "date";
        break;
      default:
        type = "text";
        break;
    }

    input.type = type;

    const ctnr = document.getElementById(e);
    ctnr.innerHTML = "";
    ctnr.appendChild(input);

    if (!document.getElementById("saveBtn")) {
      document.getElementById("deleteBtn").remove();
      // Add Save
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.classList.add("Emp-Data-Save");
      saveBtn.classList.add("Emp-Data-Btn");
      saveBtn.id = "saveBtn";
      saveBtn.onclick = () => PromptPassword(_this, "update", data);

      // Add Cancel
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList.add("Emp-Data-Cancel");
      cancelBtn.classList.add("Emp-Data-Btn");
      cancelBtn.id = "cancelBtn";
      cancelBtn.onclick = () => cancelSave(_this, data);

      // Btn Container
      const btnCtnr = document.getElementById("BtnCtnr");

      // Append
      btnCtnr.append(cancelBtn);
      btnCtnr.append(saveBtn);
      const Title = document.getElementById("Emp-Profile-Title");
      Title.append(btnCtnr);
    }
  }
}

export function getClockStatus(data) {
  let clockStatus = "";
  let clockStatusClass = "";
  if (data.clockStatus === "false") {
    clockStatus = "Clocked Out";
    clockStatusClass = "ClockedOut";
  } else {
    clockStatus = "Clocked In";
    clockStatusClass = "ClockedIn";
  }
  return [clockStatus, clockStatusClass];
}

export async function saveData(_this, data) {
  let newData = {
    email: data.email,
    phonenumber: data.phonenumber,
    hourlyRate: data.hourlyRate,
    position: data.position,
    address: data.address,
    birthDate: data.birthDate,
  };
  const prevData = {
    email: data.email,
    phonenumber: data.phonenumber,
    hourlyRate: data.hourlyRate,
    position: data.position,
    address: data.address,
    birthDate: data.birthDate,
  };
  document.getElementById("cancelBtn").remove();
  document.getElementById("saveBtn").remove();
  const input = document.getElementsByTagName("input");
  const inputs = [...input];
  const inputVals = inputs.map((e) => {
    return { id: e.id, value: e.value };
  });

  inputVals.forEach(({ id, value }) => {
    const len = id.length - 5;
    const _id = id.substring(0, len);
    newData[_id] = value;
  });

  const same = compareDict(newData, prevData);
  if (same) {
    const error = {
      response: { data: "No values have been updated" },
    };
    ErrMessage(error);
  } else {
    newData["OrgToken"] = localStorage.getItem("OrgToken");
    newData["employeeNumber"] = _this.props.emp.data.employeeNumber;

    await _this.props.updateEmployee(newData);
  }
  addDelete(_this, false);
}

function cancelSave(_this, data) {
  document.getElementById("cancelBtn").remove();
  document.getElementById("saveBtn").remove();
  const input = document.getElementsByTagName("input");
  const inputs = [...input];
  const inputVals = inputs.map((e) => {
    return { id: e.id, value: e.value };
  });

  inputVals.forEach(({ id, value }) => {
    const len = id.length - 5;
    const _id = id.substring(0, len);
    let val = "";
    if (value) {
      if (_id === "birthDate") {
        val = new Date(data[_id]).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "UTC",
        });
      } else {
        val = data[_id] || "____";
      }
    } else {
      val = "____";
    }
    document.getElementById(_id).innerHTML = val;
  });
  addDelete(_this, false);
}
