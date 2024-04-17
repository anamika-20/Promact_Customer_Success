const sprint_details = require("../../../Model/sprint-details.js"); // Importing Sprint Details model
const { reorderArrayOfObject } = require("../../../Utilities/utility.js"); // Importing utility function for reordering arrays of objects

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

module.exports = { getSprintDetails, alterSprintDetails };
