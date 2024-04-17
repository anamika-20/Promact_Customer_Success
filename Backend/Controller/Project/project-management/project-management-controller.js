const project = require("../../../Model/project.js"); // Importing Project model
const audit_history = require("../../../Model/audit-history.js"); // Importing Audit History model
const version_history = require("../../../Model/version-history.js"); // Importing Version History model
const sprint_details = require("../../../Model/sprint-details.js"); // Importing Sprint Details model
const stakeholders = require("../../../Model/stakeholders.js"); // Importing Stakeholders model
const phases = require("../../../Model/phases.js"); // Importing Phases model
const escalation_matrix = require("../../../Model/escalation-matrix.js"); // Importing Escalation Matrix model
const risk_profiling = require("../../../Model/risk-profiling.js"); // Importing Risk Profiling model
const resources = require("../../../Model/resources.js");
const client_feedback = require("../../../Model/client-feedback.js");
const edit_requests = require("../../../Model/edit-requests.js");
const project_updates = require("../../../Model/project-updates.js");
const mom = require("../../../Model/moms.js");
const approved_team = require("../../../Model/approved-team.js");

// Function to add a new project
const addProject = async (req, res) => {
  try {
    // Create a new project using data from the request body
    const response = await project.create({ ...req.body });
    // Send success response
    res.status(200).json({ message: "Project Added Successfully" });
  } catch (error) {
    // If an error occurs, send error response
    res.status(500).json({ message: "Error while Adding Project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { project_id } = req.params;

    const schemas = [
      edit_requests,
      project_updates,
      mom,
      approved_team,
      client_feedback,
      resources,
      risk_profiling,
      escalation_matrix,
      phases,
      stakeholders,
      sprint_details,
      version_history,
      audit_history,
    ];

    for (let i = 0; i < schemas.length; i++) {
      const response = await schemas[i].deleteMany({ project_id: project_id });
    }

    const projectDeleteResponse = await project.deleteOne({ _id: project_id });

    res.status(200).json({ message: "Project Deleted Successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error while deleting the Project" });
  }
};

module.exports = { addProject, deleteProject };
