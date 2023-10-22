import React from "react";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";

export default function DashboardNav() {
  return (
    <div className="dash-nav">
      <div>
        <Link to="/dashboard" className="dash-nav-link">
          <i className="fa-solid fa-house"></i>Dashboard
        </Link>
      </div>
      <div>
        <Link to="/organization" className="dash-nav-link">
          <i className="fa-solid fa-building"></i>Organization
        </Link>
      </div>
      <div>
        <Link to="/employees" className="dash-nav-link">
          <i className="fa-solid fa-user"></i>Employees
        </Link>
      </div>

      <div className="bottom">
        <Link to="/settings" className="dash-nav-link bottom-link">
          <i className="fa-solid fa-gear"></i>Settings
        </Link>
        <Link onClick={actions.logout()} className="dash-nav-link bottom-link">
          <i className="fa-solid fa-right-from-bracket"></i>Logout
        </Link>
      </div>
    </div>
  );
}
