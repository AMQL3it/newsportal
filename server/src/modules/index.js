
const api = {
    "role": require("./role"),
    "users": require("./user"),
    "categories": require("./category"),
    "tags": require("./tag"),
    "posts": require("./post"),
    "comments": require("./comment"),
    "adscategories": require("./adscategory"),
    "advertisements": require("./advertisement"),
    // "features": require("./features"),
}

// build a api list and router call it here by suffix
const initRoutes = (app) => {
    for (const [key, value] of Object.entries(api)) {
        app.use(`/${key}`, value);
    }
}

module.exports = initRoutes;

