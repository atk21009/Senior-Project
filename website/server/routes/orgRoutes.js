const Organization = require("../models/Organization");
const User = require("../models/User");

module.exports = (app) => {
  // create org
  app.post("/api/create-org", async (req, res) => {
    let _id = req.body.res.data.id;
    let { company, teir, location, owner, admin, hr } = req.body.data;
    if (!company || !location || !_id) {
      res.status(400);
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

        const Org = new Organization({
          company,
          teir,
          location,
          owner: user.firstname + " " + user.lastname,
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
    const { company, teir, location, owner, admin, hr, _id } = req.body;
    try {
      await Organization.findByIdAndUpdate(_id, {
        company,
        teir,
        location,
        owner,
        admin,
        hr,
      });
    } catch (err) {
      res.status(400);
      res.send("Update error occured");
    }
    res.send("Successfully Updated");

    console.log("Finished");
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
    const { _id } = req.body;
    await Organization.findByIdAndDelete(_id);
    res.send("Organization Deleted");
  });
};
