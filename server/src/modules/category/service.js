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

  async addTag(categoryId, tagIds) {
    return await categoryRepository.addTag(categoryId, tagIds);
  },

  async removeTag(categoryId, tagId) {
    return await categoryRepository.removeTag(categoryId, tagId);
  },
};

module.exports = categoryService;
