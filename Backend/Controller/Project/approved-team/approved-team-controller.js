const approved_team = require("../../../Model/approved-team.js");
const phases = require("../../../Model/phases.js"); // Importing Phases model
const { reorderArrayOfObject } = require("../../../Utilities/utility.js"); // Importing utility function for reordering arrays of objects

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

module.exports = { getApprovedTeams, alterApprovedTeams };
