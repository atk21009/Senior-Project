const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

require("./routes/authRoutes")(app);
require("./routes/empRoutes")(app);
require("./routes/orgRoutes")(app);
require("./routes/visitorRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js or main.css file
  app.use(express.static("client/build"));

  // express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
console.log("Listening on port: " + PORT);
app.listen(PORT);
