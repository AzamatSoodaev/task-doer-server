"use strict";

const { authJwt } = require("../middleware");
const router = require("express").Router();
const userController = require("../controllers/user.controller");
const todoController = require("../controllers/todo.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/", userController.findAll);
  router.get("/:userId/todos", userController.findOne);
  router.post("/:userId/todos", todoController.create);
  router.get("/:userId/todos/:id", todoController.findOne);
  router.put("/:userId/todos/:id", todoController.update);
  router.delete("/:userId/todos/:id", todoController.delete);

  app.use("/api/users", [authJwt.verifyToken], router);
};
