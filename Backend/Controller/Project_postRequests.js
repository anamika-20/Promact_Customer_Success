// Importing required models and utility functions
const project = require("../Model/Project"); // Importing Project model
const audit_history = require("../Model/Audit_History"); // Importing Audit History model
const version_history = require("../Model/Version_History"); // Importing Version History model
const sprint_details = require("../Model/Sprint_Details"); // Importing Sprint Details model
const stakeholders = require("../Model/Stakeholders"); // Importing Stakeholders model
const phases = require("../Model/Phases"); // Importing Phases model
const escalation_matrix = require("../Model/Escalation_Matrix"); // Importing Escalation Matrix model
const risk_profiling = require("../Model/Risk_Profiling"); // Importing Risk Profiling model
const resources = require("../Model/Resources.js");
const client_feedback = require("../Model/Client_Feedback.js");
const approved_team = require("../Model/Approved_Team.js");
const mom = require("../Model/MoMs.js");
const project_updates = require("../Model/Project_Updates.js");
const edit_requests = require("../Model/EditRequests.js");
const project_changes = require("../Model/ProjectChanges.js");

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

// Function to update project details
const alterProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectDetails } = req.body; // Extracting project details from request body
    let response = await project.updateOne(
      // Updating project details in the database
      { _id: id }, // Finding the project by its ID
      { $set: projectDetails } // Setting the new project details
    );
    res.status(200).json({ message: "Details Updated Successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Project Details" }); // Sending error response if any error occurs during updating
  }
};

// Function to handle alterations in version history records
const alterVersionHistory = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const { id } = req.params;
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await version_history.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await version_history.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Version History" }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in audit history records
const alterAuditHistory = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const { id } = req.params;
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await audit_history.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await audit_history.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Audit History" }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in stakeholders records
const alterStakeholders = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    // Filtering records to identify added/updated and deleted records separately
    let updatedRecords = data.filter((record) => {
      return record.action === "added/updated";
    });

    let deletedRecords = data.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await stakeholders.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await stakeholders.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Stakeholders" }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in escalation matrix records
const alterEscalationMatrix = async (req, res) => {
  try {
    const { id } = req.params;

    // Filtering records to identify added/updated and deleted records separately
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await escalation_matrix.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await escalation_matrix.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Escalation Matrix" }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in risk profiling records
const alterRiskProfiling = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const { id } = req.params;
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await risk_profiling.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await risk_profiling.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Risk Profiling" }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in phases records
const alterPhases = async (req, res) => {
  try {
    // Filter records to identify added/updated and deleted records separately
    const { id } = req.params;
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generate update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => {
      return {
        updateOne: {
          filter: { _id: obj._id, project_id: id }, // Filtering by ID
          update: { $set: obj }, // Setting new values
          upsert: true, // Creating a new document if it doesn't exist
        },
      };
    });

    // Generate delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Perform bulk write operation to update and delete records
    const updateRecordResult = await phases.bulkWrite(updateRecordOperations);
    const deleteRecordResult = await phases.bulkWrite(deleteRecordOperations);

    // Send success response
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    // Send error response if any error occurs
    res.status(500).json({ message: "Error while Altering Phases" });
  }
};

// Function to handle alterations in sprint details records
const alterSprintDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Filtering records to identify added/updated and deleted records separately
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await sprint_details.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await sprint_details.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Sprint Details" }); // Sending error response if any error occurs
  }
};

const alterResources = async (req, res) => {
  try {
    const { id } = req.params;
    // Filtering records to identify added/updated and deleted records separately
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await resources.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await resources.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Resources" }); // Sending error response if any error occurs
  }
};

const alterApprovedTeams = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const { id } = req.params;
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await approved_team.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await approved_team.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Approved Teams" }); // Sending error response if any error occurs
  }
};

const alterClientFeedback = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const { id } = req.params;
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await client_feedback.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await client_feedback.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Client Feedback" }); // Sending error response if any error occurs
  }
};

const alterMoMs = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const { id } = req.params;
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await mom.bulkWrite(updateRecordOperations);
    const deleteRecordResult = await mom.bulkWrite(deleteRecordOperations);

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering MoM" }); // Sending error response if any error occurs
  }
};

const alterProjectUpdates = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const { id } = req.params;
    let updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    let deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    updatedRecords = updatedRecords.map((record) => {
      delete record.action;
      return record;
    });

    deletedRecords = deletedRecords.map((record) => {
      delete record.action;
      return record;
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id, project_id: id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await project_updates.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await project_updates.bulkWrite(
      deleteRecordOperations
    );

    res.status(200).json({ message: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.status(500).json({ message: "Error while Altering Project Updates" }); // Sending error response if any error occurs
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
    res.status(500).json({ message: "Error while deleting the Project" });
  }
};

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

// Exporting the functions to be used in other parts of the application

module.exports = {
  // Functions to alter data
  alterProjectDetails, // Alters project details
  alterVersionHistory, // Alters version history
  alterAuditHistory, // Alters audit history
  alterSprintDetails, // Alters sprint details
  alterPhases, // Alters phases
  alterRiskProfiling, // Alters risk profiling data
  alterEscalationMatrix, // Alters escalation matrix data
  alterStakeholders, // Alters stakeholders data
  alterApprovedTeams, // Alters approved teams data
  alterClientFeedback, // Alters client feedback data
  alterMoMs, // Alters minutes of meeting data
  alterProjectUpdates, // Alters project updates data
  alterResources, // Alters resources data
  addProject, // Adds a new project
  alterEditRequest,
  addProjectChanges,
  deleteProject,
};
