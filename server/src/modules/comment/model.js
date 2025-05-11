const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config");

const Comment = sequelize.define(
  "Comment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    parent_id: { type: DataTypes.INTEGER, defaultValue: null },
    comment: { type: DataTypes.TEXT, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "comments",
  }
);

module.exports = Comment;
