"use strict";

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
// const path = require("path");

const db = require("./src/models");

const app = express();
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || "development";
// const corsOptions = {
//   origin: "http://localhost:3000",
// };

// app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger(getLoggerEnv(env)));

db.sequelize.sync();

require("./src/routes/auth.route")(app);
require("./src/routes/user.route")(app);
require("./src/routes/todo.route")(app);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Not Found" });
  // res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

function getLoggerEnv(_env) {
  return _env === "development" ? "dev" : "combined";
}
