const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const authorize = require("../middleware/authorize");

const {
    getRecommendations,
} = require("../controllers/aiController");

router.get(
    "/recommendations",
    auth,
    authorize("candidate"),
    getRecommendations
);

module.exports = router;