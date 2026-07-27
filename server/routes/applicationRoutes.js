const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
    applyForJob,
    getMyApplications,
    getApplicants,
    updateApplicationStatus,
} = require("../controllers/applicationController");

router.get(
    "/my",
    authMiddleware,
    authorize("candidate"),
    getMyApplications
);
router.post(
    "/:jobId",
    authMiddleware,
    authorize("candidate"),
    applyForJob
);

module.exports = router;