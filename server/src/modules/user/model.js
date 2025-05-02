const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

const User = sequelize.define(
  "User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "moderator", "user"), allowNull: false, defaultValue: "user" },
  },
  {
    tableName: "users",
    timestamps: false
  }
);

module.exports = User;