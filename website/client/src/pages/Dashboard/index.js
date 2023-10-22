import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../store/actions";

import DashboardNav from "../../components/DashboardNav";
import { FIELDS, EFIELDS } from "./DashboardFields";

import LoadingScreen from "../../components/LoadingScreen";

function renderOrganization(e) {
  console.log(e);
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
          <Link className="dashboard-edit-link">
            Edit Organization<i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
      </>
    );
  }
}

function renderEmployees(e) {
  if (e.props.employees) {
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
        <span>
          No employee information found.{" "}
          <Link to="/create-employees">Create Employee Accounts</Link>
        </span>
      </div>
    );
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
          <div className="dashboard-card employee-view">
            <div className="dashboard-card-title">Employees</div>
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

  componentDidMount() {
    const token = localStorage.getItem("OrgToken");
    this.props.viewOrganization({ _id: token }).then(() => {
      this.setState({ content: renderContent(this) });
    });
  }

  render() {
    return this.state.content;
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

export default connect(mapStateToProps, actions)(Dashboard);
