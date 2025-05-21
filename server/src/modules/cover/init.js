const Cover = require("./model");
const logger = require("../../utils/logger");

async function initCoverModule() {
  const titles = ["navbar", "story", "covergrid", "suggestions", "breaking"];

  for (let name of titles) {
    const exists = await Cover.findOne({ where: { name } });
    if (!exists) {
      await Cover.create({ name });
      logger.info(`✅ Cover created: ${name}`);
    }
  }
}

module.exports = initCoverModule;
