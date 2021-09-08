const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/Posts");
const auth = require("../middleware/auth");

// Post

//Obtenir tout les posts
router.get("/", postsCtrl.getAllPost); //good
// Créer un post
router.post("/add", postsCtrl.createPost); //to do
// Obtenir un post avec l'id
router.get("/:id", postsCtrl.getOnePost); //good
// Modifié un post avec l'id
router.put("/:id", postsCtrl.updatePost); //good
// Supprimer un post avec l'id
router.delete("/:id", postsCtrl.deletePost); //good

//Commentaires

// Obtenir tout les commentaires
router.get("/:id/comments", postsCtrl.getAllComments); //good
// Faire un commentaire
router.post("/:id/comment", postsCtrl.makeComment); // to do
// Supprimer un commentaire
router.delete("/comment/:id", postsCtrl.deleteComment); //good

// Route de test
router.post("/testRoutes", postsCtrl.testRoutes);

module.exports = router;
