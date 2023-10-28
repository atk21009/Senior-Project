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
            {data[i].length !== 0 || !data[i] ? data[i] : "-"}
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
  if (e.props.org.status === 200) {
    const res = e.props.orgData.data;
    let cost = null;
    if (res.cost) {
      cost = "$" + parseFloat(res.cost).toFixed(2);
    } else {
      cost = "$0.00";
    }

    const resData = [cost, res.clockedIn, res.clockedOut, res.Visitor, res.OT];
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
          <div className="Org-fields-data">{resData[i]}</div>
        </div>
      );
    }
    return <div className="Org-data-ctnr">{data}</div>;
  } else {
    return (
      <div className="no-data">
        <span>No organization information found.</span>
      </div>
    );
  }
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
            <div className="Org-content">{renderData(e)}</div>
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

  async componentDidMount() {
    if (!this.props.org || !this.props.orgData) {
      const token = localStorage.getItem("OrgToken");
      const org = await this.props.viewOrganization({ _id: token });
      const orgData = await this.props.getOrganizationData();

      Promise.all([token, org, orgData]).then(() => {
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

function mapStateToProps({ auth, org, orgData }) {
  return { auth, org, orgData };
}

export default connect(mapStateToProps, actions)(Organization);
