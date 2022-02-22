const db = require("../models");
const Comment = db.comment;

const statut = require("./responseFormatter");

exports.getCommentsByPost = (req, res, next) => {
  Comment.findAll({
    where: { post_id: req.params.id },
    order: [["created_at", "DESC"]],
    include: [{ model: db.user }],
  })
    .then((comment) => {
      const commentObject = comment.map((comment) => {
        return Object.assign({
          id: comment.id,
          content: comment.content,
          user: comment.user.pseudo,
          userId: comment.user.id,
          creationDate: comment.created_at,
          updateDate: comment.updated_at,
          profil_picture: comment.profil_picture,
        });
      });
      res.status(200).json(commentObject);
    })
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

exports.newComment = (req, res, next) => {
  console.log(req.body);
  const comment = {
    content: req.body.content,
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    profil_picture: req.body.images,
  };
  if (req.file) {
    comment.image = `${req.protocol}://${req.get(
      "host"
    )}/images/${encodeURIComponent(req.file.filename)}`;
  }
  Comment.create(comment)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

exports.updateComment = (req, res, next) => {
  const comment = {
    content: req.body.content,
  };
  console.log(req.body.content);
  Comment.update(comment, {
    where: { id: req.params.id },
    returning: true,
    plain: true,
  })
    .then(() => statut.responseSuccess(res, "Your comment has been modified !"))
    .catch((err) => res.status(404).json({ err }));
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => statut.responseSuccess(res, "Your comment has been deleted"))
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};
