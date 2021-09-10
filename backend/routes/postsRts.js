const express = require("express");
const router = express.Router();
const postsCtrller = require("../controllers/posts_Ctrller");
const auth = require("../middleware/auth");

// Post

//Obtenir tout les posts
router.get("/", postsCtrller.getAllPost); //good
// Créer un post
router.post("/add", postsCtrller.createPost); //to do
// Obtenir un post avec l'id
router.get("/:id", postsCtrller.getOnePost); //good
// Modifié un post avec l'id
router.put("/:id", postsCtrller.updatePost); //good
// Supprimer un post avec l'id
router.delete("/:id", postsCtrller.deletePost); //good

//Commentaires

// Obtenir tout les commentaires
router.get("/:id/comments", postsCtrller.getAllComments); //good
// Faire un commentaire
router.post("/:id/comment", postsCtrller.makeComment); // to do
// Supprimer un commentaire
router.delete("/comment/:id", postsCtrller.deleteComment); //good

// Route de test
router.post("/testRoutes", postsCtrller.testRoutes);

module.exports = router;
