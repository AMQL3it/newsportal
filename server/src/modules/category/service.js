const categoryRepository = require("./repository");

const categoryService = {
  async create(data) {
    return await categoryRepository.create(data);
  },

  async getAll() {
    return await categoryRepository.getAll();
  },

  async getById(id) {
    return await categoryRepository.getById(id);
  },

  async update(id, data) {
    return await categoryRepository.update(id, data);
  },

  async deleteById(id) {
    return await categoryRepository.delete(id);
  },
};

module.exports = categoryService;
