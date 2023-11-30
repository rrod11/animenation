"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
      // define association here
    }
  }

  BlogPost.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 45],
        },
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 2500],
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      categories_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "BlogPost",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return BlogPost;
};
