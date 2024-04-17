const express = require("express");
const router = express.Router();
const { generatePDF } = require("../Controller/gen-pdf.js"); // Importing function for generating PDF files
const { sendMail } = require("../Controller/email.js"); // Importing function for sending emails

// Importing controller functions for handling POST request for project
const {
  alterProjectDetails, // Alters project details
  alterEscalationMatrix, // Alters escalation matrix
  alterAuditHistory, // Alters audit history
  alterPhases, // Alters phases
  alterRiskProfiling, // Alters risk profiling data
  alterSprintDetails, // Alters sprint details
  alterStakeholders, // Alters stakeholders data
  alterVersionHistory, // Alters version history
  alterResources, // Alters resources data
  alterApprovedTeams, // Alters approved teams data
  alterClientFeedback, // Alters client feedback data
  alterMoMs, // Alters minutes of meeting data
  alterProjectUpdates, // Alters project updates data
  deleteProject
} = require("../Controller/Project/Project_postRequests.js");

// Importing controller functions for handling GET request for project
const {
  getProjectDetails, // Retrieves project details
  getAuditHistory, // Retrieves audit history
  getEscalationMatrix, // Retrieves escalation matrix
  getPhases, // Retrieves phases
  getRiskProfiling, // Retrieves risk profiling data
  getSprintDetails, // Retrieves sprint details
  getStakeholders, // Retrieves stakeholders data
  getVersionHistory, // Retrieves version history
  getApprovedTeams, // Retrieves approved teams data
  getClientFeedback, // Retrieves client feedback data
  getMoMs, // Retrieves minutes of meeting data
  getProjectUpdates, // Retrieves project updates data
  getResources, // Retrieves resources data
} = require("../Controller/Project/Project_getRequests.js");

router.route('/:project_id').delete(deleteProject)

// Route for fetching or altering project details
router
  .route("/:id/project_details")
  .get(getProjectDetails) // GET request to fetch project details
  .post(alterProjectDetails); // POST request to alter project details

// Route for fetching or altering audit history
router
  .route("/:id/audit_history")
  .get(getAuditHistory) // GET request to fetch audit history
  .post(alterAuditHistory); // POST request to alter audit history

// Route for fetching or altering escalation matrix
router
  .route("/:id/escalation_matrix")
  .get(getEscalationMatrix) // GET request to fetch escalation matrix
  .post(alterEscalationMatrix); // POST request to alter escalation matrix

// Route for fetching or altering project phases
router
  .route("/:id/phases")
  .get(getPhases) // GET request to fetch project phases
  .post(alterPhases); // POST request to alter project phases

// Route for fetching or altering risk profiling data
router
  .route("/:id/risk_profiling")
  .get(getRiskProfiling) // GET request to fetch risk profiling data
  .post(alterRiskProfiling); // POST request to alter risk profiling data

// Route for fetching or altering sprint details
router
  .route("/:id/sprint_details")
  .get(getSprintDetails) // GET request to fetch sprint details
  .post(alterSprintDetails); // POST request to alter sprint details

// Route for fetching or altering stakeholders
router
  .route("/:id/stakeholders")
  .get(getStakeholders) // GET request to fetch stakeholders
  .post(alterStakeholders); // POST request to alter stakeholders

// Route for fetching or altering version history
router
  .route("/:id/version_history")
  .get(getVersionHistory) // GET request to fetch version history
  .post(alterVersionHistory); // POST request to alter version history

// Route for sending emails
router.route("/:id/sendEmail").post(sendMail);

// Route for generating PDF files
router.route("/:id/genPDF").get(generatePDF);

// Routes for fetching or altering approved teams data
router
  .route("/:id/approved_teams")
  .get(getApprovedTeams) // GET request to fetch approved teams data
  .post(alterApprovedTeams); // POST request to alter approved teams data

// Routes for fetching or altering resources data
router
  .route("/:id/resources")
  .get(getResources) // GET request to fetch resources data
  .post(alterResources); // POST request to alter resources data

// Routes for fetching or altering client feedback data
router
  .route("/:id/client_feedback")
  .get(getClientFeedback) // GET request to fetch client feedback data
  .post(alterClientFeedback); // POST request to alter client feedback data

// Routes for fetching or altering minutes of meeting data
router
  .route("/:id/mom")
  .get(getMoMs) // GET request to fetch minutes of meeting data
  .post(alterMoMs); // POST request to alter minutes of meeting data

// Routes for fetching or altering project updates data
router
  .route("/:id/project_updates")
  .get(getProjectUpdates) // GET request to fetch project updates data
  .post(alterProjectUpdates); // POST request to alter project updates data

module.exports = router;
