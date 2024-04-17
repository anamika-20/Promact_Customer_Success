// Importing required modules and controllers
const express = require("express");
const project_router = require("./project-route.js");
const router = express.Router();

// Importing controller functions for handling POST request for project
const {
  addProject, // Adds a new project
  alterEditRequest,
  deleteProject,
  addProjectChanges,
} = require("../Controller/Project/Project_postRequests.js");

// Importing controller functions for handling GET request for project
const {
  getUserProjects, // Retrieves user projects data
  getEditRequest,
  getProjectEditRequest,
} = require("../Controller/Project/Project_getRequests.js");

const { fetchManagers } = require("../Controller/manager.js");

const { sendInviteEmail } = require("../Controller/email.js"); // Importing function for sending emails

// Route for fetching or altering user projects data
router.route("/projects").get(getUserProjects);

router.route("/add-project").post(addProject);

router.use("/project/", project_router);

// Route for sending invitation emails
router.route("/send-email/invite").post(sendInviteEmail);

router
  .route("/edit-request/:user_id")
  .get(getEditRequest)
  .post(alterEditRequest);

router.route("/project-edit-request/:project_id").get(getProjectEditRequest);



router.route("/project-change/").post(addProjectChanges);

router.route("/get-managers").get(fetchManagers);

// Exporting the router modulecls
module.exports = router;
