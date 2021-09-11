const express = require("express");
const path = require("path");
const helmet = require("helmet");

const usersRoutes = require("./routes/usersRts");
const postsRoutes = require("./routes/postsRts");

// Création de l'application Express
const app = express();

// Configuration des headers pour le CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

const db = require("./models/index");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Connexion de la base de données");
});

app.use(helmet());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// Implémentations des routes
app.use("/api/user", usersRoutes);
app.use("/api/post", postsRoutes);

module.exports = app;
