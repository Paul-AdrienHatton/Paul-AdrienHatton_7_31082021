const moment = require("moment");
moment.locale("fr");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "post",
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
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  return Comment;
};
