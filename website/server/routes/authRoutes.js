const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { authenticateJWT } = require("../utils/jwtUtils");

module.exports = (app) => {
  ////////////////////////////////////////////////////////////////////////////
  // Login
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    // Invalid Inputs
    if (!email || !password) {
      res.status(400);
      res.send("All fields are required");
      return;
    }

    // Check to see if user Exists
    const user = await User.findOne({ email });

    // Check user exists and password is same
    if (user && (await bcrypt.compare(password, user.password))) {
      // JWT
      const userJWT = { id: user.id, email: user.email };
      const accessToken = jwt.sign(
        {
          userJWT,
        },
        process.env.accessTokenSecret,
        { expiresIn: "24hr" }
      );

      // Send JWT
      res.status(200).json({ accessToken });
      return;
    }

    // User does not exist or password is incorrect
    res.status(401);
    res.send("Invalid email or password");
  });

  ////////////////////////////////////////////////////////////////////////////
  // Register
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/register", async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    // Check empty
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      res.status(400);
      res.send("All fields are required");
      return;
    }

    // Check passwords match
    if (password != confirmPassword) {
      res.status(400);
      res.send("Passwords must match");
      return;
    }

    // Check user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      res.send("User already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // If user created
    if (user) {
      // Save
      user.save();
      // JWT
      const userJWT = { id: user.id, email: user.email };
      const accessToken = jwt.sign(
        {
          userJWT,
        },
        process.env.accessTokenSecret,
        { expiresIn: "24hr" }
      );
      res.status(200).json({ accessToken });
      return;
    }

    // Error creating user
    res.status(501);
    res.send("User data is not valid");
  });

  ////////////////////////////////////////////////////////////////////////////
  // Forgot Password
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/forgot", (req, res) => {});

  ////////////////////////////////////////////////////////////////////////////
  // Current User
  ////////////////////////////////////////////////////////////////////////////
  app.get("/api/currentUser", authenticateJWT, async (req, res) => {
    const { id } = req.user.userJWT;
    const user = await User.findById(id, { password: 0 });

    res.status(200);
    res.send(user);
  });

  ////////////////////////////////////////////////////////////////////////////
  // Prompt Pass
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/prompt-pass", async (req, res) => {
    const { Password, id } = req.body;

    // Validate data
    if (!Password || !id) {
      res.status(400);
      res.send("Password is required");
      return;
    }

    // Find user and ensure password
    const user = await User.findById(id, { password: 1 });
    if (user && (await bcrypt.compare(Password, user.password))) {
      res.sendStatus(202);
      return;
    }

    // If no user or incorrect password
    res.status(401);
    res.send("Password is invalid");
  });
};
