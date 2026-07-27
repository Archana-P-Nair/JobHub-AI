const User = require("../models/User");
const Job = require("../models/Job");

const {
    recommendJobs,
} = require("../services/geminiService");

exports.getRecommendations = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const jobs = await Job.find({
            isActive: true,
        });

        console.log("Candidate Skills:");
        console.log(user.skills);

        console.log("Total Jobs:");
        console.log(jobs.length);

        const recommendations = await recommendJobs(user, jobs);

        console.log("Gemini Response:");
        console.log(recommendations);

        res.json({
            success: true,
            recommendations,
        });

    } catch (error) {

        console.error("AI ERROR:");
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message,
        });

    }

};