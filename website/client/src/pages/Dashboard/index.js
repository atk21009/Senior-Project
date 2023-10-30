import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../store/actions";

import DashboardNav from "../../components/DashboardNav";
import { EFIELDS } from "./DashboardFields";

import LoadingScreen from "../../components/LoadingScreen";

function renderOrganization(e) {
  if (e.props.org.status === 204 || !e.props.org) {
    return (
      <>
        <div className="dashboard-card-title">Organization</div>
        <div className="no-data">
          <span>
            No organization information found.{" "}
            <Link to="/create-organization">Create Organization</Link>
          </span>
        </div>
      </>
    );
  } else {
    var { company, teir, location, owner, admin, hr } = e.props.org.data;
    var data = [teir, location, owner, admin, hr];
    var labels = ["Teir", "Location", "Owner", "Admin", "HR"];
    const CompanyData = [];

    for (let i = 0; i < labels.length; i++) {
      CompanyData.push(
        <div className="dshbrd-fields" key={labels[i]}>
          <div className="dshbrd-fields-label">{labels[i]}:</div>
          <div className="dshbrd-fields-data">
            {data[i].length !== 0 || !data[i] ? data[i] : "None"}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="dashboard-card-title">{company}</div>
        <div className="dshbrd-fields-ctnr">{CompanyData}</div>
        <div className="dashboard-edit-ctnr">
          <Link className="dashboard-edit-link" to="/edit-organization">
            Edit Organization<i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
      </>
    );
  }
}

function renderEmployees(e) {
  if (e.props.emp.status === 200) {
    let emp = [];
    const empData = e.props.emp.data;
    empData.map((employee) => {
      return emp.push(
        <tr key={employee.email + " "}>
          <td>{employee.firstname}</td>
          <td>{employee.lastname}</td>
          <td>{employee.email}</td>
          <td>
            {employee.clockStatus === true ? "Clocked In" : "Clocked Out"}
          </td>
          <td>{employee.hoursWorked} Hours</td>
          <td>{employee.employeeNumber}</td>
          <td>{employee.office || "-"}</td>
          <td>{employee.position || "-"}</td>
          <td>{employee.phonenumber || "-"}</td>
        </tr>
      );
    });
    return (
      <div className="Dashboard-card-content">
        <table className="dashboard-table" id="Emp-table">
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
      </div>
    );
  } else {
    if (e.props.org.status === 204) {
      return (
        <div className="Dashboard-card-content">
          <div className="no-data employee-no-data">
            <span>No organization or employee data found.</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Dashboard-card-content">
          <div className="no-data employee-no-data">
            <span>
              No Employees Found.{" "}
              <Link to="/create-employees">Create Employees</Link>
            </span>
          </div>
        </div>
      );
    }
  }
}

function renderVisitors(e) {
  if (e.props.visitors) {
    return EFIELDS.map((e) => {
      return (
        <div className="employee-info">
          {e.status === "clocked in" ? (
            <div className="In"></div>
          ) : (
            <div className="Out"></div>
          )}

          <div>
            <span className="employee-label">Name: </span>
            {e.name} {e.lastname}
          </div>

          <div>
            <span className="employee-label">Email: </span>
            {e.email}
          </div>
          <div>
            <span className="employee-label">Phone Number: </span>
            {e.phonenumber}
          </div>
        </div>
      );
    });
  } else {
    return (
      <div className="no-data">
        You have no current visitors at your business.
      </div>
    );
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

function renderContent(e) {
  return (
    <div className="page">
      <div className="dashboard">
        <DashboardNav />
        <div className="dashboard-content">
          <div className="dashboard-card">{renderOrganization(e)}</div>

          <div className="dashboard-card">
            <div className="dashboard-card-title">Visitors</div>
            {renderVisitors(e)}
          </div>
          <div className="employee-view">
            <div className="employee-card-title">
              Employees{" "}
              {e.props.org.status === 200 ? (
                <input
                  className="Emp-card-search"
                  id="EmpSearch"
                  placeholder="Search..."
                  onKeyUp={searchEmp}
                />
              ) : (
                <></>
              )}
            </div>
            {renderEmployees(e)}
          </div>
        </div>
      </div>
    </div>
  );
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <LoadingScreen />,
    };
  }

  async componentDidMount() {
    if (!this.props.auth || !this.props.org || !this.props.emp) {
      const auth = await this.props.fetchUser();
      const token = localStorage.getItem("OrgToken");
      const VO = await this.props.viewOrganization({ _id: token });
      const VE = await this.props.viewEmployees();

      Promise.all([auth, token, VO, VE]).then(() => {
        this.setState({ content: renderContent(this) });
      });
    } else {
      this.setState({ content: renderContent(this) });
    }
  }

  render() {
    return this.state.content;
  }
}

function mapStateToProps({ auth, org, emp }) {
  return { auth, org, emp };
}

export default connect(mapStateToProps, actions)(Dashboard);
