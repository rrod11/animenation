"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BlogCategories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // blog_id: {
      //   type: Sequelize.INTEGER,
      //   // references: {
      //   //   model: "BlogPosts",
      //   //   key: "id",
      //   // },
      // },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      // category_id: {
      //   type: Sequelize.INTEGER,
      //   // references: {
      //   //   model: "Categories",
      //   //   key: "id",
      //   // },
      // },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "BlogCategories";
    await queryInterface.dropTable(options);
  },
};
