const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Routage
router.post("/create", auth, multer, postCtrl.createPost);
router.put("/update", auth, multer, postCtrl.updatePost);
router.delete("/delete", auth, postCtrl.deletePost);
router.get("/getPosts", auth, postCtrl.getAllPosts);
router.get("/user/:id", auth, postCtrl.getPostProfile);

module.exports = router;
