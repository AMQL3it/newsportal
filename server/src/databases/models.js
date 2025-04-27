const Models = {
    Role: require("../modules/role/model"),
    User: require("../modules/user/model"),
    Category: require("../modules/category/model"),
    Tag: require("../modules/tag/model"),
    CategoryTag: require("../modules/category_tag/model"),
    Post: require("../modules/post/model"),
    PostStat: require("../modules/post/postStat"),
    Comment: require("../modules/comment/model"),
    Adscategory: require("../modules/adscategory/model"),
    Advertisement: require("../modules/advertisement/model"),
};

module.exports = Models;