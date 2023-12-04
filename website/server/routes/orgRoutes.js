const Employee = require("../models/Employee");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Visitor = require("../models/Visitor");

function date() {
  var today = new Date();
  today.setDate(today.getDate() + ((0 - 1 - today.getDay() + 7) % 7) + 1);
  return today;
}

module.exports = (app) => {
  // create org
  app.post("/api/create-org", async (req, res) => {
    let _id = req.body.res.data.id;
    let { company, teir, location, owner, admin, hr } = req.body.data;
    if (!company || !location || !_id) {
      res.status(203);
      res.send("All fields are required");
    } else {
      const existOrg = await Organization.findOne({ company });
      if (existOrg) {
        res.status(400);
        res.send("Organization already exists");
      } else {
        if (!teir) {
          teir = "Free";
        }
        const user = await User.findById({ _id });
        const payPeriod = date();
        const Org = new Organization({
          company,
          teir,
          location,
          owner: user.firstname + " " + user.lastname,
          payPeriod,
        });

        if (Org) {
          Org.save();

          await User.findByIdAndUpdate(_id, {
            organization: Org._id,
          });

          res.status(200).json(Org);
        }
      }
    }
  });

  // update org
  app.post("/api/update-org", async (req, res) => {
    const { company, location, admin, hr, _id } = req.body;

    if (!company || !location || !admin || !hr || !_id) {
      res.status(400);
      res.send("All inputs required");
    } else {
      const exists = await Organization.findOne({ company });
      if (exists) {
        res.status(400);
        res.send("Company Already Exists");
      } else {
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
      }
    }
  });

  // fetch org
  app.get("/api/view-org", async (req, res) => {
    const { _id } = req.query;
    const org = await Organization.findById(_id);
    if (org) {
      res.send(org);
    } else {
      res.status(204);
      res.send("No Organization Found");
    }
  });

  // delete org
  app.post("/api/delete-org", async (req, res) => {
    const { auth_id, Org_id } = req.body;

    if (!auth_id || !Org_id) {
      res.status(400);
      res.send("An error occured while trying to delete organization");
    } else {
      const user = await User.findById(auth_id);
      const org = await Organization.findById(Org_id);
      const emp = await Employee.find({ company: Org_id });

      if (user && org) {
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
    }
  });

  app.get("/api/org-data", async (req, res) => {
    const { OrgToken } = req.query;

    const emp = await Employee.find(
      { company: OrgToken },
      {
        hoursPayPeriod: 1,
        hourlyRate: 1,
        clockStatus: 1,
      }
    );
    const visitors = await Visitor.find({ business: OrgToken });
    const num_visitors = visitors.length;
    let cost = 0,
      clockedIn = 0,
      clockedOut = 0,
      OT = 0,
      Visitors = num_visitors;
    if (emp) {
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
      res.status(200);
      res.send({ cost, clockedIn, clockedOut, Visitors, OT });
    } else {
      res.status(204);
      res.send("No employees found");
    }
  });
};
