import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardNav from "../../components/DashboardNav";
import * as actions from "../../store/actions";
import LoadingScreen from "../../components/LoadingScreen";

class EditOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <LoadingScreen />,
      hrData: [],
      adminData: ["Enter Administrator"],
    };
  }

  renderContent() {
    const { company, owner, location, admin, hr } = this.props.org.data;
    let admin_data = [...this.state.adminData];

    if (admin.length > 0) {
      this.setState({ adminData: admin });
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(event);
    };

    const addAdmin = () => {
      const adminCtnr = document.getElementById("Admin");
      var div = document.createElement("div");
      var input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter Administrator";
      div.appendChild(input);
      var del = document.createElement("button");
      del.type = "button";
      del.textContent = "Delete";
      del.onclick = { delAdmin };
      div.appendChild(del);

      adminCtnr.append(div);
    };
    function delAdmin() {}
    function addHR() {}
    function delHR(e) {
      console.log(e);
    }

    return (
      <div className="page">
        <div className="dashboard">
          <DashboardNav />
          <form onSubmit={handleSubmit} className="form-EO">
            <input placeholder={company} />
            <input placeholder={owner} />
            <input placeholder={location} />
            <div id="Admin">
              <div>
                <input placeholder={"Enter Administrator"} />
                <button type="button" onClick={addAdmin}>
                  Add
                </button>
                <button type="button" onClick={delAdmin}>
                  Delete
                </button>
              </div>
            </div>
            <div>
              <input placeholder={hr.length > 0 ? hr : "Enter HR personnel"} />
              <button type="button" onClick={addHR}>
                Add
              </button>
              <button type="button" onClick={delHR}>
                Delete
              </button>
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    if (!this.props.auth || !this.props.org || !this.props.emp) {
      const auth = await this.props.fetchUser();
      const token = localStorage.getItem("OrgToken");
      const VO = await this.props.viewOrganization({ _id: token });
      const VE = await this.props.viewEmployees();

      Promise.all([auth, token, VO, VE]).then(() => {
        this.setState({ content: this.renderContent() });
      });
    } else {
      this.setState({ content: this.renderContent() });
    }
  }

  render() {
    return this.state.content;
  }
}

function mapStateToProps({ auth, org, emp }) {
  return { auth, org, emp };
}

export default connect(mapStateToProps, actions)(EditOrganization);
