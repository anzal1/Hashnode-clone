import { gql } from "@apollo/client";

const getPosts = gql`
  query GET_POSTS($input: LimitInput!) {
    getPosts(input: $input) {
      _id
      tags
      content
      commentsCount
      createdAt
      title
      likes {
        total
      }
      slug
      user {
        name
        username
        profile_photo {
          url
        }
      }
      cover_image {
        url
      }
    }
  }
`;

const getFollowedPosts = gql`
  query GET_FOLLOWED_Posts {
    getFollowedPosts {
      _id
      tags
      content
      commentsCount
      createdAt
      title
      likes {
        total
      }
      slug
      user {
        name
        username
        profile_photo {
          url
        }
      }
      cover_image {
        url
      }
    }
  }
`;

const getSinglePostBySlug = gql`
  query GET_POST_SLUG($input: SlugInput!) {
    getPostBySlug(input: $input) {
      error
      message
      success
      data {
        _id
        content
        createdAt
        subtitle
        cover_image {
          url
        }
        likes {
          thumbsup
          heart
          unicorn
          clap
          cheers
          love
          money
          trophy
          total
        }
        slug
        tags
        title
        commentsCount
        comments {
          _id
          comment
          createdAt
          user {
            _id
            email
            name
            username
            profile_photo {
              url
            }
          }
        }
        user {
          _id
          name
          username
          followers
          following
          username
          profile_photo {
            url
          }
        }
      }
    }
  }
`;

const getPostsByTag = gql`
  query GET_POSTS_TAG($tag: String!) {
    getPostsByTags(tag: $tag) {
      posts {
        _id
        commentsCount
        content
        cover_image {
          url
        }
        createdAt
        likes {
          total
        }
        slug
        tags
        title
        user {
          _id
          name
          username
          profile_photo {
            url
          }
        }
      }
      # details {
      #   _id
      #   name
      #   description
      #   articles
      #   followers
      #   logo {
      #     url
      #   }
      # }
    }
  }
`;

const getTrendingTags = gql`
  query GET_TAGS {
    getTrendingTags {
      _id
      name
      description
      articles
      logo {
        url
      }
    }
  }
`;

const getNewTags = gql`
  query GET_TAGS {
    getNewTags {
      _id
      name
      description
      articles
      logo {
        url
      }
    }
  }
`;

const getPostsByUser = gql`
  query GET_POSTS_USER($user: String!) {
    getPostsByUser(user: $user) {
      posts {
        _id
        content
        createdAt
        title
        slug
        user {
          name
          username
          profile_photo {
            url
          }
        }
        cover_image {
          url
        }
      }
      user {
        _id
        name
        followers
        following
        bio {
          about
        }
        skills
        profile_photo {
          url
        }
        username
      }
    }
  }
`;

const getUserActivites = gql`
  query GET_POSTS_USER($user: String!) {
    getPostsByUser(user: $user) {
      posts {
        _id
        createdAt
        title
        slug
      }
      user {
        _id
        name
        followers
        following
        createdAt
        cover_image {
          url
        }
        social {
          facebook
          twitter
          instagram
          linkedin
          youtube
          github
          stackoverflow
          website
        }
        bio {
          about
          available
        }
        skills
        tagline
        profile_photo {
          url
        }
        username
      }
    }
  }
`;

const getTrendingBlogs = gql`
  query TRENDING_POSTS($input: LimitInput!) {
    getTrendingBlogs(input: $input) {
      _id
      tags
      content
      commentsCount
      createdAt
      title
      likes {
        total
      }
      slug
      user {
        name
        username
        profile_photo {
          url
        }
      }
      cover_image {
        url
      }
    }
  }
`;

const GET_SEARCHED_POST = gql`
  query SERACH_POST($search: String!) {
    getSearchedPosts(search: $search) {
      _id
      tags
      content
      commentsCount
      createdAt
      title
      likes {
        total
      }
      slug
      user {
        name
        username
        profile_photo {
          url
        }
      }
      cover_image {
        url
      }
    }
  }
`;

const getAllTags = gql`
  query GET_ALL_TAGS {
    getAllTags {
      _id
      name
      description
      articles
      logo {
        url
      }
    }
  }
`;

const getOtherTags = gql`
  query GET_OTHER_TAGS {
    getOtherTags {
      _id
      name
      description
      articles
      logo {
        url
      }
    }
  }
`;

const searchTagQuery = gql`
  query SEARCH_TAGS($tag: String!) {
    searchTag(tag: $tag) {
      _id
      name
      followers
      followersCount
      articles
      description
      logo {
        url
      }
    }
  }
`;

const GET_USER_STATUS = gql`
  query GET_USER {
    getUser {
      error
      success
      user {
        _id
        followers
        following
        name
        username
        skills
        createdAt
        tagline
        profile_photo {
          url
        }
        cover_image {
          url
        }
      }
    }
  }
`;

const getUserByUsername = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      error
      success
      user {
        _id
        followers
        following
        name
        username
        tagline
        bio {
          available
          about
        }
        createdAt
        skills
        profile_photo {
          url
        }
        cover_image {
          url
        }
      }
    }
  }
`;

const GET_BOOKMARKS_OF_BARS = gql`
  query GET_MANY_POSTS($ids: [String!]!) {
    getManyPosts(ids: $ids) {
      _id
      title
      slug
      user {
        name
        username
      }
      content
    }
  }
`;

const GET_BOOKMARKS = gql`
  query GET_MANY_POSTS($ids: [String!]!) {
    getManyPosts(ids: $ids) {
      _id
      commentsCount
      createdAt
      slug
      title
      content
      likes {
        total
      }
      cover_image {
        url
      }
      tags
      user {
        username
        name
        profile_photo {
          url
        }
      }
    }
  }
`;

const GET_USER = gql`
  query GET_USER {
    getUser {
      error
      success
      user {
        _id
        createdAt
        bio {
          about
          available
        }
        email
        name
        profile_photo {
          url
        }
        cover_image {
          url
        }
        skills
        tagline
        username
        followers
        following
        social {
          facebook
          github
          instagram
          linkedin
          stackoverflow
          twitter
          website
          youtube
        }
      }
    }
  }
`;

const GET_ALL_MESSAGES = gql`
  query GET_ALL_MESSAGES($input: LimitInput!) {
    getAllMessages(input: $input) {
      _id
      content
      createdAt
      user {
        username
        name
        profile_photo {
          url
        }
      }
    }
  }
`;

const getFollowedTags = gql`
  query GET_FOLLOWED_TAGS {
    getFollowedTags {
      _id
      name
      description
      articles
      logo {
        url
      }
    }
  }
`;

export {
  getPosts,
  getSinglePostBySlug,
  getPostsByTag,
  getTrendingTags,
  getNewTags,
  getPostsByUser,
  getTrendingBlogs,
  GET_SEARCHED_POST,
  getAllTags,
  getOtherTags,
  searchTagQuery,
  GET_USER_STATUS,
  GET_BOOKMARKS_OF_BARS,
  GET_BOOKMARKS,
  GET_USER,
  getUserByUsername,
  getFollowedPosts,
  getFollowedTags,
  getUserActivites,
  GET_ALL_MESSAGES,
};
