const version_history = require("../../../Model/version-history.js"); // Importing Version History model
const { reorderArrayOfObject } = require("../../../Utilities/utility.js"); // Importing utility function for reordering arrays of objects

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

module.exports = { getVersionHistory, alterVersionHistory };
