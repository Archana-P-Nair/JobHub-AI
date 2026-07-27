const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getDashboardAnalytics = async (req, res) => {
    try {

        const jobs = await Job.find({
            recruiter: req.user.id,
        });

        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({
            job: { $in: jobIds },
        });

        const analytics = {
            totalJobs: jobs.length,
            totalApplications: applications.length,
            interviews: applications.filter(
                a => a.status === "Interview"
            ).length,
            hired: applications.filter(
                a => a.status === "Hired"
            ).length,
            rejected: applications.filter(
                a => a.status === "Rejected"
            ).length,
        };

        res.json({
            success: true,
            analytics,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load analytics",
        });

    }
};