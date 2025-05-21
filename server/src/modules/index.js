const api = {
  users: require("./user"),
  auth: require("./auth"),
  categories: require("./category"),
  tags: require("./tag"),
  posts: require("./post"),
  comments: require("./comment"),
  covers: require("./cover"),
  // roles: require("./role"),
  // adscategories: require("./adscategory"),
  // advertisements: require("./advertisement"),
  // "features": require("./features"),
};

// build a api list and router call it here by suffix
const initRoutes = (app) => {
  for (const [key, value] of Object.entries(api)) {
    // console.log(`Mounting /api/${key}`, typeof value);
    app.use(`/api/${key}`, value);
  }
};

module.exports = initRoutes;
