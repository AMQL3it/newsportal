const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config");

const CategoryTag = sequelize.define(
  "CategoryTag",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
    },
  },
  {
    tableName: "category_tag",
    timestamps: false,
  }
);

module.exports = CategoryTag;
