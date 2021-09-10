const express = require("express");
const router = express.Router();
const userCtrller = require("../controllers/usersCtrller");
const auth = require("../middleware/auth");
const passwordValidation = require("../middleware/password");

// Création d'un compte
router.post("/signup", userCtrller.signup); //good
// Connexion à un compte
router.post("/login", userCtrller.login); //good
// On supprime le compte et les données (Images)
router.delete("/accounts/:id", userCtrller.deleteAccount); //good

module.exports = router;
