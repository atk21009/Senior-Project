import React from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div className="page">
      <div className="pricing-content">
        <div className="pricing-ctnr">
          <div className="pricing basic-tier">
            <div className="pricing-header">
              Basic
              <div>Track up to 500 employees on 1 computer</div>
            </div>
            <div className="pricing-price">
              <span>$</span>99
            </div>
            <div className="pricing-features">
              <ul className="pricing-features-list">
                <li>One year of technical support</li>
                <li>One year of software updates</li>
              </ul>
            </div>
            <Link>Buy Now</Link>
          </div>
          <div className="pricing standard-tier">
            <div className="pricing-header">
              Standard
              <div>Track up to 500 employees on 20 computers</div>
            </div>
            <div className="pricing-price">
              <span>$</span>199
            </div>
            <div className="pricing-features">
              <ul className="pricing-features-list">
                <li>20 Time Clock Computers</li>
                <li>One year of technical support</li>
                <li>One year of software updates</li>
                <li>SMS notifications for visitors</li>
              </ul>
            </div>
            <Link>Buy Now</Link>
          </div>
          <div className="pricing premium-tier">
            <div className="pricing-header">
              Premium
              <div>Track up to 1000 employees on 100 computers</div>
            </div>
            <div className="pricing-price">
              <span>$</span>399
            </div>
            <div className="pricing-features">
              <ul className="pricing-features-list">
                <li>1-99 Time Clock Computers</li>
                <li>One year of technical support</li>
                <li>One year of software updates</li>
                <li>SMS notifications for visitors</li>
              </ul>
            </div>
            <Link>Buy Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
