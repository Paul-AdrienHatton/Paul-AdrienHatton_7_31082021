require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const statut = require("./errorHandler");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Création d'un utilisateur
exports.createUser = (req, res, next) => {
  if (!req.body.email || !req.body.pseudo || !req.body.password) {
    statut.responseError(res, 400, "You missing required field");
  } else if (!regexEmail.test(req.body.email)) {
    statut.responseError(res, 400, "Please provide a valid email");
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
        profil_picture: req.body.profil_picture,
        is_admin: req.body.is_admin,
      };
      User.create(user)
        .then(() => {
          statut.responseSuccess(res, "User created with sucess");
        })
        .catch((err) => {
          if ((err.errors[0].message = "Email must be unique")) {
            statut.responseError(res, 409, "Email allready used");
          } else {
            statut.responseError(res, 500, "Bad request");
          }
        });
    })
    .catch((err) => statut.responseError(res, 500, "Bad request"));
};

//Connexion d'un utilisateur existant
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        statut.responseError(res, 401, "Unauthorized");
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            statut.responseError(res, 401, "Unauthorized");
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) =>
          statut.responseError(res, 500, "Internal Server Error")
        );
    })
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

//Récupération d'un utilisateur
exports.getOneUser = (req, res, next) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        statut.responseError(res, 404, "User not found");
      }
      res.status(200).json({
        admin: user.is_admin,
        profilePicture: user.profil_picture,
        userId: user.id,
        email: user.email,
        pseudo: user.pseudo,
      });
    })
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

//Modification d'un utilisateur
exports.modifyUser = (req, res, next) => {
  let password;
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      password = hash;
    });
  }
  const user = {
    email: req.body.email,
    pseudo: req.body.pseudo,
    password,
    is_admin: req.body.is_admin,
  };
  if (req.file) {
    user.profil_picture = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  User.update(user, {
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data[0] === 0) {
        statut.responseError(res, 404, "User not found");
      } else {
        statut.responseSuccess(res, "User modified");
      }
    })
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};

//Supression d'un utilisateur
exports.deleteAccount = (req, res, next) => {
  const id = req.params.id;
  User.findOne({
    attributes: ["id"],
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        User.destroy({ where: { id: id } })
          .then(() =>
            statut.responseSuccess(res, "Your account has been deleted")
          )
          .catch(() => statut.responseError(res, 500, "Internal Server Error"));
      } else {
        statut.responseError(res, 404, "User not found");
      }
    })
    .catch((err) => statut.responseError(res, 500, "Internal Server Error"));
};
