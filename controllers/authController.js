import User from "../models/userModel.js";
import { getAuthToken, checkPassword } from "../lib/utils.js";
import Organisation from "../models/organisationModel.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, password, email, phone } = req.body;
    const user = await User.create({ firstName, lastName, password, email, phone });
    const org = await Organisation.create({
      name: `${firstName}'s Organisation`,
    });
    await org.addUser(user, { through: { selfGranted: false } });

    const accessToken = getAuthToken({ userId: user.id });

    return res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken,
        user: user.toJSON(),
      },
    });
  } catch (e) {
    const errors = [];
    if (e.name === "SequelizeValidationError") {
      e.errors.forEach((err) =>
        errors.push({ field: err.path, message: err.message })
      );
      return res.status(422).json({ errors });
    }
    return res.status(404).json({
      status: "Bad request",
      message: "Registration unsuccessful",
      statusCode: 400,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
        statusCode: 401,
      });
    const match = await checkPassword(password, user.password);

    if (!match)
      return res.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
        statusCode: 401,
      });

    const accessToken = getAuthToken({ userId: user.userId });
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken,
        user: user.toJSON(),
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      status: "Bad request",
      message: "Authentication failed",
      statusCode: 401,
    });
  }
};
