const User = require("../models/userModel");
const { getAuthToken, checkPassword } = require("../lib/utils");
const Organisation = require("../models/organisationModel");

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const errors = [];

    if (!email) errors.push({ field: "email", message: "email missing" });
    if (!password)
      errors.push({ field: "password", message: "password missing" });
    if (!firstName)
      errors.push({ field: "firstName", message: "firstName missing" });
    if (!lastName)
      errors.push({ field: "lastName", message: "lastName missing" });
    if (!phone) errors.push({ field: "phone", message: "phone missing" });
    if (errors.length > 0) return res.status(422).json({ errors });

    const user = await User.create({ ...req.body });
    const org = await Organisation.create({ name: `${firstName}'s Organisation` });
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
    return res.status(404).json({
      status: "Bad request",
      message: "Registration unsuccessful",
      statusCode: 400,
    });
  }
};

const login = async (req, res) => {
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

module.exports = {
  register,
  login,
};
