const Category = require("./model");
const Tag = require("../tag/model");

const categoryRepository = {
  async create(data) {
    return await Category.create(data);
  },

  async getAll() {
    const { count, rows } = await Category.findAndCountAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Tag,
          as: "tags", // association name
          through: { attributes: [] }, // category_tag table data exclude
          attributes: ["id", "name", "slug", "is_active"],
        },
      ],
    });
    return { data: rows, total: count };
  },
  

  async getById(id) {
    return await Category.findByPk(id, {
      include: [
        {
          model: Tag,
          as: "tags", // association name
          through: { attributes: [] }, // category_tag table data exclude
          attributes: ["id", "name", "slug", "is_active"],
        },
      ],
    });
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

  async addTag(categoryId, tagId) {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error("Category not found");

    await category.addTag(tagId); // Sequelize magic method
    return true;
  },

  async removeTag(categoryId, tagId) {
    const category = await Category.findByPk(categoryId);
    if (!category) return null;
    await category.removeTag(tagId);
    return true;
  },
};

module.exports = categoryRepository;
