const { DataTypes } = require("sequelize");
const sequelize = require("../../databases/config");

const Verification = sequelize.define("Verification", {
  phone: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false },
  expiresAt: { type: DataTypes.DATE },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: "verifications",
  timestamps: true
});

module.exports = Verification;
