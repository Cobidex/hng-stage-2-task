const { Op } = require("sequelize");
const Organisation = require("../models/organisationModel");
const User = require("../models/userModel.js");

const getOrganisation = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { userId } = req.user.toJSON();

    const org = await Organisation.findOne({
      where: { orgId },
      include: {
        model: User,
        attributes: [],
        through: { attributes: [] },
        where: { userId },
        required: true,
      },
    });

    if (!org)
      return res.status(404).json({
        status: "Not Found",
        message: "Organisation id not exist or you dont have access to it",
      });

    return res.status(200).json({
      status: "success",
      message: "Organisation data",
      data: org.toJSON(),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "internal server error" });
  }
};

const createOrganisation = async (req, res) => {
  try {
    const org = await Organisation.create({ ...req.body });
    await org.addUser(req.user);
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
    const { userId } = req.user.toJSON();
    const organisations = await Organisation.findAll({
      include: {
        model: User,
        attributes: [],
        through: { attributes: [] },
        where: { userId },
        required: true,
      },
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addUserToOrganisation = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { userId } = req.body;

    const user = await User.findOne({ where: { userId } });

    if (!user)
      return res
        .status(400)
        .json({ status: "unsuccessful", message: "user does not exist" });

    const organisation = await Organisation.findOne({
      where: { orgId },
      include: {
        model: User,
        attributes: [],
        where: {
          userId: {
            [Op.not]: userId,
          },
        },
        through: { attributes: [] },
        required: true,
      },
    });

    if (!organisation)
      return res.status(404).json({
        status: "Not found",
        message: "organisation not found or user already belongs to it",
        statusCode: 400,
      });

    await organisation.addUser(user);
    return res.status(200).json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  createOrganisation,
  getUserOrganisations,
  getOrganisation,
  addUserToOrganisation,
};
