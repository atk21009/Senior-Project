import React, { Component } from "react";
import { connect } from "react-redux";
import { editOrg } from "./EditOrg";

import * as actions from "../../store/actions";

import DashboardNav from "../../components/DashboardNav";
import { EFIELDS } from "./DashboardFields";

import renderEmployees from "../Employees/components/RenderEmp";
import { DashNoData } from "../../store/utils/NoData";

function renderOrganization(e) {
  if (e.props.org.status === 204 || !e.props.org) {
    return (
      <>
        <div className="dashboard-card-title">Organization</div>
        {DashNoData(e)}
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
          <div className="dshbrd-fields-data" id={labels[i]}>
            {data[i].length !== 0 || !data[i] ? data[i] : "None"}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="dashboard-card-title" id="Company">
          {company}
        </div>
        <div className="dshbrd-fields-ctnr">{CompanyData}</div>
        <div className="dashboard-edit-ctnr" id="dsh-edit-ctnr">
          <button
            className="dashboard-edit-link"
            onClick={() => editOrg(e)}
            id="editOrgBtn"
          >
            Edit Organization<i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </>
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
          <div className="employee-view">{renderEmployees(e)}</div>
        </div>
      </div>
    </div>
  );
}

class Dashboard extends Component {
  render() {
    return renderContent(this);
  }
}

function mapStateToProps({ auth, org, emps }) {
  return { auth, org, emps };
}

export default connect(mapStateToProps, actions)(Dashboard);
