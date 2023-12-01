const { Post, User, Review } = require("../db/models");
const entitledR = async (req, _res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const err = {};
  err.message = "Forbidden";

  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if (user && user.adminKey != "roderick0318") {
    if (!target || user.id != target.userId) {
      err.title = "Unauthorized Permissions";
      err.status = 403;
      next(err);
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = entitledR;
