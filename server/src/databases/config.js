const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// const sequelize = new Sequelize("newsportal", "app", "12345", {
//     host: "127.0.0.1",
//     dialect: "mysql",
//     port: 3306,
//     logging: false,
// });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  });

module.exports = sequelize;