const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// const sequelize = new Sequelize("news_portal", "root", "12345", {
//     host: "localhost",
//     dialect: "mysql",
//     port: "3306",
//     logging: false,
//   });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  }
);

module.exports = sequelize;
