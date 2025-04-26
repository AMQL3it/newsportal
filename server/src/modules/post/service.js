const postRepository = require("./repository");

const postService = {
  async create(data) {
    return await postRepository.create(data);
  },

  async getAll() {
    return await postRepository.getAll();
  },

  async getById(id) {
    return await postRepository.getById(id);
  },

  async update(id, data) {
    return await postRepository.update(id, data);
  },

  async deleteById(id) {
    return await postRepository.delete(id);
  },
};

module.exports = postService;
