const Tag = require("../../../../server/models/tags.model.js");
const isAuth = require("../auth.js");

const queries = {
  getTrendingTags: async (_) => {
    const tags = await Tag.find({})
      .sort({ articles: -1, followers: -1 })
      .limit();
    return tags;
  },
  getNewTags: async () => {
    const tags = await Tag.find({}).sort({ createdAt: -1 }).limit(6);
    return tags;
  },
  getAllTags: async () => {
    const tags = await Tag.find({}).limit(18);
    return tags;
  },
  searchTag: async (_, { tag }) => {
    const tags = await Tag.findOne({ name: tag });
    return tags;
  },
  getFollowedTags: async (_, __, ctx) => {
    const user = await isAuth(ctx);

    if (user) {
      const tags = await Tag.find({
        followers: user._id,
      })
        .sort({ createdAt: -1 })
        .limit(6);

      return tags;
    } else {
      return [];
    }
  },
};

module.exports = queries;
