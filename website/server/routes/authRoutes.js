const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (app) => {
  // login
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      res.send("All fields are required");
    } else {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              firstname: user.firstname,
              email: user.email,
              organization: user.organization,
              id: user.id,
            },
          },
          keys.accessTokenSecret,
          { expiresIn: "24hr" }
        );
        res.status(200).json({ accessToken });
      } else {
        res.status(401);
        res.send("Email or password is not valid");
      }
    }
  });
  // register
  app.post("/api/register", async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      res.status(400);
      res.send("All fields are mandatory");
    } else {
      if (password != confirmPassword) {
        res.status(400);
        res.send("Passwords must match");
      } else {
        const userExist = await User.findOne({ email });
        if (userExist) {
          res.status(400);
          res.send("User already exists");
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
          });

          if (user) {
            user.save();
            const accessToken = jwt.sign(
              {
                user: {
                  firstname: user.firstname,
                  email: user.email,
                  id: user.id,
                },
              },
              keys.accessTokenSecret,
              { expiresIn: "1hr" }
            );
            res.status(200).json({ accessToken });
          } else {
            res.send("User data is not valid");
          }
        }
      }
    }
  });

  // forgot password
  app.post("/api/forgot", (req, res) => {});

  // current user
  app.get("/api/currentUser", async (req, res) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, keys.accessTokenSecret, (err, decoded) => {
        if (err) {
          res.status(401);
          res.send("Invalid Token");
        } else {
          if (decoded) {
            if (!token) {
              res.status(401);
            } else {
              res.json(decoded.user);
            }
          } else {
            res.status(401);
            res.send("Invalid User");
          }
        }
      });
    }
  });
};
