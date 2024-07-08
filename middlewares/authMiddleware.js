import { verifyToken } from "../lib/utils.js";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const accesstoken = req.headers.authorization.split(' ')[1];
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

export default authMiddleware;
