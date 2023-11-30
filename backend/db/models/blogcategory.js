"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlogCategory extends Model {
    static associate(models) {
      // define association here
    }
  }
  BlogCategory.init(
    {
      postId: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "BlogCategory",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return BlogCategory;
};
