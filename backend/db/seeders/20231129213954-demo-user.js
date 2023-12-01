"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "asta@user.io",
          username: "asta",
          hashedPassword: bcrypt.hashSync("password"),
          adminKey: "roderick0318",
          firstName: "Asta",
          lastName: "Staria",
        },
        {
          email: "yuno@user.io",
          username: "yuno",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Yuno",
          adminKey: "roderick0318",
          lastName: "Grinberryall",
        },
        {
          email: "yami@user.io",
          username: "yami",
          hashedPassword: bcrypt.hashSync("password"),
          adminKey: "roderick0318",
          firstName: "Yami",
          lastName: "Sukehiro",
        },
        {
          email: "demo@user.io",
          username: "demo",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Demo",
          lastName: "User",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["asta", "yuno", "yami"] },
      },
      {}
    );
  },
};
