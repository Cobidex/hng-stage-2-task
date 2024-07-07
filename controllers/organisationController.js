const Organisation = require("../models/organisationModel");
const User = require("../models/userModel.js");

const getOrganisation = async (req, res) => {
  try {
    const { orgId } = req.params;
    const me = req.user;
    let org = await Organisation.findOne({
      where: { orgId },
      include: User,
    });

    if (!org)
      return res.status(400).json({
        status: "Bad Request",
        message: "Client error",
        statusCode: 400,
      });

    const { Users } = org.toJSON();

    Users.forEach((user) => {
      if (user.userId === me.userId) {
        const filtered = org.toJSON().Users.map((u) => {
          delete u.password;
          delete u.UserOrganisation
          return u;
        });
        org = org.toJSON();
        org.Users = filtered;
        return res.status(200).json({
          status: "success",
          message: "Organisation retrieved",
          data: org,
        });
      }
    });

    return res.status(200).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "internal server error" })
  }
};

const createOrganisation = async (req, res) => {
  try {
    const org = await Organisation.create({ ...req.body });
    await org.addUser(req.user, { through: { selfGranted: false } });
    return res.status(201).json({
      status: "success",
      message: "Organisation created successfully",
      data: org.toJSON(),
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

const getUserOrganisations = async (req, res) => {
  try {
    const user = req.user.toJSON();
    const { Organisations } = await User.findOne({
      where: { userId: user.userId },
      include: Organisation,
    });

    const organisations = Organisations.map((org) => {
      const obj = org.toJSON();
      delete obj.UserOrganisation;
      return obj;
    });
    return res.status(200).json({
      status: "success",
      message: "List of organisations",
      data: {
        organisations,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" })
  }
};

const addUserToOrganisation = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { userId } = req.body;

    const user = await User.findOne({ where: { userId } });

    const organisation = await Organisation.findOne({
      where: { orgId },
      include: User,
    });

    if (!organisation)
      return res.status(404).json({
        status: "Not found",
        message: "organisation not found",
        statusCode: 400,
      });

    const { Users } = organisation.toJSON();

    Users.forEach((user) => {
      if (user.userId === userId)
        return res.status(400).json({
          status: "Bad Request",
          message: "User already belongs to this organisation",
          statusCode: 400,
        });
    });

    await organisation.addUser(user, { through: { selfGranted: false } });
    return res.status(200).json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (e) {}
};

module.exports = {
  createOrganisation,
  getUserOrganisations,
  getOrganisation,
  addUserToOrganisation,
};
