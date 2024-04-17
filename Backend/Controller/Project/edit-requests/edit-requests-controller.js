const edit_requests = require("../../../Model/EditRequests.js");

const getEditRequest = async (req, res) => {
  try {
    const { user_id } = req.params;
    const response = await edit_requests.find({ user_id: user_id });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Edit Request" });
  }
};

const alterEditRequest = async (req, res) => {
  try {
    const data = req.body[0];
    const response = await edit_requests.updateOne(
      { _id: data._id },
      { $set: data },
      { upsert: true }
    );
    res.status(200).json({ message: "Request Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Edit Request" });
  }
};

module.exports = { getEditRequest, alterEditRequest };
