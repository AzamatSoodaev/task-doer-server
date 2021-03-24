"use strict";

const db = require("../models");
const User = db.user;
const Todo = db.todo;

exports.findAll = (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
    order: [["id", "ASC"]],
  })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  const userId = req.params.userId;

  User.findByPk(userId, {
    attributes: { exclude: ["password"] },
    include: { model: Todo, as: "todos" },
    order: [[{ model: Todo, as: "todos" }, "id", "ASC"]],
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: "Not Found" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
