const bcrypt = require("bcrypt");
const userRepository = require("./repository");

const userService = {
  async create(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = {
      ...data,
      password: hashedPassword,
    };

    return await userRepository.create(newUser);
  },

  async getAll() {
    return await userRepository.getAll();
  },

  async getById(id) {
    return await userRepository.getById(id);
  },

  async update(id, data) {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    return await userRepository.update(id, data);
  },

  async deleteById(id) {
    return await userRepository.delete(id);
  },
};

module.exports = userService;
