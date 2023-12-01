const { Post } = require("../db/models");
const existingP = async (req, _res, next) => {
  const postId = req.params.postId;
  const { user } = req;
  const err = {};
  err.message = "The requested post could not be found or does not exist";

  const target = await Post.findOne({
    where: {
      id: postId,
    },
  });

  if (!target) {
    err.title = "Unable To Locate Post";
    err.status = 404;
    next(err);
  } else {
    next();
  }
};

module.exports = existingP;
