import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DashboardNav from "../../components/DashboardNav";

import * as actions from "../../store/actions";

import renderOT from "./components/RenderOT";
import renderEmployees from "./components/RenderEmp";
import { EmpNoData } from "../../store/utils/NoData";

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  async componentDidMount() {
    if (this.props.emps.status === 203) {
      this.setState({ content: EmpNoData(this) });
    } else if (this.props.emps.status === 200) {
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
                <span>Employees</span>
                {!this.props.org || this.props.org.status === 204 ? (
                  <></>
                ) : (
                  <Link
                    to="/create-employees"
                    className="Emp-create"
                    key={"emp-create-link"}
                  >
                    Create Employees
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                )}
              </div>
              {!this.props.org || this.props.org.status === 204 ? (
                <></>
              ) : (
                <Link
                  to="/create-employees"
                  className="Emp-create-link"
                  key={"emp-create-link"}
                >
                  Create Employees
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              )}
              {this.state.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, org, emps }) {
  return { auth, org, emps };
}

export default connect(mapStateToProps, actions)(Employees);
