import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DashboardNav from "../components/DashboardNav";

class Settings extends Component {
  render() {
    return (
      <div className="page">
        <div className="dashboard">
          <DashboardNav />
          <div className="dashboard-content">Settings</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Settings);
