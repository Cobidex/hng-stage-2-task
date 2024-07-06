const { verifyToken } = require("../lib/utils");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const { accesstoken } = req.headers;
    const { userId } = verifyToken(accesstoken);
    const user = await User.findOne({ where: { userId } });
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      status: "unauthorized",
      message: "Please log in",
      statusCode: 401,
    });
  }
};

module.exports = authMiddleware;
