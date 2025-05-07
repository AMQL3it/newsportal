const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config");

const Category = sequelize.define(
  "Category",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    parent_id: { type: DataTypes.INTEGER, defaultValue: null },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING },
    layout: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;
