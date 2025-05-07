const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config");

const Verification = sequelize.define(
  "Verification",
  {
    user_id: { type: DataTypes.INTEGER },
    code: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    tableName: "verifications",
    timestamps: true,
  }
);

module.exports = Verification;
