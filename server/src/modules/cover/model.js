const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config");

const Cover = sequelize.define(
  "Cover",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    content: { type: DataTypes.JSON, defaultValue: [] },
  },
  {
    tableName: "covers",
    timestamps: true,
  }
);

module.exports = Cover;
