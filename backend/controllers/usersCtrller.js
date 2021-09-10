const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
// import { responseSuccess } from "./errorHandler";
// import { responseError } from "./errorHandler";
function responseSuccess(res, message) {
  res.status(200).json({
    message: message,
  });
}

function responseError(res, code, message) {
  res.status(code).json({
    message: message,
  });
}

require("dotenv").config();

const User = db.usersMdl;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Création d'un utilisateur
exports.createUser = (req, res, next) => {
  if (!req.body.email || !req.body.pseudo || !req.body.password) {
    responseError(res, 400, "You missing required field");
  } else if (!regexEmail.test(req.body.email)) {
    responseError(res, 400, "Please provide a valid email");
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
          responseSuccess(res, "User created with sucess");
        })
        .catch((err) => {
          if ((err.errors[0].message = "Email must be unique")) {
            responseError(res, 409, "Email allready used");
          } else {
            responseError(res, 500, "Bad request");
          }
        });
    })
    .catch((err) => responseError(res, 500, "Bad request"));
};

//Connexion d'un utilisateur existant
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        responseError(res, 401, "Unauthorized");
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            responseError(res, 401, "Unauthorized");
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) => responseError(res, 500, "Internal Server Error"));
    })
    .catch((err) => responseError(res, 500, "Internal Server Error"));
};

//Récupération d'un utilisateur
exports.getOneUser = (req, res, next) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        responseError(res, 404, "User not found");
      }
      res.status(200).json({
        admin: user.is_admin,
        profilePicture: user.profil_picture,
        userId: user.id,
        email: user.email,
        pseudo: user.pseudo,
      });
    })
    .catch((err) => responseError(res, 500, "Internal Server Error"));
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
        responseError(res, 404, "User not found");
      } else {
        responseSuccess(res, "User modified");
      }
    })
    .catch((err) => responseError(res, 500, "Internal Server Error"));
};

//Suppression (ou anonymisation) d'un utilisateur
exports.deleteAccount = (req, res, next) => {
  User.update(
    {
      email: "ancien utilisateur" + Date.now(),
      pseudo: "ancien utilisateur",
      password: process.env.oldUserPassword,
      profil_picture: "http://localhost:3000/images/avatar.png",
      is_admin: 0,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((data) => {
      if (data[0] === 0) {
        responseError(res, 404, "User not found");
      } else {
        responseSuccess(res, "User deleted");
      }
    })
    .catch((err) => responseError(res, 500, "Internal Server Error"));
};
