const Application = require("../models/Application");

const Job = require("../models/Job");



/*
-------------------------------------------------
GET ALL APPLICANTS FOR A JOB
Recruiter Only
-------------------------------------------------
*/

exports.getApplicants = async (req, res) => {

    try {

        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const applications = await Application.find({
            job: req.params.jobId,
        })

            .populate(
                "candidate",
                "name email"
            )

            .sort({
                createdAt: -1,
            });

        res.json({

            success: true,

            totalApplicants: applications.length,

            applications,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch applicants",

        });

    }

};

/*
-------------------------------------------------
UPDATE APPLICATION STATUS
Recruiter Only
-------------------------------------------------
*/

exports.updateApplicationStatus = async (req, res) => {

    try {

        const application =
            await Application.findById(req.params.id)
                .populate("job");

        if (!application) {

            return res.status(404).json({

                success: false,

                message: "Application not found",

            });

        }

        if (
            application.job.recruiter.toString() !==
            req.user.id
        ) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized",

            });

        }

        application.status = req.body.status;

        await application.save();

        res.json({

            success: true,

            message: "Status updated.",

            application,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to update status",

        });

    }

};
exports.getMyApplications = async (req, res) => {
    try {

        const applications = await Application.find({
            candidate: req.user.id,
        })
            .populate("job")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            applications,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch applications",
        });

    }
};
exports.applyForJob = async (req, res) => {
    try {

        const { jobId } = req.params;

        const { coverLetter } = req.body;

        const candidateId = req.user.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        const existingApplication =
            await Application.findOne({
                candidate: candidateId,
                job: jobId,
            });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job.",
            });
        }

        const application =
            await Application.create({
                candidate: candidateId,
                recruiter: job.recruiter,
                job: jobId,
                coverLetter,
            });

        res.status(201).json({
            success: true,
            message: "Application submitted successfully.",
            application,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};