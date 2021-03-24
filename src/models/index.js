"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/db.config")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todo = require("../models/todo.model")(sequelize, DataTypes);
db.user = require("../models/user.model")(sequelize, DataTypes);

db.user.hasMany(db.todo, { as: "todos" });
db.todo.belongsTo(db.user, { as: "user", foreignKey: "userId" });

module.exports = db;
