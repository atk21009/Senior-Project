import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import * as actions from "../actions";

import LoadingScreen from "../../components/LoadingScreen";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <LoadingScreen />,
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("token")) {
      if (
        !this.props.auth ||
        !this.props.org ||
        !this.props.emp ||
        !this.props.orgData
      ) {
        const auth = await this.props.fetchUser();
        const token = localStorage.getItem("OrgToken");
        const VO = await this.props.viewOrganization({ _id: token });
        const VE = await this.props.viewEmployees();
        const orgData = await this.props.getOrganizationData();
        const visitors = await this.props.fetchVisitors();

        Promise.all([auth, token, VO, VE, orgData, visitors]).then(() => {
          this.setState({ content: <Outlet /> });
        });
      } else {
        this.setState({ content: <Outlet /> });
      }
    } else {
      this.setState({ content: <Navigate to="/login" /> });
    }
  }

  render() {
    return this.state.content;
  }
}

function mapStateToProps({ auth, org, emps, orgData, visitors }) {
  return { auth, org, emps, orgData, visitors };
}

export default connect(mapStateToProps, actions)(ProtectedRoute);
