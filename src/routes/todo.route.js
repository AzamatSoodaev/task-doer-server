"use strict";

const { authJwt } = require("../middleware");
const router = require("express").Router();
const todoController = require("../controllers/todo.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/", todoController.create);
  // router.get("/", todoController.findAll);
  router.get("/:id", todoController.findOne);
  router.put("/:id", todoController.update);
  router.delete("/:id", todoController.delete);

  app.use("/api/todos", [authJwt.verifyToken], router);
};
