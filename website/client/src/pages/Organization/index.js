import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DashboardNav from "../../components/DashboardNav";
import LoadingScreen from "../../components/LoadingScreen";

import * as actions from "../../store/actions";

function renderOrganization(e) {
  if (e.props.org.status === 204 || !e.props.org) {
    return (
      <>
        <div className="Org-title">Organization</div>
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
        <div className="Org-fields" key={labels[i]}>
          <div className="Org-fields-label">{labels[i]}</div>
          <div className="Org-fields-data">
            {data[i].length !== 0 || !data[i] ? data[i] : "None"}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="Org-title">
          {company}
          <Link className="Org-edit-link">
            Edit Organization<i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
        <div className="Org-fields-ctnr">{CompanyData}</div>
      </>
    );
  }
}
function renderData(e) {
  let data = [];
  let headers = [
    "Cost",
    "Clocked In",
    "Clocked Out",
    "Visitors",
    "Close to OT",
  ];
  for (let i = 0; i < 5; i++) {
    data.push(
      <div className="Org-fields" key={headers[i]}>
        <div className="Org-fields-label">{headers[i]}</div>
        <div className="Org-fields-data">Test</div>
      </div>
    );
  }
  return data;
}
function renderContent(e) {
  return (
    <div className="page">
      <div className="dashboard">
        <DashboardNav />
        <div className="Org-ctnr">
          <div className="Org-card">{renderOrganization(e)}</div>
          <div className="Org-card">
            <div className="Org-title">Organization Data</div>
            <div className="Org-content">
              <div className="Org-data-ctnr">{renderData(e)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class Organization extends Component {
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
    console.log(this);
  }

  render() {
    return this.state.content;
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

export default connect(mapStateToProps, actions)(Organization);
