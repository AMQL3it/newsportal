const createServer = require("./express");
const logger = require("../utils/logger");
const { sequelize } = require("../config");
const { dbconnection, dbsync, dbinit } = require("./db");

const startServer = async () => {
  try {
    // Database connection
    await dbconnection();

    // Database sync
    await dbsync();
    // console.log("✅ Database synced successfully.");

    // initialize models
    await dbinit();

    // Server start
    const app = createServer();
    const port = process.env.PORT || 7000;
    const app_name = process.env.APP_NAME || "News Portal";

    app.listen(port, () => {
      logger.info(`✅ ${app_name} - app listening to port: ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to sync DB or start server:", error);
  }
};

// startServer();

module.exports = startServer;
