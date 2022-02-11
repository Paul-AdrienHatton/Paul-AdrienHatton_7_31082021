const db = require("../models");
const Comment = db.comment;

const statut = require("./responseFormatter");

exports.getCommentsByPost = (req, res, next) => {
  Comment.findAll({ where: { post_id: req.params.id } })
    .then((comments) => res.status(200).json({ comments }))
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

exports.newComment = (req, res, next) => {
  console.log(req.body);
  const comment = {
    content: req.body.content,
    post_id: req.body.post_id,
    user_id: req.body.user_id,
  };
  Comment.create(comment)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

exports.updateComment = (req, res, next) => {
  if (!req.body.content) {
    statut.responseError(res, 400, "Nothing found");
  }
  const comment = {
    content: req.body.content,
  };

  Comment.update(comment, {
    where: { id: req.params.id },
    returning: true,
    plain: true,
  })
    .then(() => statut.responseSuccess(res, "Your comment has been modify"))
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => statut.responseSuccess(res, "Your comment has been deleted"))
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};
