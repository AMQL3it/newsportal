const Category = require("./model");

const categoryRepository = {
  async create(data) {
    return await Category.create(data);
  },

  async getAll() {
    // const offset = (page - 1) * limit;
    const { count, rows } = await Category.findAndCountAll({
      // offset,
      // limit: parseInt(limit),
      order: [["id", "ASC"]],
    });
    return { data: rows, total: count };
  },

  async getById(id) {
    return await Category.findByPk(id);
  },

  async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    await category.update(data);
    return category;
  },

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    await category.destroy();
    return true;
  },
};

module.exports = categoryRepository;
