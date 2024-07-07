import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(error.message, 500);
  }
};

export const getAuthToken = (payload) => {
  const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return authToken;
};

export const checkPassword = async (candidatePassword, truePassword) => {
  try {
    return bcrypt.compare(candidatePassword, truePassword);
  } catch (error) {
    throw new Error(error.message, 500);
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token", 401);
  }
};

