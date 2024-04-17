const project = require("../../../Model/Project.js"); // Importing Project model

// Function to fetch project details
const getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const default_project_details = {
      _id: id,
      overview: "",
      budget: { type: "", type_value: "" },
      timeline: "",
      stack: {},
      scope: "",
    };
    let response = await project.find({ _id: id }); // Finding all project details from the database
    if (response.length == 0) {
      response = [default_project_details];
    }

    res.status(200).json({ data: response }); // Sending success response with fetched data
  } catch (error) {
    res.status(500).json({ message: "Error while Getting Project Details" }); // Sending error response if any occurs during fetching
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

module.exports = { alterProjectDetails, getProjectDetails };
