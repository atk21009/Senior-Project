const Visitor = require("../models/Visitor");

module.exports = (app) => {
  // create visitor
  app.post("/api/create-visitor", async (req, res) => {
    const { firstname, lastname, phonenumber, location, _id } = req.body;

    if (!firstname || !lastname || !phonenumber || !location || !_id) {
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
    const { _id } = req.body;
    if (!_id) {
      res.status(400);
      res.send("All fields are required");
    } else {
      const visitors = await Visitor.find({ business: _id });
      res.send(visitors);
    }
  });

  // delete visitors
  app.post("/api/delete-visitor", async (req, res) => {
    const { firstname, lastname, _id } = req.body;
    if (!firstname || !lastname || !_id) {
      res.status(400);
      res.send("All fields are required");
    } else {
      const visitors = await Visitor.findOneAndDelete({
        business: _id,
        firstname,
        lastname,
      });
      res.send(visitors);
    }
  });
};
