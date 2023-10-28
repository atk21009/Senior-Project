import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardNav from "../../components/DashboardNav";
import CEForm from "./components/CEForm";
import * as actions from "../../store/actions";

function csvLabels() {
  const labels = [
    "First Name",
    "Last Name",
    "Email address",
    "Phone Number",
    "Address",
    "SSN",
    "Office Number",
    "Position",
    "Hourly Rate",
    "Birth Date",
  ];

  return labels.map((e) => {
    return (
      <span key={e}>
        {e}
        {e === "Birth Date" ? <></> : <span>, </span>}
      </span>
    );
  });
}

class CreateEmployees extends Component {
  uploadFile() {
    const file = document.getElementById("file_name").files[0];
    const label = document.getElementById("file_label");
    document.getElementById("Create_Employees_button").disabled = false;
    label.classList.remove("hidden");
    label.classList.add("shown");
    label.innerHTML = "";
    label.innerHTML = `<h1>File Selected</h1><div>${file.name}</div>`;
  }

  handleFormSubmit = (props) => (e) => {
    console.log(props);
    e.preventDefault();
    const file = document.getElementById("file_name").files[0];
    const token = localStorage.getItem("OrgToken");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("OrgToken", token);
    props.props.createEmployees(formData);
  };

  render() {
    return (
      <div className="page">
        <div className="dashboard">
          <DashboardNav />
          <div className="CE-page">
            <div className="CE-ctnr">
              <div className="CE-card">
                <div className="CE-subtitle">Create An Employee</div>

                {<CEForm onSubmit={this.props.createEmployee} />}
              </div>
              <div className="CE-card">
                <div className="CE-subtitle">Create Employees</div>
                <div className="CE-card-content">
                  <div className="CE-card-desc">
                    We provided ease of access to create employees. You can
                    simply upload a CSV file with all of the information of your
                    employees. From that we will automatically set up all of the
                    accounts for your employees. We ask you to follow the file
                    structure below.
                  </div>
                  <div className="CE-card-label">{csvLabels()}</div>
                  <form
                    className="CE-Form-Employees"
                    onSubmit={this.handleFormSubmit(this)}
                  >
                    <label className="CE-card-submit">
                      <input
                        type="file"
                        accept=".csv"
                        id="file_name"
                        onChange={() => this.uploadFile()}
                      />
                      Upload File
                    </label>
                    <div id="file_label" className="hidden"></div>
                    <div>
                      <input
                        type="submit"
                        className="CE-employees-submit"
                        value="Create Employees"
                        disabled
                        id="Create_Employees_button"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

export default connect(mapStateToProps, actions)(CreateEmployees);
