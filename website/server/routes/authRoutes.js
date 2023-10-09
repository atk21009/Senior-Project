const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  // login
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({
        user: {
          firstname: user.firstname,
          email: user.email,
          id: user.id,
        },
      });
    }
  });
  // register
  app.post("/api/register", async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    if (user) {
      user.save();
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      throw new Error("User data is not valid");
    }
  });

  // logout
  app.delete("/api/logout", (req, res) => {});

  // forgot password
  app.post("/api/forgot", (req, res) => {});

  // current user
  app.get("/api/current_user", (req, res) => {});
};
