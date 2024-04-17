const project = require("../../../Model/project.js"); // Importing Project model
const stakeholders = require("../../../Model/stakeholders.js"); // Importing Stakeholders model

// Function to fetch projects associated with a user
const getUserProjects = async (req, res) => {
  try {
    // Destructuring user_id and role from request query parameters
    const { id: user_id, role } = req.query;
    let response = [];
    // Check if the user is an Admin or Auditor
    if (role === "Admin" || role === "Auditor") {
      // If Admin or Auditor, fetch all projects
      response = await project.find({});
    } else if (role === "Client") {
      let client_projects = await stakeholders.find({ _id: user_id });
      client_projects = client_projects.map((project) => project.project_id);
      response = await project.find({
        _id: { $in: client_projects },
      });
    } else {
      // If not Admin or Auditor, fetch projects associated with the user
      response = await project.find({
        "associated_manager._id": user_id, // Check if user is associated with manager's _id
      });
    }
    // Send response with fetched projects
    res.status(200).json({ data: response });
  } catch (error) {
    // If an error occurs, send error response
    res.status(500).json({ message: "Error while Getting User projects" });
  }
};

module.exports = { getUserProjects };
