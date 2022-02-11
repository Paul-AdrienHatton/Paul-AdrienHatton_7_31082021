const dbConfig = require("../config/database");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./usersMdl")(sequelize, Sequelize);
db.post = require("./postsMdl")(sequelize, Sequelize);
db.comment = require("./commentsMdl")(sequelize, Sequelize);

db.post.belongsTo(db.user);
db.user.hasMany(db.post);
db.post.hasMany(db.comment);
db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);
db.comment.belongsTo(db.post);

module.exports = db;
