const express = require("express");
const router = express.Router();
const userCtrller = require("../controllers/usersCtrller");
const auth = require("../middleware/auth");
const passwordValidation = require("../middleware/password");
const multer = require("../middleware/multer-config");

router.post("/signup", userCtrller.createUser);
router.post("/login", userCtrller.login);
router.get("/:id", auth, userCtrller.getOneUser);
router.put("/:id", auth, multer, userCtrller.modifyUser);
router.delete("/:id", auth, userCtrller.deleteAccount);

module.exports = router;
