const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

const Post = sequelize.define(
  "Post", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    auther: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
    shares: { type: DataTypes.INTEGER, defaultValue: 0 },
    seo_score: { type: DataTypes.INTEGER },
    readable_score: { type: DataTypes.INTEGER },
    layout: { type: DataTypes.STRING },
  },
  {
    tableName: "posts",
  }
);

module.exports = Post;