const express = require("express");
const commentsCtrller = require("../controllers/commentsCtrller");
const auth = require("../middleware/auth");

// Utilisation d'un router
const router = express.Router();

// Création des routes commentaires
router.get("/:id", commentsCtrller.getCommentsByPost);
router.post("/:id/comment", commentsCtrller.newComment);
router.put("/:id/comment", commentsCtrller.updateComment);
router.delete("/:id/comment", commentsCtrller.deleteComment);

module.exports = router;
