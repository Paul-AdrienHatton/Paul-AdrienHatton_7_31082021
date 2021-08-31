const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const { route } = require("./user");

//Routage
router.post("/create", multer, postCtrl.createPost);
router.put("/update", multer, postCtrl.updatePost);
router.delete("/delete", postCtrl.deletePost);
router.get("/getPosts", postCtrl.getAllPosts);
router.get("/user/:id", postCtrl.getPostProfile);

router.get("/testRoutes", postCtrl.testRoutes);

module.exports = router;
