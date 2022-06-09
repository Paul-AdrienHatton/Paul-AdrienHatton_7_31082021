const express = require("express");
const router = express.Router();
const postsCtrller = require("../controllers/postsCtrller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Post
router.get("/", postsCtrller.getAllPosts);
router.post("/:id", auth, multer, postsCtrller.createPost);
router.put("/user/:id", auth, multer, postsCtrller.updatePost);
router.delete("/:id", auth, postsCtrller.deletePost);
router.get("/:id", auth, postsCtrller.getAllUsersPosts);

module.exports = router;
