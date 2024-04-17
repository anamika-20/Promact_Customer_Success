const client_feedback = require("../../../Model/client-feedback.js");
const { reorderArrayOfObject } = require("../../../Utilities/utility.js"); // Importing utility function for reordering arrays of objects

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

module.exports = { getClientFeedback, alterClientFeedback };
