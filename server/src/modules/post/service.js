const postRepository = require("./repository");
const { calculateSeoScore, calculateReadableScore } = require('../../utils/seoCalculator');
const fs = require("fs");
const path = require("path");

const postService = {
  async create(req) {
  
    try {
      if(req.file){
        req.body.image = req.file.path;
      }
  
      const seo_score = calculateSeoScore(req.body.title, req.body.content);
      const readable_score = calculateReadableScore(req.body.content);
  
      req.body.seo_score = seo_score;
      req.body.readable_score = readable_score;
  
      return await postRepository.create(req.body);
    } catch (error) {
      
      if(req.file){
        const filePath = req.file.path;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      }
      throw error;
    }
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

  async updateState(id, data) {
    return await postRepository.updateState(id, data);
  },

  async deleteById(id) {
    return await postRepository.delete(id);
  },
};

module.exports = postService;
