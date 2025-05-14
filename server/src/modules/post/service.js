const postRepository = require("./repository");
const {
  calculateSeoScore,
  calculateReadableScore,
} = require("../../utils/seoCalculator");
const fs = require("fs");
const path = require("path");

const postService = {
  async create(req) {
    const filePath = req.file?.path;
    try {
      if (req.file) {
        req.body.image = req.file.path;
      }

      const seo_score = calculateSeoScore(req.body.title, req.body.content);
      const readable_score = calculateReadableScore(req.body.content);

      req.body.seo_score = seo_score;
      req.body.readable_score = readable_score;

      return await postRepository.create(req.body);
    } catch (error) {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw error;
    }
  },

  async getAll() {
    return await postRepository.getAll();
  },

  async getAllByCategory(id) {
    return await postRepository.getAllByCategory(id);
  },

  async getById(id) {
    return await postRepository.getById(id);
  },

  async update(id, data) {
    return await postRepository.update(id, data);
  },

  async updateState(id, data) {
    return await postRepository.updateState(id, data);
  },

  async deleteById(id) {
    const post = await postRepository.delete(id);
    if (post) {
      const filePath = post.image;
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return true;
  },
};

module.exports = postService;
