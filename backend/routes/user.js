const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const passwordValidation = require("../middleware/password");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/myProfile", userCtrl.userProfile);
router.delete("/delete", userCtrl.deleteAccount);

module.exports = router;
