const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

// const PostStat = require("./postStat");

const Post = sequelize.define(
  "Post", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    auther: { type: DataTypes.STRING, allowNull: false },
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


// ✅ Post - PostStat (One to One)
// Post.hasOne(PostStat, { foreignKey: "post_id", as: "stats", onDelete: "CASCADE" });
// PostStat.belongsTo(Post, { foreignKey: "post_id", as: "post" });


module.exports = Post;