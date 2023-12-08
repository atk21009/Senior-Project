import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useParams } from "react-router-dom";

import DashboardNav from "../../../components/DashboardNav";
import LoadingScreen from "../../../components/LoadingScreen";
import {
  dataKeys,
  dataKeysLabels,
  hoursWorkedLabel,
  toggleCollapse,
  DBLClick,
  getClockStatus,
  allowChange,
  addDelete,
} from "../../../store/utils/EmployeeProfileUtils";
import { capitalize } from "../../../store/utils/Functions";

function RenderContent(e) {
  const { data } = e.props.emp;
  const { hoursWorked } = data;

  const hoursWorkedData = hoursWorked.reverse();

  const res = getClockStatus(data);
  const clockStatus = res[0];
  const clockStatusClass = res[1];
  const date = new Date(data.birthDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  });

  return (
    <div className="page">
      <div className="dashboard">
        <DashboardNav />

        <div className="Emp-Profile">
          <div className="Emp-Profile-Card Emp-Profile-Data">
            <div className="Emp-Profile-Title" id="Emp-Profile-Title">
              {data.firstname + " " + data.lastname}
              {addDelete(e, true)}
            </div>
            <div className="EP-Data-Ctnr">
              {dataKeys.map((key) => {
                let classAdd = "";

                if (allowChange.includes(key)) {
                  classAdd = " EPD-Data-Clickable";
                }

                if (key === "clockStatus") {
                  return (
                    <div className="EP-Data-Set" key={key}>
                      <span className="EPD-Label">
                        {dataKeysLabels[key] + ": "}
                      </span>

                      <span className={clockStatusClass}>{clockStatus}</span>
                    </div>
                  );
                } else if (key === "birthDate") {
                  return (
                    <div className="EP-Data-Set" key={key}>
                      <span className="EPD-Label">
                        {dataKeysLabels[key] + ": "}
                      </span>
                      <span
                        className={"EPD-Data" + classAdd}
                        onDoubleClick={() => DBLClick(key, data, e)}
                        id={key}
                      >
                        {data[key] === "" ? "____" : date}
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div className="EP-Data-Set" key={key}>
                      <span className="EPD-Label">
                        {dataKeysLabels[key] + ": "}
                      </span>
                      <span
                        className={"EPD-Data" + classAdd}
                        onDoubleClick={() => DBLClick(key, data, e)}
                        id={key}
                      >
                        {data[key] === "" ? "____" : data[key]}
                      </span>
                    </div>
                  );
                }
              })}
            </div>

            <div className="EP-disclaimer">
              **To edit values double click the value. Employee Number, Clock
              Status, Hours Worked, and Hire Date are not editable**
            </div>
          </div>
          <div className="Emp-Profile-Card">
            <div className="Emp-Paystub-Ctnr">
              {hoursWorkedData.map((payPeriod) => {
                return (
                  <div className="EP-Pay-Ctnr" key={payPeriod.date}>
                    <div
                      id={payPeriod.date + "-label"}
                      className="EP-Pay-Title Paystub-collapsible"
                      onClick={() =>
                        toggleCollapse(
                          payPeriod.date,
                          payPeriod.date + "-label"
                        )
                      }
                    >
                      {payPeriod.date}
                    </div>
                    <div className="EP-Pay-Data" id={payPeriod.date}>
                      {hoursWorkedLabel.map((day) => {
                        return (
                          <div className="EP-Paystub" key={day}>
                            <span className="EPP-Date">{capitalize(day)}</span>
                            <span className="EPP-Ctnr">
                              <span className="EPP-data-ctnr">
                                <span className="EPP-Label">
                                  Hours Worked:{" "}
                                </span>
                                <span className="EPP-Data">
                                  {payPeriod[day].hours}
                                </span>
                              </span>

                              <span className="EPP-data-ctnr">
                                <span className="EPP-Label">Pay: </span>
                                <span className="EPP-Data">
                                  {payPeriod[day].pay}
                                </span>
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class EmployeeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <LoadingScreen />,
    };
  }
  async componentDidMount() {
    if (!this.props.emp) {
      const OrgToken = localStorage.getItem("OrgToken");
      const data = {
        OrgToken,
        employeeNumber: this.props.params.employee_number,
      };
      await this.props.viewEmployee(data).then((res) => {
        this.setState({ content: RenderContent(this) });
      });
    } else {
      const match =
        this.props.emp.data._id === this.props.params.employee_number;
      if (!match) {
        const OrgToken = localStorage.getItem("OrgToken");
        const data = {
          OrgToken,
          employeeNumber: this.props.params.employee_number,
        };
        await this.props.viewEmployee(data).then((res) => {
          this.setState({ content: RenderContent(this) });
        });
      } else {
        this.setState({ content: RenderContent(this) });
      }
    }
  }

  render() {
    return this.state.content;
  }
}

function mapStateToProps({ auth, org, emp }) {
  return { auth, org, emp };
}
const withRouter = (Child) => {
  return (props) => {
    const params = useParams();
    return <Child {...props} params={params} />;
  };
};

export default withRouter(connect(mapStateToProps, actions)(EmployeeProfile));
