# Hashnode Clone (Full Stack)

Hashnode clone Nextjs, Mongodb, Apollo-graphql, Express.

This is a complete repository of hashnode clone which I made while learning MERN stack.

## Core Packages

1. Nextjs - Frontend
2. Apollo graphql, express - Backend
3. Api Handling - Axios
4. Styling - tailwindcss
5. Delayed Search - loadash debounce
6. Image upload - Cloudinary

## Features

1. Authentication
2. CRUD for posts
3. CRUD for user
4. CRUD for tags
5. Infinite scrolling
6. Search any posts by username, title, tags
7. Follow/Unfollow users
8. Follow/Unfollow tags
9. Like (many emoji) posts
10. Comment posts
11. Light/Dark theme (dark is default)
12. Add bookmarks

## Running Locally

Clone this repository:

```
git clone https://github.com/ujen5173/Hashnode.git hashnode-clone
```

At the root of your project create an .env file with the following contents:

```
NEXT_PUBLIC_MONGODBURI=<YOUR_MONGODB_URL>
JWT_SECRET=<SECRET_FOR_JWT>
cloud_name=<CLOUNDINARY_NAME>
api_key=<CLOUNDINARY_API_KEY>
api_secret=<CLOUNDINARY_API_SECRET>
```

Then run `yarn` and `yarn d` to see the hashnode clone in action.

I hope you liked this project. If you do then don't forget to give this repo a star

Cheers 🍻
