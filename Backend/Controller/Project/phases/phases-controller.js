const phases = require("../../../Model/phases.js"); // Importing Phases model
const { reorderArrayOfObject } = require("../../../Utilities/utility.js"); // Importing utility function for reordering arrays of objects

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

module.exports = { getPhases, alterPhases };
