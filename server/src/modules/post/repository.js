const Post = require("./models/Post");
const PostState = require("./models/PostState");
const Category = require("../category/model");
const Tag = require("../tag/model");
const PostTag = require("../junctions/PostTag");
const Comment = require("../comment/model");
const User = require("../user/models/User");

const { sequelize } = require("../../config");

const postRepository = {
  // ✅ Create Post + Create empty stats + set Tags (transactional)
  async create(data) {
    const transaction = await sequelize.transaction();

    try {
      // Step 1: Create the Post
      const post = await Post.create(data, { transaction });

      // Step 2: Create corresponding PostStat
      await PostState.create({ post_id: post.id }, { transaction });

      // Step 3: Set tags if provided
      if (data.tag_ids) {
        let tag_ids =
          typeof data.tag_ids === "string"
            ? JSON.parse(data.tag_ids)
            : data.tag_ids;
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
        { model: PostState, as: "state" }, // যদি associations.js-এ `as: "state"` থাকে
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] }, // remove PostTag junction data
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"], // শুধুমাত্র id, name আনছে
        },
        {
          model: Comment,
          as: "comments",
        },
      ],
      order: [["id", "DESC"]],
    });

    return { data: rows, total: count };
  },

  async getAllByCategory(cat_id) {
    try {
      const where = {};

      // তোমার মূল Post filtering এখানে থাকলে সেটাও যোগ করো
      // যেমনঃ if (query.status) where.status = query.status;

      const { count, rows } = await Post.findAndCountAll({
        where,
        include: [
          { model: PostState, as: "state" },
          {
            model: Tag,
            as: "tags",
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
            ...(cat_id && {
              where: {
                id: parseInt(cat_id),
              },
            }),
          },
          {
            model: Comment,
            as: "comments",
          },
        ],
        order: [["id", "DESC"]],
      });

      return { data: rows, total: count };
    } catch (error) {
      console.error("Error fetching Posts by query:", error.message);
      throw error;
    }
  },

  // ✅ Get one Post by ID + Stats + Tags + Category
  async getById(id) {
    return await Post.findByPk(id, {
      attributes: [
        "id",
        "title",
        "type",
        "media",
        "content",
        "image",
        "createdAt",
        "author",
      ],

      include: [
        {
          model: PostState,
          as: "state",
          attributes: ["views", "likes"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] }, // remove PostTag junction data
        },
        {
          model: Category,
          as: "category",
          attributes: ["name"], // only show category name
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment", "parent_id", "is_active", "createdAt"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
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
    const postState = await PostState.findOne({ where: { post_id } });
    if (!postState) return null;
    await postState.update(data);
    return postState;
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

      await PostState.destroy({ where: { post_id: id }, transaction });
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
