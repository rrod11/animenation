"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BlogPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(45),
      },
      description: {
        type: Sequelize.STRING(2500),
      },
      user_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
      },
      categories_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Categories",
        //   key: "id",
        // },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "BlogPosts";
    await queryInterface.dropTable(options);
  },
};
