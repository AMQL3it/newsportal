const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config");

const PostTag = sequelize.define(
  "PostTag",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "posts", key: "id" },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "tags", key: "id" },
    },
  },
  {
    tableName: "post_tag",
    timestamps: false,
  }
);

module.exports = PostTag;
