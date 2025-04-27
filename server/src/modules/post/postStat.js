const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

const PostStat = sequelize.define(
  "PostStat", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: { type: DataTypes.INTEGER, allowNull: false },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
    shares: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    tableName: "post_stats",
  }
);

module.exports = PostStat;
