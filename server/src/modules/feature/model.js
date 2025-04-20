const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

const Area = sequelize.define(
  "Area", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT },
    phone: { type: DataTypes.STRING },
  },
  {
    tableName: "areas",
  }
);

module.exports = Area;