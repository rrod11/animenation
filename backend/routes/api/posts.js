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
const doesPostTitleExist = require("../../utils/doesPostTitleExist");

const router = express.Router();

const validatePostCreation = [
  check("title")
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 200 })
    .withMessage("Please provide a valid title with at least 3 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 2500 })
    .withMessage(
      "Please provide a description between 10 and 2500 characters."
    ),
  check("categoriesId")
    .exists({ checkFalsy: true })
    .withMessage("Please select at least one category"),

  handleValidationErrors,
];

router.get("/", async (req, res) => {
  const posts = await Post.findAll();
  const postsJSON = posts.map((ele) => ele.toJSON());
  for (let post of postsJSON) {
    const sum = await Review.sum("rating", {
      where: {
        postId: post.id,
      },
    });
    const total = await Review.count({
      where: {
        postId: post.id,
      },
    });
    post.avgRating = sum / total;
  }
  res.status(200).json(postsJSON);
});

router.post(
  "/",
  [requireAuth, validatePostCreation],
  async (req, res, next) => {
    const { user } = req;
    const { title, description, categoriesId } = req.body;

    const newPost = await Post.bulkCreate([
      {
        title,
        description,
        categoriesId,
        userId: user.id,
      },
    ]);
    const target = await Post.findOne({
      where: {
        title,
      },
    });

    res.status(201).json(target.toJSON());
  }
);
router.put("/:postId", validatePostCreation, async (req, res) => {
  const { title, description, categoriesId } = req.body;
  const postId = req.params.postId;
  const target = await Post.findOne({
    where: {
      id: postId,
    },
  });
  target.set({
    title,
    description,
    categoriesId,
  });

  await target.save();

  const targetPost = await Post.findOne({
    where: {
      id: postId,
    },
  });

  res.json(targetPost);
});

router.get("/current", async (req, res) => {
  const { user } = req;
  const posts = await Post.findAll({
    where: {
      userId: user.id,
    },
  });

  const postsJSON = posts.map((ele) => ele.toJSON());

  if (!postsJSON.length) {
    res.status(200).json({ message: "No posts at this time" });
  }

  for (let post of postsJSON) {
    const sum = await Review.sum("rating", {
      where: {
        postId: post.id,
      },
    });

    const total = await Review.count({
      where: {
        postId: post.id,
      },
    });

    if (!total) {
      post.avgRating = "No Ratings Yet";
    } else {
      post.avgRating = sum / total;
    }
  }

  res.status(200).json(postsJSON);
});

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const target = await Post.findOne({
    where: {
      id: postId,
    },
  });

  const sum = await Review.sum("rating", {
    where: {
      postId: target.id,
    },
  });

  const total = await Review.count({
    where: {
      postId: target.id,
    },
  });

  if (!total) {
    target.avgRating = "No Ratings Yet";
  } else {
    target.avgRating = sum / total;
  }

  res.status(200).json(target);
});

router.delete("/:postId", requireAuth, async (req, res) => {
  const postId = req.params.postId;
  const target = await Post.findOne({
    where: {
      id: postId,
    },
  });

  await target.destroy();

  res.json({ message: `Successfully deleted Post #${postId}` });
});
module.exports = router;
