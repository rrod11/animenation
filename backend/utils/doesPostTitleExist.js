const { BlogPost } = require("../db/models");
const doesPostTitleExist = async (req, _res, next) => {
  const title = req.params.title;
  const err = {};
  err.errors = {};
  err.errors.message = "Title name already in use";
  const target = await BlogPost.findOne({
    where: {
      title,
    },
  });

  if (target) {
    err.title = "Title In Use";
    err.status = 500;
    next(err);
  }
  next();
};

module.exports = doesPostTitleExist;
