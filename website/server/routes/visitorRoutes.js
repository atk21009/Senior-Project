const Visitor = require("../models/Visitor");

module.exports = (app) => {
  // create visitor
  app.post("/api/create-visitor", async (req, res) => {
    const { firstname, lastname, phonenumber, location, _id } = req.body;

    if (!firstname || !lastname || !_id) {
      res.status(400);
      res.send("All fields are required");
    } else {
      const visitor = await new Visitor({
        firstname,
        lastname,
        phonenumber,
        location,
        business: _id,
      });

      if (visitor) {
        visitor.save();
        res.send(firstname + ": Successfully created");
      }
    }
  });

  // view visitors
  app.get("/api/view-visitors", async (req, res) => {
    const { orgToken } = req.query;
    if (!orgToken) {
      res.status(400);
      res.send("All fields are required");
    } else {
      const visitors = await Visitor.find({ business: orgToken });
      if (visitors) {
        res.status(200);
        res.send(visitors);
      } else {
        res.status(400);
        res.status("Error fetching visitor data");
      }
    }
  });

  // view visitor
  app.get("/api/view-visitor", async (req, res) => {
    const { _id } = req.query;
    if (!_id) {
      res.status(400);
      res.send("Error fetching visitor");
    } else {
      const visitor = await Visitor.findById(_id);
      if (visitor) {
        res.status(200);
        res.send(visitor);
      } else {
        res.status(400);
        res.status("Error fetching visitor data");
      }
    }
  });

  // delete visitors
  app.post("/api/delete-visitor", async (req, res) => {
    const { _id } = req.body;
    console.log(req);
    if (!_id) {
      res.status(400);
      res.send("All fields are required");
    } else {
      if (await Visitor.findById(_id)) {
        try {
          await Visitor.findByIdAndDelete(_id);
          res.status(200);
          res.send("Visitor successfully signed out");
        } catch (e) {
          res.status(400);
          res.send("Error in signing out visitor");
        }
      } else {
        res.status(404);
        res.send("Visitor Not Found");
      }
    }
  });

  app.post("/api/delete-all-visitors", async (req, res) => {
    const { orgToken } = req.body;
    if (!orgToken) {
      res.status(400);
      res.send("All fields are required");
    } else {
      if (await Visitor.find({ business: orgToken })) {
        try {
          await Visitor.deleteMany({ business: orgToken });
          res.status(200);
          res.send("Visitor successfully signed out");
        } catch (e) {
          console.log(e);
          res.status(400);
          res.send("Error in signing out visitor");
        }
      } else {
        res.status(404);
        res.send("Visitor Not Found");
      }
    }
  });
};
