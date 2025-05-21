// Import all models
const Role = require("../modules/role/model");
const User = require("../modules/user/models/User");
const UserToken = require("../modules/user/models/UserToken");
const Verification = require("../modules/auth/model");

const Tag = require("../modules/tag/model");
const Category = require("../modules/category/model");
const CategoryTag = require("../modules/junctions/CategoryTag");

const Post = require("../modules/post/models/Post");
const PostState = require("../modules/post/models/PostState");
const PostTag = require("../modules/junctions/PostTag");

const Comment = require("../modules/comment/model");
const Cover = require("../modules/cover/model");

// ==================== Associations ====================

// Role - User (One to Many)
Role.hasMany(User, { foreignKey: "role_id", as: "users" });
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });

// User - UserToken (One to Many)
User.hasMany(UserToken, { foreignKey: "user_id", as: "tokens" });
UserToken.belongsTo(User, { foreignKey: "user_id", as: "user" });

// User - Verification (One to Many)
User.hasMany(Verification, { foreignKey: "user_id", as: "verifications" });
Verification.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Category - Tag (Many to Many)
Category.belongsToMany(Tag, {
  through: CategoryTag,
  foreignKey: "category_id",
  otherKey: "tag_id",
  as: "tags",
});

Tag.belongsToMany(Category, {
  through: CategoryTag,
  foreignKey: "tag_id",
  otherKey: "category_id",
  as: "categories",
});

// Post - PostState (One to One)
Post.hasOne(PostState, {
  foreignKey: "post_id",
  as: "state",
  onDelete: "CASCADE",
});
PostState.belongsTo(Post, {
  foreignKey: "post_id",
  as: "post",
});

// Post - Category (Many to One)
Post.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});
Category.hasMany(Post, {
  foreignKey: "category_id",
  as: "posts",
});

// Post - Tag (Many to Many)
Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: "post_id",
  otherKey: "tag_id",
  as: "tags",
});

Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: "tag_id",
  otherKey: "post_id",
  as: "posts",
});

// Comment - Post (Many to One)
Post.hasMany(Comment, { foreignKey: "post_id", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "post_id", as: "post" });

// Comment - User (Many to One)
User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Nested Comments (Self Referencing)
Comment.hasMany(Comment, { as: "Replies", foreignKey: "parent_id" });
Comment.belongsTo(Comment, { as: "Parent", foreignKey: "parent_id" });

// ==================== Export all models ====================
module.exports = {
  Role,
  User,
  UserToken,
  Verification,

  Tag,
  Category,
  CategoryTag,

  Post,
  PostState,
  PostTag,

  Comment,

  Cover,
};
