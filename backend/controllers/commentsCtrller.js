const db = require("../models");
const Comment = db.comment;
const statut = require("./responseFormatter");

exports.getCommentsByPost = (req, res) => {
  Comment.findAll({ where: { post_id: req.params.post_id } })
    .then((comments) => res.status(200).json({ comments }))
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

exports.newComment = (req, res) => {
  const payload = {
    author: req.body.author,
    content: req.body.content,
    post_id: req.body.post_id,
    creationDate: req.body.created_at,
  };
  Comment.create(payload)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

exports.updateComment = (req, res) => {
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

exports.deleteComment = (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => statut.responseSuccess(res, "Your comment has been deleted"))
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};
