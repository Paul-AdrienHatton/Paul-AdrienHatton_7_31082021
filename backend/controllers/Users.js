const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db_connect");
require("dotenv").config();

exports.signup = (req, res) => {
  // ADRIEN@GMAIL.COM DELETE TABLE USERS
  checkDataAndRespond(req.body.email, "string");

  db.query(
    `SELECT * FROM users WHERE email='${req.body.email}'`,
    (err, results, rows) => {
      if (results["length"] > 0)
        responseError(res, 401, "Email non disponible.");
      else {
        bcrypt
          .hash(req.body.password, 10)
          .then((passwordCrypted) => {
            db.query(
              `INSERT INTO users VALUES (NULL, '${req.body.nom}', '${req.body.prenom}', '${passwordCrypted}', '${req.body.email}', 0)`,
              (err, results, fields) => {
                if (err) {
                  return res.status(400).json("erreur");
                }
                return res.status(201).json({
                  message: "Votre compte a bien été crée !",
                });
              }
            );
          })
          .catch((error) =>
            responseError(
              res,
              500,
              "Une erreur est survenue, veuillez recharger la page"
            )
          );
      }
    }
  );
};

exports.login = (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email='${req.body.email}'`,
    (err, results, rows) => {
      if (results["length"] > 0) {
        bcrypt.compare(req.body.password, results[0].password).then((valid) => {
          if (!valid) {
            res.status(401).json({
              message: "Mot de passe incorrect.",
            });
          } else {
            res.status(200).json({
              userId: results[0].id,
              nom: results[0].nom,
              prenom: results[0].prenom,
              admin: results[0].admin,
              token: jwt.sign(
                {
                  userId: results[0].id,
                },
                process.env.TOKEN,
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        });
      } else {
        res.status(404).json({
          message: "Utilisateur inconnu.",
        });
      }
    }
  );
};

exports.deleteAccount = (req, res, next) => {
  // 3;DROP DATABASE;
  checkDataAndRespond(req.params.id, "number");

  db.query(
    `DELETE FROM users WHERE 'id' = '${req.params.id}'`,
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          message: "Une erreur est survenue, veuillez recharger la page",
        });
      }
      return res.status(200).json({
        message: "Votre compte à bien été supprimé",
      });
    }
  );
};

function checkDataAndRespond(res, data, expectedType) {
  if (typeof data !== expectedType)
    return responseError(res, 500, "Vérifier les données.");
}

function deleteUser(userId) {}

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

function dbInsert(table, dataArray) {
  let query = "INSERT INTO " + table;

  dataArrya.forEach((element) => {});
}
