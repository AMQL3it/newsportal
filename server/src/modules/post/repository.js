const Post = require("./model");
const PostStat = require("./postStat");

const postRepository = {
  // ✅ Create Post + Create empty stats
  async create(data) {
    const post = await Post.create(data);
    await PostStat.create({ post_id: post.id }); // নতুন পোস্ট হলে স্ট্যাট ও বানাবো
    return post;
  },

  // ✅ Get all Posts + Stats
  async getAll() {
    const { count, rows } = await Post.findAndCountAll({
      include: [
        { model: PostStat, as: "stats" }
      ],
      order: [["id", "ASC"]],
    });
    return { data: rows, total: count };
  },

  // ✅ Get one Post by ID + Stats
  async getById(id) {
    return await Post.findByPk(id, {
      include: [
        { model: PostStat, as: "stats" }
      ]
    });
  },

  // ✅ Update Post Main Data
  async update(id, data) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await post.update(data);
    return post;
  },

  // ✅ Update Post State (views, likes etc.)
  async updateState(post_id, data) {
    const postStat = await PostStat.findOne({ where: { post_id } });
    if (!postStat) return null;
    await postStat.update(data);
    return postStat;
  },

  // ✅ Delete Post + related Stat (cascade already works but manual safe)
  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await PostStat.destroy({ where: { post_id: id } }); // first delete stat
    await post.destroy(); // then delete post
    return true;
  },
};

module.exports = postRepository;
