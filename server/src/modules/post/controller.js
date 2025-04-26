const postService = require("./service");

const postController = {
  async create(req, res) {
    try {
      if (req.file) {
        req.body.image = req.file.filename; // image নামের field add করলাম
      }
      console.log(req.body.image);
      console.log(req.body);
      const post = await postService.create(req.body);
      res.status(201).json({ status: "success", data: post });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      // const page = parseInt(req.query.page) || 1;
      // const limit = parseInt(req.query.limit) || 10;
      // const offset = (page - 1) * limit;
  
      const result = await postService.getAll();
      res.status(200).json({
        status: "success",
        data: result.data,
        total: result.total
      });
    } catch (error) {
      console.error("Error in getAllCategories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getById(req, res) {
    try {
      const post = await postService.getById(req.params.id);
      if (!post) return res.status(404).json({ status: "error", message: "Post not found" });
      res.status(200).json({ status: "success", data: post });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async update(req, res) {
    try {
      const post = await postService.update(req.params.id, req.body);
      if (!post) return res.status(404).json({ status: "error", message: "Post not found" });
      res.status(200).json({ status: "success", data: post });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await postService.deleteById(req.params.id);
      if (!result) return res.status(404).json({ status: "error", message: "Post not found" });
      res.status(200).json({ status: "success", message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

module.exports = postController;
