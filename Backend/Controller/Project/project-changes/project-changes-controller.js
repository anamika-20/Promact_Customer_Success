const project_changes = require("../../../Model/ProjectChanges.js");

const addProjectChanges = async (req, res) => {
    try {
      const { project_id } = req.params;
      const project_change = req.body;
      const response = await project_changes.create({ ...project_change });
      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(500).json({ message: "Error while Adding Project Changes" });
    }
  };