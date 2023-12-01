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
const review = require("../../db/models/review");
const entitledR = require("../../utils/ownershipR");
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

router.get("/", async (req, res) => {
  const reviews = await Review.findAll();
  const reviewJSON = reviews.map((ele) => ele.toJSON());

  for (let review of reviewJSON) {
    const reviewUser = await User.findOne({
      where: {
        id: review.userId,
      },
    });

    const post = await Post.findOne({
      where: {
        id: review.postId,
      },
    });

    review.name = `${reviewUser.lastName}, ${reviewUser.firstName}`;
    review.postTitle = post.title;

    delete review.userId;
    delete review.postId;
  }
  res.status(200).json(reviewJSON);
});

router.post(
  "/:postId",
  [requireAuth, validateReviewCreation],
  async (req, res) => {
    const { user } = req;
    const { review, rating } = req.body;
    const postId = req.params.postId;

    const newReview = await Review.bulkCreate([
      {
        review,
        rating,
        postId,
        userId: user.id,
      },
    ]);
    const target = await Review.findOne({
      where: {
        review,
        rating,
        postId,
        userId: user.id,
      },
    });
    res.status(201).json(target);
  }
);

router.get("/current", async (req, res) => {
  const { user } = req;
  const reviews = await Review.findAll({
    where: {
      userId: user.id,
    },
  });
  const reviewJSON = reviews.map((ele) => ele.toJSON());

  for (review of reviewJSON) {
    const reviewUser = await User.findOne({
      where: {
        id: review.userId,
      },
    });

    const post = await Post.findOne({
      where: {
        id: review.postId,
      },
    });

    review.name = `${reviewUser.lastName}, ${reviewUser.firstName}`;
    review.postTitle = post.title;

    delete review.userId;
    delete review.postId;
  }
  res.status(200).json(reviewJSON);
});

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  const reviews = await Review.findAll({
    where: {
      postId,
    },
  });

  const reviewJSON = reviews.map((ele) => ele.toJSON());

  for (review of reviewJSON) {
    const reviewUser = await User.findOne({
      where: {
        id: review.userId,
      },
    });

    const post = await Post.findOne({
      where: {
        id: review.postId,
      },
    });

    review.name = `${reviewUser.lastName}, ${reviewUser.firstName}`;
    review.postTitle = post.title;

    delete review.userId;
    delete review.postId;
  }

  res.status(200).json(reviewJSON);
});

router.put(
  "/:reviewId",
  [validateReviewCreation, requireAuth, entitledR],
  async (req, res) => {
    const { review, rating } = req.body;
    const reviewId = req.params.reviewId;
    const target = await Review.findOne({
      where: {
        id: reviewId,
      },
    });
    target.set({
      review,
      rating,
    });
    await target.save();
    const targetReview = await Review.findOne({
      where: {
        id: reviewId,
      },
    });
    res.json(targetReview);
  }
);

router.delete("/:reviewId", [requireAuth, entitledR], async (req, res) => {
  const reviewId = req.params.reviewId;
  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  await target.destroy();

  res.json({ message: `Successfully deleted Post #${reviewId}` });
});
module.exports = router;
