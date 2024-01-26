import React from "react";
import { Link } from "react-router-dom";

export function EmpNoData(e) {
  return (
    <div className="Emp-no-data" key={"No Data"}>
      <div className="no-data">
        {!e.props.org || e.props.org.status === 204 ? (
          <>
            <span>
              No organization information found.{" "}
              <Link to="/create-organization">Create Organization</Link>
            </span>
          </>
        ) : (
          <>
            <span>
              No employees information found.{" "}
              <Link to="/create-employees">Create Employees</Link>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function DashNoData(e) {
  return (
    <div className="no-data">
      {!e.props.org || e.props.org.status === 204 ? (
        <>
          <span>
            No organization information found.{" "}
            <Link to="/create-organization">Create Organization</Link>
          </span>
        </>
      ) : (
        <>
          <span>
            No employees information found.{" "}
            <Link to="/create-employees">Create Employees</Link>
          </span>
        </>
      )}
    </div>
  );
}
