const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

const Adscategory = sequelize.define(
  "Adscategory", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    type: { type: DataTypes.STRING },
    layout: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "adscategories",
    timestamps: false
  }
);

module.exports = Adscategory;
