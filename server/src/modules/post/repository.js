const Post = require("./model");

const postRepository = {
  async create(data) {
    return await Post.create(data);
  },

  async getAll() {
    // const offset = (page - 1) * limit;
    const { count, rows } = await Post.findAndCountAll({
      // offset,
      // limit: parseInt(limit),
      order: [["id", "ASC"]],
    });
    return { data: rows, total: count };
  },

  async getById(id) {
    return await Post.findByPk(id);
  },

  async update(id, data) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await post.update(data);
    return post;
  },

  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await post.destroy();
    return true;
  },
};

module.exports = postRepository;
