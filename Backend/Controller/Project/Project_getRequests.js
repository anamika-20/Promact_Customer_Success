// Importing required models and utility functions
const project = require("../../Model/Project.js"); // Importing Project model
const audit_history = require("../../Model/Audit_History.js"); // Importing Audit History model
const version_history = require("../../Model/Version_History.js"); // Importing Version History model
const sprint_details = require("../../Model/Sprint_Details.js"); // Importing Sprint Details model
const stakeholders = require("../../Model/Stakeholders.js"); // Importing Stakeholders model
const phases = require("../../Model/Phases.js"); // Importing Phases model
const escalation_matrix = require("../../Model/Escalation_Matrix.js"); // Importing Escalation Matrix model
const risk_profiling = require("../../Model/Risk_Profiling.js"); // Importing Risk Profiling model
const { reorderArrayOfObject } = require("../../Utilities/utility.js"); // Importing utility function for reordering arrays of objects
const resources = require("../../Model/Resources.js");
const client_feedback = require("../../Model/Client_Feedback.js");



const edit_requests = require("../../Model/EditRequests.js");

// Function to fetch projects associated with a user
const getUserProjects = async (req, res) => {
  try {
    // Destructuring user_id and role from request query parameters
    const { id: user_id, role } = req.query;
    let response = [];
    // Check if the user is an Admin or Auditor
    if (role === "Admin" || role === "Auditor") {
      // If Admin or Auditor, fetch all projects
      response = await project.find({});
    } else if (role === "Client") {
      let client_projects = await stakeholders.find({ _id: user_id });
      client_projects = client_projects.map((project) => project.project_id);
      response = await project.find({
        _id: { $in: client_projects },
      });
    } else {
      // If not Admin or Auditor, fetch projects associated with the user
      response = await project.find({
        "associated_manager._id": user_id, // Check if user is associated with manager's _id
      });
    }
    // Send response with fetched projects
    res.status(200).json({ data: response });
  } catch (error) {
    // If an error occurs, send error response
    res.status(500).json({ message: "Error while Getting User projects" });
  }
};



// Function to fetch version history
const getVersionHistory = async (req, res) => {
  try {
    const { id } = req.params;

    // Default structure for version history in case no data is found
    const default_version_history = [
      {
        project_id: id,
        version: "",
        type: "",
        change: "",
        change_reason: "",
        created_by: "",
        revision_date: "",
        approval_date: "",
        approved_by: "",
        edited_by: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await version_history.find({ project_id: id }); // Finding version history data from the database

    // Checking if any data is found
    if (data.length === 0) {
      data = default_version_history; // Setting default version history structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_version_history); // Reordering version history data
    }

    res.status(200).json({ data: data }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Version History" }); // Sending error response if any occurs during fetching
  }
};



// Function to fetch stakeholders data
const getStakeholders = async (req, res) => {
  try {
    const { id } = req.params;

    // Default structure for stakeholders in case no data is found
    const default_stakeholders = [
      {
        project_id: id,
        title: "",
        name: "",
        email: "",
        edited_by: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await stakeholders.find({ project_id: id }); // Finding stakeholders data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_stakeholders; // Setting default stakeholders structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_stakeholders); // Reordering stakeholders data
    }

    res.status(200).json({ data: data }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Stakeholders" }); // Sending error response if any occurs during fetching
  }
};



// Function to fetch risk profiling data
const getRiskProfiling = async (req, res) => {
  try {
    const { id } = req.params;

    // Default structure for risk profiling in case no data is found
    const default_risk_profiling = [
      {
        project_id: id,
        risk_type: "",
        description: "",
        severity: "",
        impact: "",
        remedial_steps: "",
        status: "",
        closure_date: "",
        edited_by: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await risk_profiling.find({ project_id: id }); // Finding risk profiling data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_risk_profiling; // Setting default risk profiling structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_risk_profiling); // Reordering risk profiling data
    }
    res.status(200).json({ data: data }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Risk Profiling" }); // Sending error response if any occurs during fetching
  }
};



// Function to fetch sprint details
const getSprintDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Default structure for sprint details in case no data is found
    const default_sprint_details = [
      {
        project_id: id,
        sprint: "",
        start_date: "",
        end_date: "",
        status: "",
        comments: "",
        edited_by: "",
        _id: "",
      },
    ];

    let data = await sprint_details.find({ project_id: id }); // Finding sprint details data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_sprint_details; // Setting default sprint details structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_sprint_details); // Reordering sprint details data
    }

    res.status(200).json({ data: data }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Sprint Details" }); // Sending error response if any occurs during fetching
  }
};













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

module.exports = {
  // Functions to retrieve data
  getProjectDetails, // Retrieves project details
  getVersionHistory, // Retrieves version history
  getAuditHistory, // Retrieves audit history
  getSprintDetails, // Retrieves sprint details
  getPhases, // Retrieves phases
  getRiskProfiling, // Retrieves risk profiling data
  getEscalationMatrix, // Retrieves escalation matrix data
  getStakeholders, // Retrieves stakeholders data
  getApprovedTeams, // Retrieves approved teams data
  getClientFeedback, // Retrieves client feedback data
  getMoMs, // Retrieves minutes of meeting data
  getProjectUpdates, // Retrieves project updates data
  getResources, // Retrieves resources data
  getUserProjects, // Retrieves user projects data
  getEditRequest,
  getProjectEditRequest,
};
