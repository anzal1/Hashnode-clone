const PostQuery = require("./posts.query.js");
const TagQuery = require("./tags.query.js");
const UserQuery = require("./user.query.js");

const UserMutation = require("./user.mutation.js");
const PostMutation = require("./posts.mutation.js");
const TagMutation = require("./tags.mutation.js");

const res = {
  Query: {
    ...UserQuery,
    ...PostQuery,
    ...TagQuery,
  },

  Mutation: {
    ...UserMutation,
    ...PostMutation,
    ...TagMutation,
  },
};

module.exports = res;
