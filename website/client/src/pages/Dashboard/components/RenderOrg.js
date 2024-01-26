import { editOrg } from "./EditOrg";
import { DashNoData } from "../../../utils/NoData";

export default function renderOrganization(e) {
  if (e.props.org.status === 204 || !e.props.org) {
    return (
      <>
        <div className="dashboard-card-title">Organization</div>
        {DashNoData(e)}
      </>
    );
  } else {
    var { company, teir, location, owner, admin, hr } = e.props.org.data;
    var data = [teir, location, owner, admin, hr];
    var labels = ["Teir", "Location", "Owner", "Admin", "HR"];
    const CompanyData = [];

    for (let i = 0; i < labels.length; i++) {
      CompanyData.push(
        <div className="dshbrd-fields" key={labels[i]}>
          <div className="dshbrd-fields-label">{labels[i]}:</div>
          <div className="dshbrd-fields-data" id={labels[i]}>
            {data[i].length !== 0 || !data[i] ? data[i] : "None"}
          </div>
        </div>
      );
    }
    return (
      <>
        <div className="dashboard-card-title" id="Company">
          {company}
        </div>
        <div className="dshbrd-fields-ctnr">{CompanyData}</div>
        <div className="dashboard-edit-ctnr" id="dsh-edit-ctnr">
          <button
            className="dashboard-edit-link"
            onClick={() => editOrg(e)}
            id="editOrgBtn"
          >
            Edit Organization<i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </>
    );
  }
}
