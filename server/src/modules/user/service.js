const bcrypt = require("bcrypt");
const userRepository = require("./repository");

const userService = {
  async create(data) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      return await userRepository.create({ ...data, password: hashedPassword });
    } catch (error) {
      throw new Error(`Service Error (create): ${error.message}`);
    }
  },

  async getAll() {
    try {
      return await userRepository.getAll();
    } catch (error) {
      throw new Error(`Service Error (getAll): ${error.message}`);
    }
  },

  async getById(id) {
    try {
      return await userRepository.getById(id);
    } catch (error) {
      throw new Error(`Service Error (getById): ${error.message}`);
    }
  },

  async getByQuery(query) {
    try {
      return await userRepository.getByQuery(query);
    } catch (error) {
      throw new Error(`Service Error (getByQuery): ${error.message}`);
    }
  },

  async update(id, data) {
    try {
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }
      return await userRepository.update(id, data);
    } catch (error) {
      throw new Error(`Service Error (update): ${error.message}`);
    }
  },

  async deleteById(id) {
    try {
      return await userRepository.delete(id);
    } catch (error) {
      throw new Error(`Service Error (deleteById): ${error.message}`);
    }
  },
};

module.exports = userService;
