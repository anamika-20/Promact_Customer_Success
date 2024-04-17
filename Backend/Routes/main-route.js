// Importing required modules and controllers
const express = require("express");
const project_router = require("./project-route.js");
const router = express.Router();

const {
  getProjectEditRequest,
} = require("../Controller/Project/project-edit-requests/project-edit-requests-controller.js");

const {
  getEditRequest,
  alterEditRequest,
} = require("../Controller/Project/user-edit-requests/user-edit-requests-controller.js");

const { fetchManagers } = require("../Controller/manager.js");

const { sendInviteEmail } = require("../Controller/email.js"); // Importing function for sending emails

// // Route for fetching or altering user projects data
// router.route("/projects").get(getUserProjects);

// router.route("/add-project").post(addProject);

router.use("/project/", project_router);

// Route for sending invitation emails
router.route("/email/invite").post(sendInviteEmail);

router
  .route("/user-edit-request/:user_id")
  .get(getEditRequest)
  .post(alterEditRequest);

router.route("/project-edit-request/:project_id").get(getProjectEditRequest);

// router.route("/project-change/").post(addProjectChanges);

router.route("/managers-list").get(fetchManagers);

// Exporting the router modulecls
module.exports = router;
