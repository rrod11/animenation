const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth.js");
// const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Category } = require("../../db/models");

const router = express.Router();

const validateCategoryCreation = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid title with at least 3 characters"),

  handleValidationErrors,
];

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.status(200).json(categories);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newCategory = await Category.bulkCreate([
    {
      name,
    },
  ]);
  const target = await Category.findOne({
    where: {
      name,
    },
  });
  res.status(201).json(target);
});

module.exports = router;
