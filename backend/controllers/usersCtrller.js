require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const fs = require("fs");
const statut = require("./responseFormatter");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Création d'un utilisateur
exports.createUser = (req, res, next) => {
  if (!req.body.email || !req.body.pseudo || !req.body.password) {
    return statut.responseError(res, 400, "You missing required field");
  } else if (!regexEmail.test(req.body.email)) {
    return statut.responseError(res, 400, "Please provide a valid email");
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
        profil_picture: req.body.profil_picture,
        is_admin: req.body.is_admin,
      })
        .then(() => {
          return statut.responseSuccess(res, "User created with sucess");
        })
        .catch((err) => {
          if (err.errors[0].type == "unique violation") {
            return statut.responseError(res, 409, "Email already used");
          } else {
            return statut.responseError(res, 500, "The server encountered an internal error or misconfiguration and was unable to complete your request");
          }
        });
    })
    .catch((err) => statut.responseError(res, 500, "The server encountered an internal error or misconfiguration and was unable to complete your request"));
};

//Connexion d'un utilisateur existant
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return statut.responseError(res, 401, "Unknown user.");
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return statut.responseError(res, 401, "Check your password.");
          }
          res.status(200).json({
            userId: user.id,
            admin: user.is_admin,
            token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) =>
          statut.responseError(res, 500, "The server encountered an internal error or misconfiguration and was unable to complete your request")
        );
    })
    .catch((err) => statut.responseError(res, 500, "The server encountered an internal error or misconfiguration and was unable to complete your request"));
};

//Récupération d'un utilisateur
exports.getOneUser = (req, res, next) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return statut.responseError(res, 404, "User not found");
      }
      res.status(200).json({
        admin: user.is_admin,
        profilePicture: user.profil_picture,
        userId: user.id,
        email: user.email,
        pseudo: user.pseudo,
        password: user.password,
      });
    })
    .catch((err) => statut.responseError(res, 500, "The server encountered an internal error or misconfiguration and was unable to complete your request"));
};

//Modification d'un utilisateur
exports.modifyUser = async (req, res, next) => {
  let password;
  let profil_picture;
  if (req.body.password) {
    password = await bcrypt.hash(req.body.password, 10);
  }
  if (req.file) {
    profil_picture = `${req.protocol}://${req.get(
      "host"
    )}/images/${encodeURIComponent(req.file.filename)}`;
  }
  User.update({
    email: req.body.email,
    pseudo: req.body.pseudo,
    password,
    is_admin: req.body.admin,
    profil_picture,
  }, {
    where: { id: req.params.id },
  })
    .then((data) => {
      return data[0] === 0
        ? statut.responseError(res, 404, "User not found")
        : statut.responseSuccess(res, "User modified");
    })
    .catch((err) => {
      if (err.errors[0].type == "unique violation") {
        return statut.responseError(res, 409, "Email already used");
      } else {
        console.log(err);
        return statut.responseError(res, 500, "The server encountered an internal error or misconfiguration and was unable to complete your request");
      }
    });
};

//Supression d'un utilisateur
exports.deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    console.log(user);
    if (user.profil_picture !== "http://localhost:3000/images/avatar.png") {
      const filename = user.profil_picture.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {
        User.destroy({ where: { id: id } });
        statut.responseSuccess(res, "Your account has been deleted");
      });
    } else {
      User.destroy({ where: { id: id } });
      statut.responseSuccess(res, "Your account has been deleted");
    }
  } catch (error) {
    statut.responseError(res, 500, "The server encountered an internal error or misconfiguration and was unable to complete your request");
  }
};
