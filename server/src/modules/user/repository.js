const User = require("./models/User");
const Role = require("../role/model");

const userRepository = {
  async create(data) {
    try {
      return await User.create(data);
    } catch (error) {
      throw new Error(`Repository Error (create): ${error.message}`);
    }
  },

  async getAll() {
    try {
      const { count, rows } = await User.findAndCountAll({
        order: [["id", "ASC"]],
        include: [
          {
            model: Role,
            // as: "role",
            attributes: ["id", "name"],
          },
        ],
      });
      return { data: rows, total: count };
    } catch (error) {
      throw new Error(`Repository Error (getAll): ${error.message}`);
    }
  },

  async getById(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error(`Repository Error (getById): ${error.message}`);
    }
  },

  async getByQuery(query) {
    try {
      return await User.findOne({ where: query });
    } catch (error) {
      throw new Error(`Repository Error (getByQuery): ${error.message}`);
    }
  },

  async update(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");
      return await user.update(data);
    } catch (error) {
      throw new Error(`Repository Error (update): ${error.message}`);
    }
  },

  async delete(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(`Repository Error (delete): ${error.message}`);
    }
  },
};

module.exports = userRepository;
