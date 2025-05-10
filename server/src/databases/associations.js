const setupAssociations = (Models) => {
  const {
    Role,
    User,
    Category,
    Tag,
    CategoryTag,
    Post,
    PostStat,
    PostTag,
    Comment,
    Adscategory,
    Advertisement,
  } = Models;

  // User - Role (Many to One)
  Role.hasMany(User, { foreignKey: "role_id" });
  User.belongsTo(Role, { foreignKey: "role_id" });

  // ✅ Post - PostStat (One to One)
  Post.hasOne(PostStat, {
    foreignKey: "post_id",
    as: "stats",
    onDelete: "CASCADE",
  });
  PostStat.belongsTo(Post, { foreignKey: "post_id", as: "post" });

  // ✅ Many-to-Many Association (Post - Tag)
  Post.belongsToMany(Tag, {
    through: PostTag,
    foreignKey: "post_id",
    as: "tags",
  });
  Tag.belongsToMany(Post, {
    through: PostTag,
    foreignKey: "tag_id",
    as: "posts",
  });

  // Post - User (Many to One)
  User.hasMany(Post, { foreignKey: "user_id" });
  Post.belongsTo(User, { foreignKey: "user_id" });

  // ✅ Many-to-Many Association
  Category.belongsToMany(Tag, {
    through: CategoryTag,
    foreignKey: "category_id",
    otherKey: "tag_id",
    as: "tags",
  });

  // ✅ Many-to-Many Association
  Tag.belongsToMany(Category, {
    through: CategoryTag,
    foreignKey: "tag_id",
    otherKey: "category_id",
    as: "categories",
  });

  // Post - Category (Many to One)
  // Category.hasMany(Post, { foreignKey: "category_id" });
  // Post.belongsTo(Category, { foreignKey: "category_id" });
  // Post Model এর মধ্যে
  Post.belongsTo(Category, { as: "category", foreignKey: "category_id" });

  // Category Model এর মধ্যে
  Category.hasMany(Post, { foreignKey: "category_id", as: "posts" });

  // Post - Tag (Many to Many)
  Post.belongsToMany(Tag, { through: "PostTags", foreignKey: "post_id" });
  Tag.belongsToMany(Post, { through: "PostTags", foreignKey: "tag_id" });

  // Comment - Post (Many to One)
  Post.hasMany(Comment, { foreignKey: "post_id" });
  Comment.belongsTo(Post, { foreignKey: "post_id" });

  // Comment - User (Many to One)
  User.hasMany(Comment, { foreignKey: "user_id" });
  Comment.belongsTo(User, { foreignKey: "user_id" });

  // Nested Comments (Self Referencing)
  Comment.hasMany(Comment, { as: "Replies", foreignKey: "parent_id" });
  Comment.belongsTo(Comment, { as: "Parent", foreignKey: "parent_id" });

  // Advertisement - AdsCategory (Many to One)
  Adscategory.hasMany(Advertisement, { foreignKey: "adscategory_id" });
  Advertisement.belongsTo(Adscategory, { foreignKey: "adscategory_id" });

  // Advertisement - User (Posted by) (Optional, if user can create ads)
  User.hasMany(Advertisement, { foreignKey: "user_id" });
  Advertisement.belongsTo(User, { foreignKey: "user_id" });
};

module.exports = setupAssociations;
