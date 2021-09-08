const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/Users");
const auth = require("../middleware/auth");
const passwordValidation = require("../middleware/password");

// Création d'un compte
router.post("/signup", userCtrl.signup); //good
// Connexion à un compte
router.post("/login", userCtrl.login); //good
// On supprime le compte et les données (Images)
router.delete("/accounts/:id", userCtrl.deleteAccount); //good

module.exports = router;
