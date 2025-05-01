const Post = require("./model");
const PostStat = require("./postStat");
const Category = require("../category/model");
const Tag = require("../tag/model");
const sequelize = require("../../databases/config");

const postRepository = {
  // ✅ Create Post + Create empty stats + set Tags (transactional)
  async create(data) {
    const transaction = await sequelize.transaction();

    try {
      // Step 1: Create the Post
      const post = await Post.create(data, { transaction });

      // Step 2: Create corresponding PostStat
      await PostStat.create({ post_id: post.id }, { transaction });

      // Step 3: Set tags if provided
      if (data.tag_ids) {
        let tag_ids = typeof data.tag_ids === "string" ? JSON.parse(data.tag_ids) : data.tag_ids;
        await post.setTags(tag_ids, { transaction });
      }

      await transaction.commit();
      return post;
    } catch (error) {
      console.error("Create Post failed:", error);
      await transaction.rollback();
      throw error;
    }
  },

  // ✅ Get all Posts + Stats + Tags + Category
  async getAll() {
    const { count, rows } = await Post.findAndCountAll({
      include: [
        { model: PostStat, as: "stats" },
        { model: Tag, as: "tags" },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"] // শুধু name চাইলে
        },
      ],
      order: [["id", "DESC"]],
    });
    return { data: rows, total: count };
  },

  // ✅ Get one Post by ID + Stats + Tags + Category
  async getById(id) {
    return await Post.findByPk(id, {
      include: [
        { model: PostStat, as: "stats" },
        { model: Tag, as: "tags" },
        // { model: Category, as: "category" },
      ]
    });
  },

  // ✅ Update Post Main Data + Tag syncing
  async update(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const post = await Post.findByPk(id, { transaction });
      if (!post) {
        await transaction.rollback();
        return null;
      }

      // Update post data
      await post.update(data, { transaction });

      // Update tags if provided
      if (data.tagIds && Array.isArray(data.tagIds)) {
        await post.setTags(data.tagIds, { transaction });
      }

      await transaction.commit();
      return post;
    } catch (error) {
      console.error("Update Post failed:", error);
      await transaction.rollback();
      throw error;
    }
  },

  // ✅ Update Post State (views, likes etc.)
  async updateState(post_id, data) {
    const postStat = await PostStat.findOne({ where: { post_id } });
    if (!postStat) return null;
    await postStat.update(data);
    return postStat;
  },

  // ✅ Delete Post + related Stat
  async delete(id) {
    const transaction = await sequelize.transaction();
    try {
      const post = await Post.findByPk(id, { transaction });
      if (!post) {
        await transaction.rollback();
        return null;
      }

      await PostStat.destroy({ where: { post_id: id }, transaction });
      await post.destroy({ transaction });
      await transaction.commit();
      return post;
    } catch (error) {
      console.error("Delete Post failed:", error);
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = postRepository;
