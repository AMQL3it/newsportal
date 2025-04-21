
const api = {
    "role": require("./role"),
    // "features": require("./features"),
}

// build a api list and router call it here by suffix
const initRoutes = (app) => {
    for (const [key, value] of Object.entries(api)) {
        app.use(`/${key}`, value);
    }
}

module.exports = initRoutes;

