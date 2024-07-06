const getUserRecord = async (req, res) => {
  try {
    const user = req.user.toJSON();
    return res.status(200).json({
      status: "success",
      message: "Data Retrieved",
      data: user,
    });
  } catch (e) {}
};

module.exports = {
  getUserRecord,
};
