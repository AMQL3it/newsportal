const Models = {
    Role: require("../modules/role/model"),
    User: require("../modules/user/model"),
    UserToken: require("../modules/user/UserToken"),
    Verification: require("../modules/auth/Verification"),
    Category: require("../modules/category/model"),
    Tag: require("../modules/tag/model"),
    CategoryTag: require("../modules/junctions/CategoryTag"),
    Post: require("../modules/post/model"),
    PostStat: require("../modules/post/postStat"),
    PostTag: require("../modules/junctions/postTag"),
    Comment: require("../modules/comment/model"),
    Adscategory: require("../modules/adscategory/model"),
    Advertisement: require("../modules/advertisement/model"),
};

module.exports = Models;