import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import DashboardNav from "../../components/DashboardNav";
import renderEmployees from "../Employees/components/RenderEmp";
import renderOrganization from "./components/RenderOrg";
import renderVisitors from "./components/visitors/Visitors";

function renderContent(e) {
  return (
    <div className="page">
      <div className="dashboard">
        <DashboardNav />
        <div className="dashboard-content">
          <div className="dashboard-card">{renderOrganization(e)}</div>

          {renderVisitors(e)}

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

function mapStateToProps({ auth, org, emps, visitors }) {
  return { auth, org, emps, visitors };
}

export default connect(mapStateToProps, actions)(Dashboard);
