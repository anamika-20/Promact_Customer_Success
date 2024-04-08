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
const approved_team = require("../../Model/Approved_Team.js");
const mom = require("../../Model/MoMs.js");
const project_updates = require("../../Model/Project_Updates.js");
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

// Function to fetch project details
const getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const default_project_details = {
      _id: id,
      overview: "",
      budget: { type: "", type_value: "" },
      timeline: "",
      stack: {},
      scope: "",
    };
    let response = await project.find({ _id: id }); // Finding all project details from the database
    if (response.length == 0) {
      response = [default_project_details];
    }

    res.status(200).json({ data: response }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Project Details" }); // Sending error response if any occurs during fetching
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

// Function to fetch audit history
const getAuditHistory = async (req, res) => {
  try {
    const { id } = req.params;

    // Default structure for audit history in case no data is found
    const default_audit_history = [
      {
        project_id: id,
        date_of_audit: "",
        reviewed_by: "",
        status: "",
        reviewed_section: "",
        comment: "",
        action_item: "",
        edited_by: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await audit_history.find({ project_id: id }); // Finding audit history data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_audit_history; // Setting default audit history structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_audit_history); // Reordering audit history data
    }

    res.status(200).json({ data: data }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Audit History" }); // Sending error response if any occurs during fetching
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

// Function to fetch escalation matrix data
const getEscalationMatrix = async (req, res) => {
  try {
    const { id } = req.params;

    // Default structure for escalation matrix in case no data is found
    const default_escalation_matrix = [
      {
        project_id: id,
        level: "",
        escalation_type: "financial",
        member: "",
        designation: "",
        edited_by: "",
        _id: "",
        __v: "",
      },
      {
        project_id: id,
        level: "",
        escalation_type: "technical",
        member: "",
        designation: "",
        edited_by: "",
        _id: "",
        __v: "",
      },
      {
        project_id: id,
        level: "",
        escalation_type: "operational",
        member: "",
        designation: "",
        edited_by: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await escalation_matrix.find({ project_id: id }); // Finding escalation matrix data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_escalation_matrix; // Setting default escalation matrix structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_escalation_matrix); // Reordering escalation matrix data
    }

    res.status(200).json({ data: data }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while getting Escalation Matrix" }); // Sending error response if any occurs during fetching
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

// Function to fetch phases data
const getPhases = async (req, res) => {
  try {
    const { id } = req.params;

    // Default structure for phases in case no data is found
    const defaultPhase = [
      {
        project_id: id,
        title: "Phase 1",
        start_date: "",
        completion_date: "",
        approval_date: "",
        status: "",
        revised_completion_date: "",
        comments: "",
        edited_by: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await phases.find({ project_id: id }); // Finding phases data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = defaultPhase; // Setting default phases structure if no data found
    } else {
      data = reorderArrayOfObject(data, defaultPhase); // Reordering phases data
    }

    res.status(200).json({ data: data }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Phases" }); // Sending error response if any occurs during fetching
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

// Function to get resources for a specific project
const getResources = async (req, res) => {
  try {
    // Extract project id from request parameters
    const { id } = req.params;

    // Define a default resource object structure
    const default_resource = [
      {
        _id: "",
        project_id: id,
        resource_name: "",
        role: "",
        start_date: "",
        end_date: "",
        comment: "",
        edited_by: "",
      },
    ];

    // Find resources associated with the project id
    let data = await resources.find({ project_id: id });

    // If no resources are found, use the default resource structure
    if (data.length == 0) {
      data = default_resource;
    } else {
      // Reorder the array of objects based on default resource structure
      data = reorderArrayOfObject(data, default_resource);
    }

    // Send success response with the retrieved data
    res.status(200).json({ data: data });
  } catch (error) {
    // Log error and send error response
    res.status(500).json({ message: "Error while Getting Resources" });
  }
};

// Function to get Minutes of Meetings (MoMs) for a specific project
const getMoMs = async (req, res) => {
  try {
    // Extract project id from request parameters
    const { id } = req.params;

    // Define a default MoM object structure
    const default_mom = [
      {
        _id: "",
        project_id: id,
        date: "",
        duration: "",
        mom_link: "",
        comments: "",
        edited_by: "",
      },
    ];

    // Find MoMs associated with the project id
    let data = await mom.find({ project_id: id });

    // If no MoMs are found, use the default MoM structure
    if (data.length == 0) {
      data = default_mom; // Setting default MoM structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_mom); // Reordering MoM data
    }

    // Send success response with the retrieved data
    res.status(200).json({ data: data });
  } catch (error) {
    // Send error response if an error occurs
    res.status(500).json({ message: "Error while Getting MoMs" });
  }
};

// Function to get approved teams for a specific project
const getApprovedTeams = async (req, res) => {
  try {
    // Extract project id from request parameters
    const { id } = req.params;

    const phases_response = await phases.find({ project_id: id });
    const unique_phases = new Set();

    phases_response.map((record) => {
      unique_phases.add(record.title);
    });

    if (unique_phases.size == 0) {
      unique_phases.add("Phase 1");
    }

    // Define a default approved team object structure
    const default_approved_team = [
      {
        _id: "",
        project_id: id,
        no_of_resources: "",
        role: "",
        availability: "",
        duration: "",
        category: "",
        edited_by: "",
      },
    ];

    // Find approved teams associated with the project id
    let data = await approved_team.find({ project_id: id });
    unique_phases.forEach((phase) => {
      let records = data.filter((record) => record.category == phase);
      if (records.length == 0) {
        data.push({
          _id: "",
          project_id: id,
          no_of_resources: "",
          role: "",
          availability: "",
          duration: "",
          category: `${phase}`,
          edited_by: "",
        });
      }
    });

    // If no approved teams are found, use the default approved team structure
    data = reorderArrayOfObject(data, default_approved_team); // Reordering approved team data

    // Send success response with the retrieved data
    res.status(200).json({ data: data });
  } catch (error) {
    // Send error response if an error occurs
    res.status(500).json({ message: "Error while Getting Approved Teams" });
  }
};

// Function to get client feedback for a specific project
const getClientFeedback = async (req, res) => {
  try {
    // Extract project id from request parameters
    const { id } = req.params;

    // Define a default client feedback object structure
    const default_client_feedback = [
      {
        _id: "",
        project_id: id,
        feedback_type: "",
        date_received: "",
        detailed_feedback: "",
        action_taken: "",
        closure_date: "",
        edited_by: "",
      },
    ];

    // Find client feedback associated with the project id
    let data = await client_feedback.find({ project_id: id });

    // If no client feedback is found, use the default client feedback structure
    if (data.length == 0) {
      data = default_client_feedback; // Setting default client feedback structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_client_feedback); // Reordering client feedback data
    }

    // Send success response with the retrieved data
    res.status(200).json({ data: data });
  } catch (error) {
    // Send error response if an error occurs
    res.status(500).json({ message: "Error while Getting client Feedback" });
  }
};

// Function to get project updates for a specific project
const getProjectUpdates = async (req, res) => {
  try {
    // Extract project id from request parameters
    const { id } = req.params;

    // Define a default project updates object structure
    const default_project_updates = [
      {
        _id: "",
        project_id: id,
        date: "",
        general_updates: "",
        edited_by: "",
      },
    ];

    // Find project updates associated with the project id
    let data = await project_updates.find({ project_id: id });

    // If no project updates are found, use the default project updates structure
    if (data.length == 0) {
      data = default_project_updates; // Setting default project updates structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_project_updates); // Reordering project updates data
    }

    // Send success response with the retrieved data
    res.status(200).json({ data: data });
  } catch (error) {
    // Send error response if an error occurs
    res.status(500).json({ message: "Error while Getting Project Updates" });
  }
};

const getEditRequest = async (req, res) => {
  try {
    const { user_id } = req.params;
    const response = await edit_requests.find({ user_id: user_id });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Edit Request" });
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
