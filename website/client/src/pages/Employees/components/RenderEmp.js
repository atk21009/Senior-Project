import { EmpNoData } from "../../../store/utils/NoData";
import { Link } from "react-router-dom";

export default function renderEmployees(e) {
  let emp = [];

  if (e.props.emps.status === 200) {
    const empData = e.props.emps.data;
    emp = empData.map((employee) => {
      return (
        <tr key={employee.employeeNumber} className="Emp-table-rows">
          <td>
            <Link
              to={`/employee/${employee.employeeNumber}`}
              className="Emp-Link"
            >
              {employee.firstname}
            </Link>
          </td>
          <td>{employee.lastname}</td>
          <td>{employee.email}</td>
          <td>
            <span
              className={
                employee.clockStatus !== "false" ? "ClockedIn" : "ClockedOut"
              }
            >
              {employee.clockStatus !== "false" ? "Clocked In" : "Clocked Out"}
            </span>
          </td>
          <td>{employee.hoursPayPeriod}</td>
          <td>{employee.employeeNumber}</td>
          <td>{employee.office || "-"}</td>
          <td>{employee.position || "-"}</td>
          <td>{employee.phonenumber || "-"}</td>
        </tr>
      );
    });
  }

  return (
    <div className="Emp-list" key={"Emp-emp-ctnr"}>
      <div className="Emp-card-title">
        Employees
        {emp.length !== 0 ? (
          <input
            className="Emp-card-search"
            id="EmpSearch"
            placeholder="Search..."
            onKeyUp={searchEmp}
          />
        ) : null}
      </div>
      <div className="Emp-card-content">
        {emp.length !== 0 ? (
          <table className="Emp-table" id="Emp-table" key={"Emp-emp-table"}>
            <tbody key={"Emp-emp-tbody"}>
              <tr className="Emp-table-headers">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Clock Status</th>
                <th>Hours This Week</th>
                <th>Employee Number</th>
                <th>Office</th>
                <th>Position</th>
                <th>Phone Number</th>
              </tr>
              {emp}
            </tbody>
          </table>
        ) : (
          EmpNoData(e)
        )}
      </div>
    </div>
  );
}

function searchEmp() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("EmpSearch");
  table = document.getElementById("Emp-table");
  filter = input.value.toUpperCase();

  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
