"use strict";

const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users/:username",
    [authJwt.verifyToken, authJwt.isMe],
    userController.findOne
  );
};
