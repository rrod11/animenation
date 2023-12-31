"use strict";

const { Category } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Category.bulkCreate(
      [
        {
          name: "Action",
        },
        {
          name: "Adventure",
        },
        {
          name: "Comedy",
        },
        {
          name: "Drama",
        },
        {
          name: "Harem",
        },
        {
          name: "Horror",
        },
        {
          name: "Historical",
        },
        {
          name: "Parody",
        },
        {
          name: "Romance",
        },
        {
          name: "Psychological",
        },
        {
          name: "Sci-Fi",
        },
        {
          name: "School",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Categories";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Action",
            "Adventure",
            "Comedy",
            "Drama",
            "Harem",
            "Horror",
            "Historical",
            "Parody",
            "Romance",
            "Psychological",
            "Sci-Fi",
            "School",
          ],
        },
      },
      {}
    );
  },
};
