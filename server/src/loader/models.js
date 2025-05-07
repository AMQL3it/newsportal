// Import all models
const Role = require("../modules/role/model");
const User = require("../modules/user/models/User");
const UserToken = require("../modules/user/models/UserToken");
const Verification = require("../modules/auth/model");
// const Role = require("./role/model");
// const Category = require("./category/model");
// const Tag = require("./tag/model");
// const Post = require("./post/model");
// const Comment = require("./comment/model");
// const Advertisement = require("./advertisement/model");
// const AdsCategory = require("./adscategory/model");
// const PostTag = require("./junctions/PostTag");

// Associations

// User - Role (Many to One)
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

// User - UserToken (Many to One)
User.hasMany(UserToken, { foreignKey: "user_id" });
UserToken.belongsTo(User, { foreignKey: "user_id" });

// User - Verification (Many to One)
User.hasMany(Verification, { foreignKey: "user_id" });
Verification.belongsTo(User, { foreignKey: "user_id" });

// Category.hasMany(Post);
// Post.belongsTo(Category);

// Post.belongsToMany(Tag, { through: PostTag });
// Tag.belongsToMany(Post, { through: PostTag });

// Post.hasMany(Comment);
// Comment.belongsTo(Post);

// User.hasMany(Comment);
// Comment.belongsTo(User);

// Export everything
module.exports = {
  //   sequelize,
  Role,
  User,
  UserToken,
  Verification,
  //   Role,
  //   Category,
  //   Tag,
  //   Post,
  //   Comment,
  //   Advertisement,
  //   AdsCategory,
  //   PostTag,
};
