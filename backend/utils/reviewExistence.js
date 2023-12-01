const { Review } = require("../db/models");
const existingR = async (req, _res, next) => {
  const reviewId = req.params.reviewId;
  const { user } = req;
  const err = {};
  err.message = "The requested review could not be found or does not exist";

  const target = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if (!target) {
    err.title = "Unable To Locate Review";
    err.status = 404;
    next(err);
  } else {
    next();
  }
};

module.exports = existingR;
