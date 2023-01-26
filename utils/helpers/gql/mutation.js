import { gql } from "@apollo/client";

const POST_QUERY = gql`
  mutation CREATE_POST($input: CreatePostInput!) {
    createPost(input: $input) {
      message
      success
      error
    }
  }
`;

const UPLOAD_QUERY = gql`
  mutation UPLOAD_IMAGE($file: Upload!) {
    uploadImage(file: $file) {
      cloud_id
      url
    }
  }
`;

const CREATE_TAG_QUERY = gql`
  mutation CREATE_TAG($input: CreateTagInput!) {
    createTag(input: $input) {
      error
      success
      message
    }
  }
`;
const CREATE_USER = gql`
  mutation CREATE_USER($input: RegisterUserInput!) {
    registerUser(input: $input) {
      message
      success
      error
    }
  }
`;
const LOGIN_USER = gql`
  mutation LOGIN_USER($input: LoginUserInput!) {
    loginUser(input: $input) {
      error
      success
      message
    }
  }
`;
const FOLLOW_USER = gql`
  mutation FOLLOW_USER($input: FollowUserInput!) {
    followUser(input: $input) {
      error
      message
      success
    }
  }
`;

const PUBLISH_COMMENT = gql`
  mutation COMMENT($input: CommentInput!) {
    commentOnPost(input: $input) {
      error
      message
      success
      data {
        commentsCount
        comments {
          _id
          comment
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
    }
  }
`;

const EDIT_DATA_QUERY = gql`
  query EDIT_DATA_QUERY($input: SlugInput!) {
    getPostBySlug(input: $input) {
      data {
        content
        title
        _id
        subtitle
        tags
        cover_image {
          url
        }
      }
    }
  }
`;

const EDIT_POST = gql`
  mutation EDIT_POST($input: UpdatePostInput!) {
    updatePost(input: $input) {
      error
      message
      success
    }
  }
`;

const UPDATE_USER = gql`
  mutation UPDATE_USER($input: UpdateUserInput!) {
    updateUser(input: $input) {
      error
      message
      success
    }
  }
`;

const FOLLOW_TAG_QUERY = gql`
  mutation FOLLOW_TAG($input: FollowTagInput!) {
    followTag(input: $input) {
      error
      message
      success
      data {
        followers
      }
    }
  }
`;

const LIKE_POST = gql`
  mutation LIKE($input: LikeInput!) {
    likePost(input: $input) {
      message
      error
      success
      updated {
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
    }
  }
`;

const DELETE_POST = gql`
  mutation DELETE_POST($input: DeletePostInput!) {
    deletePost(input: $input) {
      error
      message
      success
    }
  }
`;

export {
  POST_QUERY,
  UPLOAD_QUERY,
  CREATE_TAG_QUERY,
  CREATE_USER,
  LOGIN_USER,
  FOLLOW_USER,
  PUBLISH_COMMENT,
  EDIT_DATA_QUERY,
  EDIT_POST,
  UPDATE_USER,
  FOLLOW_TAG_QUERY,
  LIKE_POST,
  DELETE_POST,
};
