import React from "react";

import landingImg from "../imgs/landing-picture.jpg";

export default function Landing() {
  return (
    <div className="page">
      <div className="landing-img">
        <img src={landingImg} alt="Landing img" />
      </div>
      <div className="landing-ctnr">
        <div className="landing-prod-desc">
          <div className="landing-header">Services</div>
          <div className="landing-card">
            <span className="landing-card-header">DBS Web Service</span>
            <div className="landing-card-desc">
              Our web service is designed to help you. In our web service we
              provide a variety of different features for employers, employees
              and HR.
              <span>
                <strong>Employers</strong> - We provide employers with ease of
                access to employee, and visitor information. Additionally we
                provide an easy setup for your account. We have implemented tons
                of features to help you get set up and get ready to keep track
                of your data. We have implemented a feature where you can upload
                all of your employee’s data in a single file and we will
                automatically get it set up for you to save you time.
              </span>
              <span>
                <strong>HR</strong> - We have aimed at helping HR personnel
                streamline their work. We have multiple features to help set up
                time sheets, and send them out to the correct employees. Making
                accounting quick and easy.
              </span>
              <span>
                <strong>Employees</strong> - Employees can view all of their
                information by simply logging in using their email and their
                passcode. We help to store all of the employee information so
                you don’t have to. Employees can check their previous pay stubs,
                current hours for this pay period, clock in and clock out time,
                pay rate, schedule and much more.
              </span>
            </div>
          </div>
          <div className="landing-card">
            <span className="landing-card-header">DBS Application Service</span>
            <div className="landing-card-desc">
              The DBS application is a key component to handling all the
              information you need to keep track of. The DBS application
              provides 4 portals for you to choose from the
              <strong> DBS Employer</strong>, <strong>DBS HR</strong>,
              <strong> DBS Clock</strong> and <strong>DBS Visitor</strong>.
              Individual devices can also be locked to only provide certain
              services accessible to a specific device.
              <span>
                <strong>DBS Employer</strong> - The DBS Employer view allows
                employers to easily traverse all of the data in their company.
                In this view we provide and overview of all employees, and
                visitors to your business. Additionally, you can modify, change,
                or view data as you need.
              </span>
              <span>
                <strong>DBS HR</strong> - The DBS HR is designed to help HR
                personnel. The DBS HR provides the same features that are
                presented on our online service and is aimed at helping HR
                personnel streamline their work.
              </span>
              <span>
                <strong>DBS Clock</strong> - The DBS Clock is designed to keep
                track of your employees clock in and out times. With this portal
                employees simply type their code and passcode in and they can
                clock in and out for the day. Additionally, they can view their
                work hours for the week by clicking the View My Information
                button on screen.
              </span>
              <span>
                <strong>DBS Visitor</strong> - The DBS Visitor is designed to
                help you keep track of all visitors in your business. In the DBS
                Visitor is a form presented which requires the visitors to enter
                their name, phone number, and location they wish to visit. This
                information can be viewed by employers and employees that are
                located at the location specified. Once submitted the form will
                display an instant feedback to the visitor that they have
                successfully entered all their information, and send a text
                message to the employer, and employee at the location specified
                (notification can be turned off through our web service).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
