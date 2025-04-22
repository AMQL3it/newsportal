const setupAssociations = (Models) => {
    const {
      Role,
      User,
      Category,
      Tag,
      Post,
      Comment,
      Adscategory,
      Advertisement,
    } = Models;
  
    // User - Role (Many to One)
    Role.hasMany(User, { foreignKey: "role_id" });
    User.belongsTo(Role, { foreignKey: "role_id" });
  
    // Post - User (Many to One)
    User.hasMany(Post, { foreignKey: "user_id" });
    Post.belongsTo(User, { foreignKey: "user_id" });
  
    // Post - Category (Many to One)
    Category.hasMany(Post, { foreignKey: "category_id" });
    Post.belongsTo(Category, { foreignKey: "category_id" });
  
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
  