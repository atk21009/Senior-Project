import React from "react";

export default function Features() {
  return (
    <div className="page">
      <div className="page-ctnr">
        <div className="page-title">Features</div>
      </div>
      <div className="features-card-ctnr">
        <div className="features-card">
          <div className="features-card-content">
            <div className="features-card-header">Employer Portal</div>
            <div className="features-card-desc-ctnr">
              <div className="features-card-desc">
                The Employer Portal allows for employers to get an overview of
                the business. View employee information and visitor information
                with ease. Manage data within your company with ease.
              </div>
              <div className="features-list">
                <span className="features-card-subheader">Employee</span>
                <ul>
                  <li>View hours worked this week</li>
                  <li>View whether employee is clocked in or out</li>
                  <li>View phone number or email of employee</li>
                  <li>View the workstation location of employee</li>
                </ul>
                <span className="features-card-subheader">Visitor</span>
                <ul>
                  <li>View the name of visitor</li>
                  <li>View the location where the visitor is visiting</li>
                  <li>View the phone number of the visitor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="features-card">
          <div className="features-card-content">
            <div className="features-card-header">HR Portal</div>
            <div className="features-card-desc-ctnr">
              <div className="features-card-desc">
                The HR Portal allows for ease of access for accountants. View
                all employees' information, hours worked, pay rate, and more.
                Create and send pay stubs with ease. View all of the paystubs
                created and confirm all of the information before it is sent
                out.
              </div>
              <div className="features-list">
                <ul>
                  <li>View employees' hour worked</li>
                  <li>View employees' pay rate</li>
                  <li>Create pay stubs for all employees</li>
                  <li>Send out paystubs to all employees</li>
                  <li>Create new employees accounts</li>
                  <li>Search for employees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="features-card">
          <div className="features-card-content">
            <div className="features-card-header">Employee Portal</div>
            <div className="features-card-desc-ctnr">
              <div className="features-card-desc">
                The Employee Portal allows for ease of access for employees.
                There are two modes for this portal, Time Clock which is
                available in the downloaded application, and Employee
                Information Portal which is available online through logging in.
                <br />
                <br />
                <span className="features-card-subheader">Time Clock</span>
                <br />
                The Time Clock can be set up and any windows terminal and allow
                employees to clock in and out of their shift. By entering their
                code and passcode employees can clock in and out with ease.
                <br />
                <br />
                <span className="features-card-subheader">Employee Portal</span>
                <br />
                This portal is accessible online through logging in to the
                website. Through this portal employees can view their
                information such as workstation, hours worked for this pay
                period, next pay period, estimated income for this pay period,
                any visitors that will be visiting their work station, and more.
              </div>
              <div className="features-list">
                <span className="features-card-subheader">Time Clock</span>
                <ul>
                  <li>Clock in and out</li>
                  <li>View Hours worked for this week</li>
                </ul>
                <span className="features-card-subheader">Employee Portal</span>
                <ul>
                  <li>View pay rate</li>
                  <li>View work station location</li>
                  <li>Estimate pay for this pay period</li>
                  <li>Next pay period</li>
                  <li>View any visitors that are visiting them</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="features-card">
          <div className="features-card-content">
            <div className="features-card-header">Visitor Portal</div>
            <div className="features-card-desc-ctnr">
              <div className="features-card-desc">
                The Visitor portal can be set up at any windows terminal. With
                this visitors can enter their name, phone number, email, and
                location they wish to visit. This information will then be sent
                out to the employee at that location as well as the employer.
                The employee can see the name of the visitor that will be
                visiting them. The employer will be able to see the visitor’s
                name, phone number, and location they are visiting. Their phone
                number will be visible in the event of an emergency.
              </div>
              <div className="features-list">
                <ul>
                  <li>Form that require any visitors information</li>
                  <ul>
                    <li>Name</li>
                    <li>Phone number</li>
                    <li>Location they wish to visit</li>
                  </ul>
                  <li>
                    The information will be sent out to all employers.
                    Additionally, all employee that are expecting the visitor
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
