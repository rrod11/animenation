"use strict";

const { BlogCategory } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await BlogCategory.bulkCreate([
      {
        postId: "1",
        categoriesId: "2",
      },
      {
        postId: "2",
        categoriesId: "1",
      },
      {
        postId: "3",
        categoriesId: "2",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "BlogCategories";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        postId: { [Op.in]: ["1", "2", "3", "4"] },
        // blog_id: { [Op.in]: ["1", "2", "3", "4"] },
      },
      {}
    );
  },
};
