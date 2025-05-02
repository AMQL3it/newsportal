const User = require("./model");

const userRepository = {
  async create(data) {
    return await User.create(data);
  },

  async getAll() {
    // const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      // offset,
      // limit: parseInt(limit),
      order: [["id", "ASC"]],
    });
    return { data: rows, total: count };
  },

  async getById(id) {
    return await User.findByPk(id);
  },

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(data);
    return user;
  },

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  },
};

module.exports = userRepository;
