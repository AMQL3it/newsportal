const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

const Advertisement = sequelize.define(
  "Advertisement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: true },
    position: { type: DataTypes.ENUM("header", "sidebar", "footer", "popup"), allowNull: false, defaultValue: "sidebar" },
    adscategory_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    start_date: { type: DataTypes.DATE, allowNull: true },
    end_date: { type: DataTypes.DATE, allowNull: true },
    priority: { type: DataTypes.INTEGER, defaultValue: 0 },
    layout: { type: DataTypes.STRING }
  },
  {
    tableName: "advertisements"
  }
);

module.exports = Advertisement;
