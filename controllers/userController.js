import Organisation from "../models/organisationModel.js";
import User from "../models/userModel.js";

const getUserRecord = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (userId === req.params.id) {
      return res.status(200).json({
        status: "success",
        message: "User data",
        data: req.user.toJSON(),
      });
    }

    const client = await User.findOne({
      where: { userId: req.params.id },
      include: Organisation,
    });

    if (!client) {
      return res.status(404).json({
        status: "error",
        message: "Client not found",
      });
    }

    const user = await findOne({
      where: { userId },
      include: Organisation,
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const clientOrgIds = client.Organisations.map((org) => org.orgId);
    const userOrgIds = user.Organisations.map((org) => org.orgId);

    const commonOrgId = clientOrgIds.find((orgId) =>
      userOrgIds.includes(orgId)
    );

    if (commonOrgId) {
      const data = user.toJSON();
      delete data.Organisations;
      return res.status(200).json({
        status: "success",
        message: "User data",
        data,
      });
    }

    return res.status(403).json({
      status: "Unauthorized",
      message: "You cannot access this user's info",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getUserRecord;
