const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

const Comment = sequelize.define(
  "Comment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.TEXT, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "comments"
  }
);

module.exports = Comment;