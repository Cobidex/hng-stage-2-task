const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(error.message, 500);
  }
};

const getAuthToken = (payload) => {
  const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return authToken;
};

const checkPassword = async (candidatePassword, truePassword) => {
  try {
    return bcrypt.compare(candidatePassword, truePassword);
  } catch (error) {
    throw new Error(error.message, 500);
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token", 401);
  }
};

module.exports = {
  hashPassword,
  getAuthToken,
  checkPassword,
  verifyToken
};
