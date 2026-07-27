const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const authorize = require("../middleware/authorize");

const upload = require("../middleware/uploadResume");

const {
    getProfile,
    updateProfile,
    toggleSaveJob,
    getSavedJobs
} = require("../controllers/candidateController");

router.get(

    "/profile",

    auth,

    authorize("candidate"),

    getProfile

);

router.put(

    "/profile",

    auth,

    authorize("candidate"),

    upload.single("resume"),

    updateProfile

);

router.get(
    "/saved-jobs",
    auth,
    authorize("candidate"),
    getSavedJobs
);

router.post(
    "/saved-jobs/:jobId",
    auth,
    authorize("candidate"),
    toggleSaveJob
);

module.exports = router;