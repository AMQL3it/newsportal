const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config");

const UserToken = sequelize.define(
  "UserToken",
  {
    token_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER },
    token: { type: DataTypes.TEXT },
    login_time: { type: DataTypes.DATE },
    ip_address: { type: DataTypes.STRING },
    device_info: { type: DataTypes.STRING },
  },
  {
    tableName: "user_tokens",
  }
);

module.exports = UserToken;
