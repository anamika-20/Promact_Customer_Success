const escalation_matrix = require("../../../Model/Escalation_Matrix.js"); // Importing Escalation Matrix model

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

module.exports = { getEscalationMatrix, alterEscalationMatrix };
