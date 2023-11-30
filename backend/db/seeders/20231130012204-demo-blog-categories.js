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
      // {
      //   blog_id: "1",
      //   category_id: "2",
      // },
      // {
      //   blog_id: "2",
      //   category_id: "1",
      // },
      // {
      //   blog_id: "3",
      //   category_id: "2",
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "BlogCategories";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        blog_id: { [Op.in]: ["1", "2", "3", "4"] },
      },
      {}
    );
  },
};
