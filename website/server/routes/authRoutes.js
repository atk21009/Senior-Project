const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (app) => {
  // Sign up
  app.get("/api/signup", (req, res) => {
    console.log(req.query);
    const { firstname, lastname, email, password, confirmPassword } = req.query;

    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.send("Email already exists");
      } else {
        const newUser = new User({
          firstname,
          lastname,
          email,
          password,
        });

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().catch((err) => console.log(err));
          });
        });
      }
    });
    res.redirect(307, "/");
  });

  // Login
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  });

  // Logout
  app.get("/api/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  });

  // Get current user
  app.get("/api/currentUser", (req, res) => {
    console.log(req);
    console.log(req.user);
    res.send("YES");
  });

  // Forgot password
};
