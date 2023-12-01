const { Post } = require("../db/models");
const entitledP = async (req, _res, next) => {
  const postId = req.params.postId;
  const { user } = req;
  const err = {};
  err.message = "Forbidden";

  const target = await Post.findOne({
    where: {
      id: postId,
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

module.exports = entitledP;
