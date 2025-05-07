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

  async findByIdentifier(identifier) {
    try {
      return await userRepository.findByIdentifier(identifier);
    } catch (error) {
      throw new Error(`Service Error (findByIdentifier): ${error.message}`);
    }
  },

  async tokenCreate(data) {
    try {
      return await userRepository.tokenCreate(data);
    } catch (error) {
      throw new Error(`Service Error (tokenCreate): ${error.message}`);
    }
  },

  async tokenDestroy(token) {
    try {
      return await userRepository.tokenDestroy(token);
    } catch (error) {
      throw new Error(`Service Error (tokenDestroy): ${error.message}`);
    }
  },
};

module.exports = userService;
