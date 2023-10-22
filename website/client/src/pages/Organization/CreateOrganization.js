import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardNav from "../../components/DashboardNav";
import COForm from "./components/COForm";
import * as actions from "../../store/actions";

class CreateOrganization extends Component {
  render() {
    return (
      <div className="page">
        <div className="dashboard">
          <DashboardNav />

          <COForm onSubmit={this.props.createOrganization} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(CreateOrganization);
