const edit_requests = require("../../../Model/edit-requests.js");

const getProjectEditRequest = async (req, res) => {
  try {
    const { project_id } = req.params;
    const response = await edit_requests.find({ project_id: project_id });
    res.status(200).json({ data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while getting Project Edit Request" });
  }
};

module.exports = { getProjectEditRequest };
