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

const PORT = process.env.PORT || 5000;
console.log("Listening on port: " + PORT);
app.listen(PORT);
