// modules/role/init.js
const Role = require("./model");
const logger = require("../../utils/logger");

async function initRoleModule() {
  const roles = ["superadmin", "admin", "editor", "user"];

  for (let name of roles) {
    const exists = await Role.findOne({ where: { name } });
    if (!exists) {
      await Role.create({ name });
      logger.info(`✅ Role created: ${name}`);
    }
  }
}

module.exports = initRoleModule;
