"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Review.belongsTo(models.BlogPost, {
        foreignKey: "post_id",
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
      user_id: {
        type: DataTypes.INTEGER,
      },
      post_id: {
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
          exclude: ["user_id", "post_id"],
        },
      },
    }
  );
  return Review;
};
