const mysql = require("mysql2");
require("dotenv").config();

const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "chantilly!22",
  database: "groupomania",
});

sql.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connection à la base de donnée réussie !");
});

module.exports = sql;
