import { Link } from "react-router-dom";

const acceptedVals = [
  "firstname",
  "lastname",
  "phonenumber",
  "location",
  "arrived",
];

export default function renderVisitors(e) {
  const { visitors } = e.props;
  if (visitors) {
    if (visitors.length > 0) {
      return (
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            Visitors
            {visitors.length !== 0 ? (
              <input
                className="Emp-card-search"
                id="VisitorSearch"
                placeholder="Search..."
                onKeyUp={searchVisitor}
              />
            ) : null}
          </div>
          <div className="visitor-ctnr">
            <table className="visitor-table" id="visitorTable">
              <tbody className="visitor-tbody">
                <tr className="visitor-info visitor-header">
                  <td>Name</td>
                  <td>Phone Number</td>
                  <td>Location</td>
                  <td>Time of Arrival</td>
                </tr>
                {visitors.map((e) => {
                  return (
                    <tr className="visitor-info" key={e._id}>
                      {Object.keys(e).map((key) => {
                        if (key === "firstname") {
                          return (
                            <td className="visitor-data" key={key}>
                              <Link to={"/visitor/" + e._id}>
                                {e[key] + " " + e["lastname"]}
                              </Link>
                            </td>
                          );
                        } else if (key === "lastname") {
                          return null;
                        } else if (acceptedVals.includes(key)) {
                          return (
                            <td className="visitor-data" key={key}>
                              {e[key] || "-"}
                            </td>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="dashboard-card">
          <div className="dashboard-card-title">Visitors</div>
          <div className="no-data">
            You have no current visitors at your business.
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="dashboard-card">
        <div className="dashboard-card-title">Visitors</div>
        <div className="no-data">
          You have no current visitors at your business.
        </div>
      </div>
    );
  }
}

function searchVisitor() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("VisitorSearch");
  table = document.getElementById("visitorTable");
  filter = input.value.toUpperCase();

  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
