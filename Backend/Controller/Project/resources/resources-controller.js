const resources = require("../../../Model/resources.js");
const { reorderArrayOfObject } = require("../../../Utilities/utility.js"); // Importing utility function for reordering arrays of objects

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

module.exports = { getResources, alterResources };
