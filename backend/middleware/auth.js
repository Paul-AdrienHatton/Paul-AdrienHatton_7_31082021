const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken["userId"];

    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("UserId non valable !");
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("Requête non authentifiée !") });
  }
};
