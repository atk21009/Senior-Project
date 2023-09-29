import React from "react";

export default function Landing() {
  return (
    <div className="page">
      <div className="landing-img"></div>
      <div className="landing-ctnr">
        <div className="landing-desc">
          <div className="landing-desc-img">
            <div></div>
          </div>
          <div>
            <div className="landing-desc-card">
              <div className="landing-desc-header">Install In Seconds</div>
              <div className="landing-desc-content">
                Dynamic Business Sync runs virtually on any Windows device.
                Following the quick installation guide download the application
                and have the program running in no time.
              </div>
            </div>
            <div className="landing-desc-card">
              <div className="landing-desc-header">Simple To Use</div>
              <div className="landing-desc-content">
                Navigate all the different features of the Dynamic Business Sync
                application with ease. Each portal of the DBS application is
                easily accessible for all the specific needs. Simply install the
                application to the necessary devices or login online to easily
                use the application to its fullest with ease.
              </div>
            </div>
            <div className="landing-desc-card">
              <div className="landing-desc-header">Instant Feedback</div>
              <div className="landing-desc-content">
                The DBS application allows for instant feedback to employees or
                employers. View work hours, hours worked, visitors, and more.
                Instant feedback will be shown with a quick popup that will
                display all the necessary information.
              </div>
            </div>
            <div className="landing-desc-card">
              <div className="landing-desc-header">
                Keep Track Of Everything
              </div>
              <div className="landing-desc-content">
                Keep track of your business. There is a lot of information that
                is used in business and the DBS system is here to help. Keep
                track of employees, visitors and more using the Employer portal.
                View countless details of your business in an organized fashion
                that allows easy navigation and response.
              </div>
            </div>
          </div>
        </div>
        <div className="landing-prod-desc">
          <div className="landing-card">
            <span>Employer Portal</span>

            <div className="landing-card-desc">
              Keep track of everything that is going on at your business. View
              Employees that are clocked in and out, work hours, phone number,
              email, location of employees workstation and more. Additionally,
              keep track of all visitors at your business. View visitors name,
              location they are supposed to go visit, and phone number in the
              event of an emergency. Allowing you to keep track of what is going
              on at your business.
            </div>
          </div>
          <div className="landing-card">
            <span>HR Portal</span>

            <div className="landing-card-desc">
              Keep track of all employees' information, hours worked, and more.
              This portal allows you to process employee pay stubs with ease.
              With the HR portal print out paystubs, keep track of hours
              employees worked, view who is close to overtime hours, and more.
              The portal allows you to send out paystubs with ease. Just a click
              of one button allows you to send out all of the paystubs to the
              correct employees. Make your job easier by using the HR portal.
            </div>
          </div>
          <div className="landing-card">
            <span>Employee Portal</span>

            <div className="landing-card-desc">
              The employee portal allows for ease of access for employees.
              Employees can enter their code and password and clock in and out
              with ease. Employees can also submit a time off request, use sick
              hours, and more. Additionally, if any employees are receiving
              visitors to their station an email notification will be sent and
              they can view who is visiting, the purpose of the visit, and when
              the visitor will visit.
            </div>
          </div>
          <div className="landing-card">
            <span>Visitor Portal</span>

            <div className="landing-card-desc">
              Managing frequent visitors can be a nightmare to manage at times.
              Using the visitor portal, keep track of visitors, call visitors in
              the event of an emergency, and manage who is visiting your
              business. Visitors must fill out an online form with their name,
              phone number, and location they wish to visit.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
