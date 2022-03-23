const express = require("express");
const router = express.Router();
const likesCtrller = require("../controllers/likesCtrller");
const auth = require("../middleware/auth");

// Création des routes 
router.get("/", likesCtrller.getlikes);
router.post("/likes/:id", auth, likesCtrller.likes);
router.post("/dislikes/:id", auth, likesCtrller.dislikes);

module.exports = router;
