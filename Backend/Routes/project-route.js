const express = require("express");
const router = express.Router();
const { generatePDF } = require("../Controller/gen-pdf.js"); // Importing function for generating PDF files
const { sendMail } = require("../Controller/email.js"); // Importing function for sending emails


const {
  alterProjectDetails,
  getProjectDetails,
} = require("../Controller/Project/project-details/project-details-controller.js");

const {
  getEscalationMatrix,
  alterEscalationMatrix,
} = require("../Controller/Project/escalation-matrix/escalation-matrix-controller.js");

const {
  getAuditHistory,
  alterAuditHistory,
} = require("../Controller/Project/audit-history/audit-history-controller.js");

const {
  getApprovedTeams,
  alterApprovedTeams,
} = require("../Controller/Project/approved-team/approved-team-controller.js");

const {
  getClientFeedback,
  alterClientFeedback,
} = require("../Controller/Project/client-feedback/client-feedback-controller.js");

const {
  getMoMs,
  alterMoMs,
} = require("../Controller/Project/moms/moms-controller.js");

const {
  getPhases,
  alterPhases,
} = require("../Controller/Project/phases/phases-controller.js");

const {
  addProjectChanges,
} = require("../Controller/Project/project-changes/project-changes-controller.js");

const {
  addProject,
  deleteProject,
} = require("../Controller/Project/project-management/project-management-controller.js");

const {
  getProjectUpdates,
  alterProjectUpdates,
} = require("../Controller/Project/project-updates/project-updates-controller.js");

const {
  getResources,
  alterResources,
} = require("../Controller/Project/resources/resources-controller.js");

const {
  getRiskProfiling,
  alterRiskProfiling,
} = require("../Controller/Project/risk-profiling/risk-profiling-controller.js");

const {
  getSprintDetails,
  alterSprintDetails,
} = require("../Controller/Project/sprint-details/sprint-details-controller.js");

const {
  getStakeholders,
  alterStakeholders,
} = require("../Controller/Project/stakeholders/stakeholders-controller.js");

const {
  getUserProjects,
} = require("../Controller/Project/user-associated-projects/user-associated-projects-controller.js");

const {
  getVersionHistory,
  alterVersionHistory,
} = require("../Controller/Project/version-history/version-history-controller.js");

router.route("/:project_id").delete(deleteProject);

router.route("/").get(getUserProjects).post(addProject);

router.route("/changes").post(addProjectChanges);

// Route for fetching or altering project details
router
  .route("/:id/project-details")
  .get(getProjectDetails) // GET request to fetch project details
  .post(alterProjectDetails); // POST request to alter project details

// Route for fetching or altering audit history
router
  .route("/:id/audit-history")
  .get(getAuditHistory) // GET request to fetch audit history
  .post(alterAuditHistory); // POST request to alter audit history

// Route for fetching or altering escalation matrix
router
  .route("/:id/escalation-matrix")
  .get(getEscalationMatrix) // GET request to fetch escalation matrix
  .post(alterEscalationMatrix); // POST request to alter escalation matrix

// Route for fetching or altering project phases
router
  .route("/:id/phases")
  .get(getPhases) // GET request to fetch project phases
  .post(alterPhases); // POST request to alter project phases

// Route for fetching or altering risk profiling data
router
  .route("/:id/risk-profiling")
  .get(getRiskProfiling) // GET request to fetch risk profiling data
  .post(alterRiskProfiling); // POST request to alter risk profiling data

// Route for fetching or altering sprint details
router
  .route("/:id/sprint-details")
  .get(getSprintDetails) // GET request to fetch sprint details
  .post(alterSprintDetails); // POST request to alter sprint details

// Route for fetching or altering stakeholders
router
  .route("/:id/stakeholders")
  .get(getStakeholders) // GET request to fetch stakeholders
  .post(alterStakeholders); // POST request to alter stakeholders

// Route for fetching or altering version history
router
  .route("/:id/version-history")
  .get(getVersionHistory) // GET request to fetch version history
  .post(alterVersionHistory); // POST request to alter version history

// Route for sending emails
router.route("/:id/send-email").post(sendMail);

// Route for generating PDF files
router.route("/:id/gen-pdf").get(generatePDF);

// Routes for fetching or altering approved teams data
router
  .route("/:id/approved-teams")
  .get(getApprovedTeams) // GET request to fetch approved teams data
  .post(alterApprovedTeams); // POST request to alter approved teams data

// Routes for fetching or altering resources data
router
  .route("/:id/resources")
  .get(getResources) // GET request to fetch resources data
  .post(alterResources); // POST request to alter resources data

// Routes for fetching or altering client feedback data
router
  .route("/:id/client-feedback")
  .get(getClientFeedback) // GET request to fetch client feedback data
  .post(alterClientFeedback); // POST request to alter client feedback data

// Routes for fetching or altering minutes of meeting data
router
  .route("/:id/mom")
  .get(getMoMs) // GET request to fetch minutes of meeting data
  .post(alterMoMs); // POST request to alter minutes of meeting data

// Routes for fetching or altering project updates data
router
  .route("/:id/project-updates")
  .get(getProjectUpdates) // GET request to fetch project updates data
  .post(alterProjectUpdates); // POST request to alter project updates data

module.exports = router;
