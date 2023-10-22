import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import "../styles/components/Header.css";
const Header = (props) => {
  const location = useLocation();

  return <Headercontent location={location} {...props} />;
};

class Headercontent extends Component {
  renderContent() {
    let headerLink = null;
    let headerTitle = null;
    if (this.props.auth) {
      headerLink = "/dashboard";
      headerTitle = "Dashboard";
    } else {
      if (this.props.location.pathname === "/login") {
        headerLink = "/signup";
        headerTitle = "Sign Up";
      } else {
        headerLink = "/login";
        headerTitle = "Login";
      }
    }
    return <Link to={headerLink}>{headerTitle}</Link>;
  }

  render() {
    return (
      <div className="header">
        <div className="header-title">Dynamic Business Sync</div>
        <div className="header-links">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/download">Download</Link>
          <Link to="/support">Support</Link>
        </div>
        <div className="header-auth">{this.renderContent()}</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
