const Post = require("../../../../server/models/post.model.js");
const Tag = require("../../../../server/models/tags.model.js");
const isAuth = require("../auth.js");

const mutation = {
  createTag: async (_, { input }) => {
    const { name } = input;

    const articlesWithTag = await Post.find({
      tags: { $in: [name] },
    });

    const tagExist = await Tag.findOne({ name });

    if (tagExist) {
      return {
        success: false,
        message: "Tag already exist",
        error: true,
      };
    }

    const tag = new Tag({
      ...input,
      articles: articlesWithTag.length,
    });

    await tag.save();

    return {
      message: "Success",
      success: true,
      error: false,
    };
  },

  followTag: async (_, { input }, ctx) => {
    const { name } = input;
    const user = await isAuth(ctx);

    if (!user) {
      return {
        success: false,
        message: "You are not logged in",
        error: true,
        data: null,
      };
    }

    const tag = await Tag.findOne({ name });

    if (!tag) {
      return {
        message: "Tag not found",
        success: false,
        error: true,
        data: null,
      };
    }

    const isFollowed = tag.followers.includes(user._id);

    if (isFollowed) {
      tag.followers.pull(user._id);
      tag.followersCount -= 1;
      tag.save();
      return {
        message: "Unfollowed",
        success: true,
        error: false,
        data: tag,
      };
    } else {
      tag.followers.push(user._id);
      tag.followersCount += 1;
      tag.save();
      return {
        message: "Followed",
        success: true,
        error: false,
        data: tag,
      };
    }
  },
};

module.exports = mutation;
