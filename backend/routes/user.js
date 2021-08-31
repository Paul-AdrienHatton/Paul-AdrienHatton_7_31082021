const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", passwordValidation, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/myProfile", userCtrl.userProfile);
router.delete("/delete", auth, userCtrl.deleteAccount);

module.exports = router;
