const db = require("../models");
const Like = db.likes;
const User = db.user;
const Post = db.post;
const asyncLib = require("async")
const statut = require("./responseFormatter");

const DISLIKED = 0;
const LIKED    = 1;

exports.likes = (req, res, next) => {
  var userId = req.body.user_id;
  var postId = req.body.post_id;

  asyncLib.waterfall([
    function(done) {
      Post.findOne({
        where: { id: postId }
      })
      .then(function(postFound) {
        done(null, postFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify message' });
      });
    },
    function(postFound, done) {
      if(postFound) {
        User.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, postFound, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    },
    function(postFound, userFound, done) {
      if(userFound) {
        Like.findOne({
          where: {
            user_id: userId,
            post_id: postId
          }
        })
        .then(function(userAlreadyLikedFound) {
          done(null, postFound, userFound, userAlreadyLikedFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify is user already liked' });
        });
      } else {
        res.status(404).json({ 'error': 'user not exist' });
      }
    },
    function(postFound, userFound, userAlreadyLikedFound, done) {
      if(!userAlreadyLikedFound) {
        postFound.addUser(userFound, { isliked: 1 })
        .then(function(alreadyLikeFound) {
          done(null, postFound, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to set user reaction' });
        });
      } else {
        if (userAlreadyLikedFound.isliked === 0) {
          userAlreadyLikedFound.update({
            isliked: 1,
          }).then(function() {
            done(null, postFound, userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user reaction' });
          });
        } else {
          res.status(409).json({ 'error': 'message already liked' });
        }
      }
    },
    function(postFound, userFound, done) {
      postFound.update({
        liked: postFound.liked + 1,
      }).then(function() {
        done(postFound);
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot update message like counter' });
      });
    },
  ], function(postFound) {
    if (postFound) {
      return res.status(201).json(postFound);
    } else {
      return res.status(500).json({ 'error': 'cannot update message' });
    }
  });
};
exports.dislikes = (req, res, next) => {
  var userId = req.body.user_id;
  var postId = req.body.post_id;
  console.log(req.body);

  asyncLib.waterfall([
    function(done) {
      Post.findOne({
        where: { id: postId }
      })
      .then(function(postFound) {
        done(null, postFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify message' });
      });
    },
    function(postFound, done) {
      if(postFound) {
        User.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, postFound, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    },
    function(postFound, userFound, done) {
      if(userFound) {
        Like.findOne({
          where: {
            user_id: userId,
            post_id: postId
          }
        })
        .then(function(userAlreadyLikedFound) {
          done(null, postFound, userFound, userAlreadyLikedFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify is user already liked' });
        });
      } else {
        res.status(404).json({ 'error': 'user not exist' });
      }
    },
    function(postFound, userFound, userAlreadyLikedFound, done) {
      if(!userAlreadyLikedFound) {
        postFound.addUser(userFound, { isliked: 0 })
        .then(function(alreadyLikeFound) {
          done(null, postFound, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to set user reaction' });
        });
      } else {
        if (userAlreadyLikedFound.isliked === 1) {
          userAlreadyLikedFound.update({
            isliked: 0,
          }).then(function() {
            done(null, postFound, userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user reaction' });
          });
        } else {
          res.status(409).json({ 'error': 'message already disliked' });
        }
      }
    },
    function(postFound, userFound, done) {
      postFound.update({
        liked: postFound.liked - 1,
      }).then(function() {
        done(postFound);
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot update message like counter' });
      });
    },
  ], function(postFound) {
    if (postFound) {
      return res.status(201).json(postFound);
    } else {
      return res.status(500).json({ 'error': 'cannot update message' });
    }
  });
};

exports.getlikes = (req, res, next) => {
  Like.findAll({
    order: [["created_at", "DESC"]],
  })
    .then((likes) => {
      res.status(200).json(likes);
    })
    .catch((err) => statut.responseError(res, 500, "Bad request"));
};
