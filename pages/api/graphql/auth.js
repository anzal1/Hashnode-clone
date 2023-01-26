const jwt = require("jsonwebtoken");
const User = require("../../../server/models/user.model.js");

const isAuth = async ({ req }) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      if (token === "undefined" || token === "null") {
        return null;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return null;
      }

      const user = await User.findById(decoded.id);

      if (!user?._id) return null;

      return user;
    }
    return null;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = isAuth;
