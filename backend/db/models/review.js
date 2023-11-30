"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Review.belongsTo(models.Post, {
        foreignKey: "postId",
      });
    }
  }
  Review.init(
    {
      review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 2000],
        },
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Review;
};
