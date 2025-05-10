const Tag = require("./model");

const tagRepository = {
  async create(data) {
    return await Tag.create(data);
  },

  async getAll() {
    // const offset = (page - 1) * limit;
    const { count, rows } = await Tag.findAndCountAll({
      // offset,
      // limit: parseInt(limit),
      order: [["id", "ASC"]],
    });
    return { data: rows, total: count };
  },

  async getById(id) {
    return await Tag.findByPk(id);
  },

  async getByQuery(query) {
    return await Tag.findOne({ where: query });
  },

  async update(id, data) {
    const tag = await Tag.findByPk(id);
    if (!tag) return null;
    await tag.update(data);
    return tag;
  },

  async delete(id) {
    const tag = await Tag.findByPk(id);
    if (!tag) return null;
    await tag.destroy();
    return true;
  },
};

module.exports = tagRepository;
