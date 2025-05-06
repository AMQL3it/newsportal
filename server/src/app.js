// External Imports
const dotenv = require("dotenv");

// // Internal Imports
// const logger = require('./common/logger');
// const DB = require('./databases/dbloader');

// const createServer = require('./library/express');

// // App setup

dotenv.config();
// const port = process.env.PORT || 5000;
// const app_name = process.env.APP_NAME || 'Newspaper';

// const server = createServer();
// server.listen(port, () => {
//   // Database connection
//   DB.DBconnection();
//   logger.info(`${app_name} - app listening to port: ${port}`);
// })

const loader = require("./loader");
loader();
