const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const recruiterMiddleware =
    require("../middleware/recruiterMiddleware");

const {
    getDashboardAnalytics,
} = require("../controllers/recruiterController");

router.get(
    "/analytics",
    authMiddleware,
    authorize("recruiter"),
    getDashboardAnalytics
);

const {

    getApplicants,

    updateApplicationStatus,

} = require("../controllers/applicationController");

router.get(

    "/jobs/:jobId/applicants",

    authMiddleware,

    recruiterMiddleware,

    getApplicants

);

router.put(

    "/applications/:id",

    authMiddleware,

    recruiterMiddleware,

    updateApplicationStatus

);

module.exports = router;