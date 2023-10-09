import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../styles/components/Header.css";

export default function Header() {
  const { pathname } = useLocation();
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
      <div className="header-auth">
        {pathname === "/login" ? (
          <Link to="/signup">Sign Up</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
