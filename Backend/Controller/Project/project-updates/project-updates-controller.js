const project_updates = require("../../../Model/Project_Updates.js");

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

module.exports = { getProjectUpdates, alterProjectUpdates };
