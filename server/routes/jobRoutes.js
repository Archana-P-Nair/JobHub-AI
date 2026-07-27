const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const recruiterMiddleware = require("../middleware/recruiterMiddleware");

const { validateJob } = require("../validators/jobValidator");

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    getRecruiterJobs,
    deleteJob,
} = require("../controllers/jobController");
router.get(
    "/recruiter/my",
    authMiddleware,
    recruiterMiddleware,
    getRecruiterJobs
);
/**
 * Public Routes
 */

router.get("/", getJobs);

router.get("/:id", getJobById);

/**
 * Recruiter Routes
 */

router.post(
    "/",
    authMiddleware,
    recruiterMiddleware,
    validateJob,
    createJob
);

router.put(
    "/:id",
    authMiddleware,
    recruiterMiddleware,
    updateJob
);

router.delete(
    "/:id",
    authMiddleware,
    recruiterMiddleware,
    deleteJob
);

module.exports = router;