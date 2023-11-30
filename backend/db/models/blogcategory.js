"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlogCategory extends Model {
    static associate(models) {
      // define association here
      // BlogCategory.hasMany(models.BlogPost, {
      //   foreignKey: "blog_id"
      // })
      // BlogCategory.hasMany(models.Category, {
      //   foreignKey: "category_id"
      // })
    }
  }
  BlogCategory.init(
    {
      blog_id: {
        type: DataTypes.INTEGER,
      },
      category_id: {
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
