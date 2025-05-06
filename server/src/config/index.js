const sequelize = require("./mysql");

module.exports = {
  sequelize,
  //   dbConfig: {
  //     host: process.env.DB_HOST,
  //     user: process.env.DB_USER,
  //     name: process.env.DB_NAME,
  //   },
  appConfig: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
  },
};
