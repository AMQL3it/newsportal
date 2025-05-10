const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config");

const Post = sequelize.define(
  "Post",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    seo_score: { type: DataTypes.INTEGER },
    readable_score: { type: DataTypes.INTEGER },
    layout: { type: DataTypes.STRING },
  },
  {
    tableName: "posts",
  }
);

module.exports = Post;
