const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(10) // Longueur minimun : 10
  .has()
  .uppercase() // Doit avoir au moins une majuscule
  .has()
  .lowercase() // Doit avoir au moins une minuscule
  .has()
  .digits() // Doit avoir au moins un chiffre
  .has()
  .not()
  .spaces() // Ne doit pas avoir d'espaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "azerty"]); // Blacklist de valeurs à proscrire

module.exports = passwordSchema;
