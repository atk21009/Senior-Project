import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DashboardNav from "../../components/DashboardNav";
import LoadingScreen from "../../components/LoadingScreen";

import * as actions from "../../store/actions";

function renderOT() {
  let emp = [];
  for (let i = 0; i < 15; i++) {
    emp.push(
      <tr key={i}>
        <td>Test</td>
        <td>Test</td>
        <td>Test</td>
        <td>Test</td>
        <td>Test</td>
        <td>Test</td>
        <td>
          <i className="fa-solid fa-lock"></i>
        </td>
      </tr>
    );
  }
  return (
    <div className="Emp-list">
      <div className="Emp-card-title">
        Employees Close To Overtime
        <input
          className="Emp-card-search"
          id="OTSearch"
          placeholder="Search..."
          onKeyUp={searchOT}
        />
      </div>
      <div className="Emp-card-content">
        {
          <table className="Emp-table" id="OT-table">
            <tbody>
              <tr className="Emp-table-headers">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Clock Status</th>
                <th>Hours This Week</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
              {emp}
              <tr>
                <td>Test1</td>
                <td>Test2</td>
                <td>Test3</td>
                <td>Test4</td>
                <td>Test5</td>
                <td>Test6</td>
                <td>
                  <i className="fa-solid fa-lock"></i>
                </td>
              </tr>
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}
function renderEmployees() {
  let emp = [];
  for (let i = 0; i < 15; i++) {
    emp.push(
      <tr key={i + " "}>
        <td>Test</td>
        <td>Test</td>
        <td>Test</td>
        <td>Test</td>
        <td>Test</td>
        <td>Test</td>
        <td>
          <i className="fa-solid fa-lock"></i>
        </td>
      </tr>
    );
  }
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
        <table className="Emp-table" id="Emp-table">
          <tbody>
            <tr className="Emp-table-headers">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Clock Status</th>
              <th>Hours This Week</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
            {emp}
            <tr>
              <td>Test1</td>
              <td>Test2</td>
              <td>Test3</td>
              <td>Test4</td>
              <td>Test5</td>
              <td>Test6</td>
              <td>
                <i className="fa-solid fa-lock"></i>
              </td>
            </tr>
          </tbody>
        </table>
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
function renderNoData() {
  return (
    <div className="Emp-no-data">
      <div className="no-data">
        <span>
          No employees information found.{" "}
          <Link to="/create-employees">Create Employees</Link>
        </span>
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

  componentDidMount() {
    const token = localStorage.getItem("OrgToken");
    this.props.viewOrganization({ _id: token }).then(() => {
      if (this.props.org.status === 204) {
        this.setState({ content: renderNoData() });
      } else {
        this.setState({
          content: (
            <>
              {renderOT()}
              {renderEmployees()}
            </>
          ),
        });
      }
    });
  }
  render() {
    return (
      <div className="page">
        <div className="dashboard">
          <DashboardNav />
          <div className="Emp-page">
            <div className="Emp-title">Employees</div>
            <div className="Emp-card-ctnr">{this.state.content}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

export default connect(mapStateToProps, actions)(Employees);
