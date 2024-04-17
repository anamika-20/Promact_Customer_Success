const stakeholders = require("../../../Model/stakeholders.js"); // Importing Stakeholders model
const { reorderArrayOfObject } = require("../../../Utilities/utility.js"); // Importing utility function for reordering arrays of objects

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

module.exports = { getStakeholders, alterStakeholders };
