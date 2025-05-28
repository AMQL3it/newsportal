const { Op } = require("sequelize");
const Role = require("../role/model");
const User = require("./models/User");
const UserToken = require("./models/UserToken");

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
        attributes: { exclude: ["password"] },
        order: [["id", "ASC"]],
        include: [
          {
            model: Role,
            as: "role",
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

  async findByIdentifier(identifier) {
    try {
      return await User.findOne({
        where: {
          [Op.or]: [
            { phone: identifier },
            { email: identifier },
            { name: identifier },
          ],
        },
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      });
    } catch (error) {
      throw new Error(`Repository Error (findByIdentifier): ${error.message}`);
    }
  },

  async tokenCreate(data) {
    try {
      return await UserToken.create(data);
    } catch (error) {
      throw new Error(`Repository Error (tokenCreate): ${error.message}`);
    }
  },

  async tokenDestroy(token) {
    try {
      return await UserToken.destroy({ where: { token } });
    } catch (error) {
      throw new Error(`Repository Error (tokenDestroy): ${error.message}`);
    }
  },
};

module.exports = userRepository;
