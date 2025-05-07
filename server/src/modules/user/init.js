const userService = require("./service");
const logger = require("../../utils/logger");

async function initUserModule() {
  const email = process.env.SUPER_ADMIN_EMAIL;

  const existing = await userService.getByQuery({ email });
  if (!existing) {
    const data = {
      name: process.env.SUPER_ADMIN,
      email: process.env.SUPER_ADMIN_EMAIL,
      phone: process.env.SUPER_ADMIN_PHONE,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role_id: "1",
    };

    const user = await userService.create(data);
    logger.info(`✅ User created: ${user.name}`);
  } else {
    logger.warning(`ℹ️ Superadmin already exists`);
  }
}

module.exports = initUserModule;
