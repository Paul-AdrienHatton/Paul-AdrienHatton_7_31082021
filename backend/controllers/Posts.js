const fs = require("fs");
const db = require("../db_connect");

exports.getAllPost = (req, res, next) => {
  db.query(
    "SELECT users.nom, users.prenom, posts.id, posts.userId, posts.title, posts.content, posts.date AS date FROM users INNER JOIN posts ON users.id = posts.userId ORDER BY date DESC",
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};

exports.getOnePost = (req, res, next) => {
  db.query(
    `SELECT * FROM posts WHERE 'userId' = '${req.params.id}'`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};

exports.createPost = (req, res, next) => {
  let title = encodeURIComponent(req.body.title);
  db.query(
    `INSERT INTO posts VALUES (NULL, '${req.body.id}', '${title}', NOW(), '${req.body.content}')`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(201).json({
        message: "Votre post à été publié !",
      });
    }
  );
};

exports.deletePost = (req, res, next) => {
  db.query(
    `DELETE FROM posts WHERE 'userId' = '${req.params.id}'`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json({
        message: "Votre post à été supprimé!",
      });
    }
  );
};

exports.updatePost = (req, res, next) => {
  db.query(
    `UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE 'userId' = '${req.params.id}'`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json({
        message: "Votre post à été modifié !",
      });
    }
  );
};

// Commentaires
exports.getAllComments = (req, res, next) => {
  db.query(
    `SELECT * FROM comments WHERE 'comments.postId' = '${req.params.id}'`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};

exports.makeComment = (req, res, next) => {
  db.query(
    `INSERT INTO comments VALUES ('${req.params.id}', '${req.body.userId}', '${req.body.postId}', NOW(), '${req.body.content}')`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json({
        message: "Votre commentaire à été publié !",
      });
    }
  );
};

exports.deleteComment = (req, res, next) => {
  db.query(
    `DELETE FROM comments WHERE 'comments.id' = '${req.params.id}'`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json({
        message: "Votre commentaire à été supprimé !",
      });
    }
  );
};

exports.testRoutes = (req, res, next) => {
  res.send("Hello World!");
};

export class db {
  static insert() {}

  static delet;
}
