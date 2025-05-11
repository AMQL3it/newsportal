const logger = require("../utils/logger");
const { sequelize } = require("../config");

const dbconnection = async () => {
  try {
    await sequelize.authenticate();
    // console.log('DB connection successfully.');
    logger.info("✅ DB connection successfully.");
    // DBLoader();
    return sequelize;
  } catch (error) {
    // console.error('Unable to connect to the database:',error);
    logger.error(`Unable to connect to the database: `);
    throw error;
  }
};

const Models = require("./models");

// { alter: true }
const dbsync = async () => {
  try {
    // await setupAssociations(Models);
    for (const modelName in Models) {
      // await Models[modelName].sync({ alter: true });
      await Models[modelName].sync();
      logger.warning(`✅ ${modelName} model sync done successfully.`);
    }
  } catch (error) {
    logger.error(`Error syncing tables: ${error.name}`);
    console.error("Unable to create tables:", error.name);
    throw error;
  }
  // finally {
  //   await sequelize.close(); // Close the connection
  //   logger.info('DB connection closed.');
  // }
};

const inits = require("./init");

const dbinit = async () => {
  try {
    // Object.values দিয়ে সব ফাংশন loop করো
    for (const fn of Object.values(inits)) {
      await fn(); // await করতে ভুলবে না
      logger.warning(`✅ ${fn.name} init done successfully.`);
    }
    logger.warning(`🎉 All modules initialized successfully.`);
  } catch (error) {
    logger.error(`❌ Error initializing: ${error.name}`);
    console.error("Unable to initialize:", error);
    throw error;
  }
};

module.exports = { dbconnection, dbsync, dbinit };
