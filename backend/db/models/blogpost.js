"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      Post.hasMany(models.Review, {
        foreignKey: "postId",
      });
      Post.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Post.belongsToMany(models.Category, {
        through: "BlogCategory",
        foreignKey: "postId",
        other: "categoryId",
      });
    }
  }

  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 200],
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
      userId: {
        type: DataTypes.INTEGER,
      },
      categoriesId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Post",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Post;
};
