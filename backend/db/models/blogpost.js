"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
      // define association here
      BlogPost.hasMany(models.Review, {
        foreignKey: "post_id",
      });
      BlogPost.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      BlogPost.belongsToMany(models.Category, {
        through: "BlogCategory",
        as: "Categories",
        foreignKey: "blog_id",
      });
    }
  }

  BlogPost.init(
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
