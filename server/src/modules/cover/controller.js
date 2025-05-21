const coverService = require("./service");

const coverController = {
  async create(req, res) {
    try {
      const cover = await coverService.create(req.body);
      res.status(201).json({ status: "success", data: cover });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      // const page = parseInt(req.query.page) || 1;
      // const limit = parseInt(req.query.limit) || 10;
      // const offset = (page - 1) * limit;

      const result = await coverService.getAll();

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      console.error("Error in getAllCategories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getById(req, res) {
    try {
      const cover = await coverService.getById(req.params.id);
      if (!cover)
        return res
          .status(404)
          .json({ status: "error", message: "Cover info not found" });
      res.status(200).json({ status: "success", data: cover });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async update(req, res) {
    try {
      const cover = await coverService.update(req.params.id, req.body);
      if (!cover)
        return res
          .status(404)
          .json({ status: "error", message: "Cover info not found" });
      res.status(200).json({ status: "success", data: cover });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

module.exports = coverController;
