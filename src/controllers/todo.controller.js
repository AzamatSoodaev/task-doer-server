"use strict";

const db = require("../models");
const Todo = db.todo;

exports.findAll = (req, res) => {
  Todo.findAll({ order: [["createdAt", "ASC"]] })
    .then((todos) => {
      res.send(todos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  Todo.findByPk(id)
    .then((todo) => {
      if (todo) {
        res.send(todo);
      } else {
        res.status(404).send({ message: "Not Found" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id,
      });
    });
};

exports.create = (req, res) => {
  Todo.create({
    todo: req.body.todo,
    completed: req.body.completed,
    isImportant: req.body.isImportant,
    userId: req.params.userId,
  })
    .then((todo) => {
      res.status(201).send(todo);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  Todo.update(req.body, {
    where: { id: id },
    returning: true,
  })
    .then(([rowsUpdate, [updatedTodo]]) => {
      res.send(updatedTodo);
    })
    .catch((err) => {
      res.status(422).send({
        message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`,
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Todo.destroy({
    where: { id: id },
  }).then((num) => {
    res.status(204).send();
  });
};
