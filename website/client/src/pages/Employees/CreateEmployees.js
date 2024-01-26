import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardNav from "../../components/DashboardNav";
import CEForm from "./components/CEForm";
import * as actions from "../../store/actions";

import Employees_template from "./Employees_template.csv";

class CreateEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
    };
  }

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
    e.preventDefault();
    const file = document.getElementById("file_name").files[0];
    const token = localStorage.getItem("OrgToken");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("OrgToken", token);
    props.props.createEmployees(formData);
    props.setState({ show: true });
  };

  closeResponse() {
    this.setState({ show: false });
    window.location.href = "/employees";
  }

  renderResponse = () => {
    if (this.props.createEmp) {
      if (this.props.createEmp.status === 206 && this.state.show) {
        return (
          <div className="CE-response-ctnr">
            <i
              className="fa-solid fa-xmark CE-response-close"
              onClick={() => this.closeResponse()}
            ></i>
            <div className="CE-response-title">Errors</div>
            <table className="CE-response-table">
              <tbody>
                {this.props.createEmp.data.map((e) => {
                  return (
                    <tr>
                      <td>
                        Employee: {e.firstname} {e.lastname}
                      </td>

                      <td>Employee Number: {e.employeeNumber}</td>
                      <td>
                        Error:{" "}
                        {e.error.map((e) => {
                          return e;
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      } else if (this.props.createEmp.status === 201 && this.state.show) {
        return (
          <div className="CE-response-ctnr">
            <div>
              <i
                className="fa-solid fa-xmark CE-response-close"
                onClick={() => this.closeResponse()}
              ></i>
              <div className="CE-response-title success-emp-creation">
                All employees were successfully created
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <></>;
    }
  };

  render() {
    return (
      <div className="page">
        <div className="dashboard">
          <DashboardNav />
          <div className="CE-page">
            {this.renderResponse()}
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
                    employees. From that, we will automatically set up all of
                    the accounts for your employees. We ask you to follow the
                    file structure below. Below we have provided a template of
                    how the file should be structured.
                  </div>
                  <a
                    href={Employees_template}
                    download={"Employees_template.csv"}
                    className="CE-template-download"
                  >
                    <span>Download Template</span>
                    <i className="fa-solid fa-circle-down"></i>
                  </a>
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

function mapStateToProps({ auth, org, createEmp }) {
  return { auth, org, createEmp };
}

export default connect(mapStateToProps, actions)(CreateEmployees);
