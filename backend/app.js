const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/usersRts");
const postsRoutes = require("./routes/postsRts");
const commentsRoutes = require("./routes/commentsRts");
const likesRoutes = require("./routes/likesRts");

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// Implémentations des routes
app.use("/api/user", usersRoutes);
app.use("/api/post", postsRoutes);
app.use("/api/comment", commentsRoutes);
app.use("/api/likesDislikes", likesRoutes);

module.exports = app;
