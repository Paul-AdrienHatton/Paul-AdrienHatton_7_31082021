const moment = require("moment");
moment.locale("fr");

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "likes",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      isliked: {
        type: DataTypes.INTEGER,
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "post",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("created_at")).format(
            "DD/MM/YY HH:mm"
          );
        },
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("created_at")).format(
            "DD/MM/YY HH:mm"
          );
        },
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  return Likes;
};
