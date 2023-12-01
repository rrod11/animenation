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

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.status(200).json(categories);
});

module.exports = router;
