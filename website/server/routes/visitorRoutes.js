const Visitor = require("../models/Visitor");

module.exports = (app) => {
  ////////////////////////////////////////////////////////////////////////////
  // create visitor
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/create-visitor", async (req, res) => {
    // Parameters
    const { firstname, lastname, phonenumber, location, _id } = req.body;

    // Validate required data
    if (!firstname || !lastname || !_id) {
      res.status(400);
      res.send("All fields are required");
      return;
    }

    // Create new visitor
    const visitor = await new Visitor({
      firstname,
      lastname,
      phonenumber,
      location,
      business: _id,
    });

    // Validate visitor created
    if (!visitor) {
      res.status(400);
      res.send("Error creating visitor");
      return;
    }

    // If no errors save visitor
    visitor.save();
    res.send(firstname + ": Successfully created");
  });

  ////////////////////////////////////////////////////////////////////////////
  // view visitors
  ////////////////////////////////////////////////////////////////////////////
  app.get("/api/view-visitors", async (req, res) => {
    // Parameters
    const { orgToken } = req.query;

    // Validate required data
    if (!orgToken) {
      res.status(400);
      res.send("All fields are required");
      return;
    }

    // Validate visitor found
    const visitors = await Visitor.find({ business: orgToken });
    if (!visitors) {
      res.status(400);
      res.status("Error fetching visitor data");
      return;
    }

    // Send visitors
    res.status(200);
    res.send(visitors);
  });

  ////////////////////////////////////////////////////////////////////////////
  // view visitor
  ////////////////////////////////////////////////////////////////////////////
  app.get("/api/view-visitor", async (req, res) => {
    // parameters
    const { _id } = req.query;

    // Validate required data
    if (!_id) {
      res.status(400);
      res.send("Error fetching visitor");
      return;
    }

    // Ensure Visitor exists
    const visitor = await Visitor.findById(_id);
    if (!visitor) {
      res.status(400);
      res.status("Error fetching visitor data");
    }

    // Send visitor data
    res.status(200);
    res.send(visitor);
  });

  ////////////////////////////////////////////////////////////////////////////
  // delete visitors
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/delete-visitor", async (req, res) => {
    // parameters
    const { _id } = req.body;

    // Validate required data
    if (!_id) {
      res.status(400);
      res.send("All fields are required");
      return;
    }

    // Validate Visitor exists
    if (!(await Visitor.findById(_id))) {
      res.status(404);
      res.send("Visitor Not Found");
      return;
    }

    // Delete visitor
    try {
      await Visitor.findByIdAndDelete(_id);
      res.status(200);
      res.send("Visitor successfully signed out");
    } catch (e) {
      res.status(400);
      res.send("Error in signing out visitor");
    }
  });

  ////////////////////////////////////////////////////////////////////////////
  // Delete All Visitors
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/delete-all-visitors", async (req, res) => {
    // parameters
    const { orgToken } = req.body;

    // validate required data
    if (!orgToken) {
      res.status(400);
      res.send("All fields are required");
      return;
    }

    // Validate visitors exists
    if (!(await Visitor.find({ business: orgToken }))) {
      res.status(404);
      res.send("Visitor Not Found");
      return;
    }

    // Delete visitors
    try {
      await Visitor.deleteMany({ business: orgToken });
      res.status(200);
      res.send("Visitor successfully signed out");
    } catch (e) {
      res.status(400);
      res.send("Error in signing out visitor");
    }
  });
};
