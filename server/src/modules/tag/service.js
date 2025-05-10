const tagRepository = require("./repository");

const tagService = {
  async create(data) {
    return await tagRepository.create(data);
  },

  async getAll() {
    return await tagRepository.getAll();
  },

  async getById(id) {
    return await tagRepository.getById(id);
  },

  async getByQuery(query) {
    return await tagRepository.getByQuery(query);
  },

  async update(id, data) {
    return await tagRepository.update(id, data);
  },

  async deleteById(id) {
    return await tagRepository.delete(id);
  },
};

module.exports = tagService;
