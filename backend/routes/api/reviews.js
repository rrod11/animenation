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
const { User, Post, Review } = require("../../db/models");
const router = express.Router();

const validateReviewCreation = [
  check("review")
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 2000 })
    .withMessage(
      "Please provide a valid review between 3  and 2000 characters"
    ),
  check("rating")
    .exists({ checkFalsy: true })
    .isNumeric({ min: 1, max: 5 })
    .withMessage("Please provide a rating between 1 and 5."),

  handleValidationErrors,
];

module.exports = router;
