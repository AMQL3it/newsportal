const coverRepository = require("./repository");

const coverService = {
  async create(data) {
    return await coverRepository.create(data);
  },

  async getAll() {
    return await coverRepository.getAll();
  },

  async getById(id) {
    return await coverRepository.getById(id);
  },

  async update(id, data) {
    return await coverRepository.update(id, data);
  },
};

module.exports = coverService;
