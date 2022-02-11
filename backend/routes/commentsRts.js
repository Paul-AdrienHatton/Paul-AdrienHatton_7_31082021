const express = require("express");
const commentsCtrller = require("../controllers/commentsCtrller");
const auth = require("../middleware/auth");

// Utilisation d'un router
const router = express.Router();

// Création des routes commentaires
router.get("/:id", auth, commentsCtrller.getCommentsByPost);
router.post("/:id", commentsCtrller.newComment);
router.put("/:id/comment", auth, commentsCtrller.updateComment);
router.delete("/:id/comment", auth, commentsCtrller.deleteComment);

module.exports = router;
