const logger = require("../common/logger");
const sequelize = require("./config");

const DBconnection = async () => {
    try {
      await sequelize.authenticate();
      // console.log('DB connection successfully.');
      logger.info('DB connection successfully.');
      DBLoader();
      return sequelize; 
    } catch (error) {
      // console.error('Unable to connect to the database:',error);
      logger.error(`Unable to connect to the database: `);
      throw error; 
    }
};

const Models = require("./models");
const setupAssociations = require("./associations");

// { alter: true }
const DBLoader = async () => {
    try {
      await setupAssociations(Models);
      for (const modelName in Models) {
        // await Models[modelName].sync({ alter: true });
        // await Models[modelName].sync();
        logger.warning(`${modelName} model created successfully.`);
      }
    } catch (error) {
      console.error('Unable to create tables:', error);
      throw error; 
    } 
    // finally {
    //   await sequelize.close(); // Close the connection
    //   logger.info('DB connection closed.');
    // }
}

module.exports = { DBconnection, DBLoader };