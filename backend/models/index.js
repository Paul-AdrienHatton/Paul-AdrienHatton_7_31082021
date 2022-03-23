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
db.likes = require("./likesMdl")(sequelize, Sequelize);

// TABLES ASSOCIATIONS

db.post.belongsTo(db.user);
db.user.hasMany(db.post);

db.post.belongsToMany(db.user, {
  through: db.likes,
});
db.user.belongsToMany(db.post, {
  through: db.likes,
});

db.post.hasMany(db.comment, { onDelete: "CASCADE" });
db.user.hasMany(db.comment);

db.post.hasMany(db.likes, { onDelete: "CASCADE" });
db.user.hasMany(db.likes);

db.comment.belongsTo(db.user);
db.comment.belongsTo(db.post, { onDelete: "CASCADE" });

db.likes.belongsTo(db.user, {
  foreignKey: "user_id",
  as: 'users',
});
db.likes.belongsTo(db.post, {
  foreignKey: "post_id",
  as: 'posts',
});

module.exports = db;
