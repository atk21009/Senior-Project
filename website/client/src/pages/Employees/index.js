import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DashboardNav from "../../components/DashboardNav";
import LoadingScreen from "../../components/LoadingScreen";

import * as actions from "../../store/actions";

function renderOT(e) {
  const empData = e.props.emp.data;
  const emp = empData.map((employee) => {
    return parseInt(employee.hoursWorked) >= 40 ? (
      <tr key={employee.email + " "}>
        <td>{employee.firstname}</td>
        <td>{employee.lastname}</td>
        <td>{employee.email}</td>
        <td>{employee.clockStatus === true ? "Clocked In" : "Clocked Out"}</td>
        <td>{employee.hoursWorked} Hours</td>
        <td>{employee.employeeNumber}</td>
        <td>{employee.office || "-"}</td>
        <td>{employee.position || "-"}</td>
        <td>{employee.phonenumber || "-"}</td>
      </tr>
    ) : (
      <></>
    );
  });

  return (
    <div className="Emp-list">
      <div className="Emp-card-title">
        Employees Over Time
        <input
          className="Emp-card-search"
          id="OTSearch"
          placeholder="Search..."
          onKeyUp={searchOT}
        />
      </div>
      <div className="Emp-card-content">
        {emp.length !== 0 ? (
          <table className="Emp-table" id="OT-table">
            <tbody>
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
          <div className="Emp-overtime">
            No employees are on over time hours
          </div>
        )}
      </div>
    </div>
  );
}
function renderEmployees(e) {
  let emp = [];
  const empData = e.props.emp.data;
  empData.map((employee) => {
    return emp.push(
      <tr key={employee.email + " "}>
        <td>{employee.firstname}</td>
        <td>{employee.lastname}</td>
        <td>{employee.email}</td>
        <td>{employee.clockStatus === true ? "Clocked In" : "Clocked Out"}</td>
        <td>{employee.hoursWorked} Hours</td>
        <td>{employee.employeeNumber}</td>
        <td>{employee.office || "-"}</td>
        <td>{employee.position || "-"}</td>
        <td>{employee.phonenumber || "-"}</td>
      </tr>
    );
  });
  return (
    <div className="Emp-list">
      <div className="Emp-card-title">
        Employees
        <input
          className="Emp-card-search"
          id="EmpSearch"
          placeholder="Search..."
          onKeyUp={searchEmp}
        />
      </div>
      <div className="Emp-card-content">
        {emp.length !== 0 ? (
          <table className="Emp-table" id="Emp-table">
            <tbody>
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
          <div className="Emp-overtime">No employees found</div>
        )}
      </div>
    </div>
  );
}
function searchOT() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("OTSearch");
  table = document.getElementById("OT-table");
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
function renderNoData(e) {
  console.log(e);
  return (
    <div className="Emp-no-data">
      <div className="no-data">
        {!e.props.org || e.props.org.status === 204 ? (
          <>
            <span>
              No organization information found.{" "}
              <Link to="/create-organization">Create Organization</Link>
            </span>
          </>
        ) : (
          <>
            <span>
              No employees information found.{" "}
              <Link to="/create-employees">Create Employees</Link>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <LoadingScreen />,
    };
  }

  async componentDidMount() {
    if (!this.props.emp) {
      await this.props.viewEmployees().then(() => {
        if (this.props.emp.status === 200) {
          this.setState({
            content: [renderOT(this), renderEmployees(this)],
          });
        } else {
          this.setState({ content: renderNoData(this) });
        }
      });
    } else if (this.props.emp.status === 203) {
      this.setState({ content: renderNoData(this) });
    } else if (this.props.emp.status === 200) {
      this.setState({
        content: [renderOT(this), renderEmployees(this)],
      });
    }
  }

  render() {
    return (
      <div className="page">
        <div className="dashboard">
          <DashboardNav />
          <div className="Emp-page">
            <div className="Emp-card-ctnr">
              <div className="Emp-title">
                Employees
                {!this.props.org || this.props.org.status === 204 ? (
                  <></>
                ) : (
                  <Link to="/create-employees" className="Emp-create">
                    Create Employees
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                )}
              </div>
              {this.state.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, org, emp }) {
  return { auth, org, emp };
}

export default connect(mapStateToProps, actions)(Employees);
