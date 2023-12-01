"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Post, {
        through: "BlogCategory",
        foreignKey: "categoryId",
        otherKey: "postId",
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // blog_id: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      sequelize,
      modelName: "Category",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Category;
};
