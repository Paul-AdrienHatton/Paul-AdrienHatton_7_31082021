const express = require("express");
const router = express.Router();
const postsCtrller = require("../controllers/postsCtrller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Obtenir tout les posts
router.get("/", auth, postsCtrller.getAllPosts);
router.post("/add", auth, multer, postsCtrller.createPost);
router.get("/:id", auth, postsCtrller.getOnePost);
router.put("/:id", auth, multer, postsCtrller.updatePost);
router.delete("/:id", auth, postsCtrller.deletePost);
router.get("/:id/comments", auth, postsCtrller.getAllUsersPosts);

module.exports = router;
