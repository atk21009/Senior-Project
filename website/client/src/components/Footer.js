import React from "react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-copy">Dynamic Business Sync &copy; 2023</div>
      <div className="footer-links">
        <Link>Features</Link>
        <Link>Pricing</Link>
        <Link>Download</Link>
        <Link>Support</Link>
        <Link>Twitter</Link>
        <Link>Instagram</Link>
      </div>
    </div>
  );
}
