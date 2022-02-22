const express = require("express");
const commentsCtrller = require("../controllers/commentsCtrller");
const auth = require("../middleware/auth");

// Utilisation d'un router
const router = express.Router();

// Création des routes commentaires
router.get("/:id", auth, commentsCtrller.getCommentsByPost);
router.post("/:id", commentsCtrller.newComment);
router.put("/:id", auth, commentsCtrller.updateComment);
router.delete("/:id", auth, commentsCtrller.deleteComment);

module.exports = router;
