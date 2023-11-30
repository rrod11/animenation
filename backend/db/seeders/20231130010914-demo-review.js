"use strict";

const { Review } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        review:
          "Literally the best anime to ever exist stop gawking and go give it a watch",
        user_id: "1",
        post_id: "1",
        rating: "5",
      },
      {
        review:
          "An amazing watch you will not regret taking the time out your day",
        user_id: "3",
        post_id: "2",
        rating: "5",
      },
      {
        review: "I was hooked from the jump cant wait for the next season",
        user_id: "2",
        post_id: "3",
        rating: "5",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        user_id: { [Op.in]: ["1", "2", "3", "4"] },
      },
      {}
    );
  },
};
