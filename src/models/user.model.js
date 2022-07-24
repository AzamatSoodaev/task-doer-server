"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
		getFullname() {
			return [this.firstName, this.lastName].join(' ');
		}
	}

  User.init(
    {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
			firstName: {
        type: DataTypes.STRING,
      },
			lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
			tableName: "users",
			underscored: true
    }
  );

  return User;
};
