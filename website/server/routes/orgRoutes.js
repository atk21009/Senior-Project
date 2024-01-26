// Component Imports
const Employee = require("../models/Employee");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Visitor = require("../models/Visitor");
const { date } = require("../utils/OrganizationUtils");

module.exports = (app) => {
  ////////////////////////////////////////////////////////////////////////////
  // create org
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/create-org", async (req, res) => {
    // parameters
    let _id = req.body.res.data.id;
    let { company, teir, location, owner, admin, hr } = req.body.data;

    // Validate required data
    if (!company || !location || !_id) {
      res.status(203);
      res.send("All fields are required");
      return;
    }

    // Check organization doesn't exist
    const existOrg = await Organization.findOne({ company });
    if (existOrg) {
      res.status(400);
      res.send("Organization already exists");
      return;
    }

    // Check if teir
    if (!teir) {
      teir = "Free";
    }

    // Find user
    const user = await User.findById({ _id });

    // Initalize pay period
    const payPeriod = date();

    // Create new organization
    const Org = new Organization({
      company,
      teir,
      location,
      owner: user.firstname + " " + user.lastname,
      payPeriod,
    });

    // If organization created
    if (Org) {
      // Save organization
      Org.save();

      // Update user organization
      await User.findByIdAndUpdate(_id, {
        organization: Org._id,
      });

      // Send organization token
      res.status(200).json(Org);
      return;
    }

    // Error creating organization
    res.status(400);
    res.send("Error Creating Organization");
  });

  ////////////////////////////////////////////////////////////////////////////
  // update org
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/update-org", async (req, res) => {
    const { company, location, admin, hr, _id } = req.body;

    // Validate required data
    if (!company || !location || !admin || !hr || !_id) {
      res.status(400);
      res.send("All inputs required");
      return;
    }

    // Check if organization exists
    const exists = await Organization.findOne({ company });
    if (exists) {
      res.status(400);
      res.send("Company Already Exists");
      return;
    }

    // Update Organization
    try {
      await Organization.findByIdAndUpdate(_id, {
        company,
        location,
        admin,
        hr,
      });
      res.send("Successfully Updated");
    } catch (err) {
      res.status(400);
      res.send("Update error occured");
    }
  });

  ////////////////////////////////////////////////////////////////////////////
  // fetch org
  ////////////////////////////////////////////////////////////////////////////
  app.get("/api/view-org", async (req, res) => {
    // parameters
    const { _id } = req.query;

    // Validate Organization exists
    const org = await Organization.findById(_id);
    if (!org) {
      res.status(204);
      res.send("No Organization Found");
      return;
    }

    // Send Organization data
    res.send(org);
  });

  ////////////////////////////////////////////////////////////////////////////
  // delete org
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/delete-org", async (req, res) => {
    const { auth_id, Org_id } = req.body;

    // Validate required data
    if (!auth_id || !Org_id) {
      res.status(400);
      res.send("An error occured while trying to delete organization");
      return;
    }

    // Find users, organization, and employees
    const user = await User.findById(auth_id);
    const org = await Organization.findById(Org_id);
    const emp = await Employee.find({ company: Org_id });

    // Validate user and organization exists
    if (user && org) {
      // Delete organization and employees
      try {
        await User.findByIdAndUpdate(auth_id, { organization: "" });
        await Organization.findByIdAndDelete(Org_id);
        if (emp) {
          emp.forEach(async (e) => {
            await Employee.findByIdAndDelete(e.id);
          });
        }
        res.status(200);
        res.send("Organization Successfully deleted");
      } catch (e) {
        res.status(400);
        res.send("Error occured while deleting organization");
      }
    }
  });

  ////////////////////////////////////////////////////////////////////////////
  // Organization data
  ////////////////////////////////////////////////////////////////////////////
  app.get("/api/org-data", async (req, res) => {
    // parameters
    const { OrgToken } = req.query;

    // Find employees
    const emp = await Employee.find(
      { company: OrgToken },
      {
        hoursPayPeriod: 1,
        hourlyRate: 1,
        clockStatus: 1,
      }
    );

    // Find visitors
    const visitors = await Visitor.find({ business: OrgToken });

    // Count number of visitors
    const num_visitors = visitors.length;

    // Initalize Vars
    let cost = 0,
      clockedIn = 0,
      clockedOut = 0,
      OT = 0,
      Visitors = num_visitors;

    // Validate Employee Exists
    if (!emp) {
      res.status(204);
      res.send("No employees found");
      return;
    }

    // Loop over employees
    // Update visitor data
    emp.forEach((element) => {
      const rate = parseFloat(element.hourlyRate.slice(1));
      const hw = element.hoursPayPeriod.split(" ");
      const clockStatus = element.clockStatus;

      let hrWrk = hw[0].replace("hr", "");
      let minWrk = hw[1].replace("min", "");

      hrWrk = parseInt(hrWrk) * rate;
      minWrk = (parseInt(minWrk) / 60) * rate;

      cost += hrWrk + minWrk;

      if (clockStatus !== "false") {
        clockedIn += 1;
      } else {
        clockedOut += 1;
      }

      if (hw > 40) {
        OT += 1;
      }
    });

    // Send data
    res.status(200);
    res.send({ cost, clockedIn, clockedOut, Visitors, OT });
  });
};
