const Job = require("../models/Job");
const Application = require("../models/Application");
/**
 * POST /api/jobs
 * Recruiter only
 */
exports.getRecruiterJobs = async (req, res) => {

    try {

        const jobs = await Job.find({
            recruiter: req.user.id,
        })
            .sort({
                createdAt: -1,
            });

        // Count applications for each job
        const jobsWithApplicants = await Promise.all(
            jobs.map(async (job) => {

                const applicants =
                    await Application.countDocuments({
                        job: job._id,
                    });

                return {
                    ...job.toObject(),
                    applicants,
                };

            })
        );

        res.json({
            success: true,
            jobs: jobsWithApplicants,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch recruiter jobs",
        });

    }

};
exports.createJob = async (req, res) => {
    try {

        const job = await Job.create({
            ...req.body,
            recruiter: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create job",
        });

    }
};

/**
 * GET /api/jobs
 * Public
 */
exports.getJobs = async (req, res) => {

    try {

        const {
            search,
            location,
            employmentType,
            remote,
            page = 1,
            limit = 10,
            sort = "newest",
        } = req.query;

        const query = {
            isActive: true,
        };

        /*
        SEARCH
        */

        if (search) {

            query.$or = [

                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    company: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    skills: {
                        $regex: search,
                        $options: "i",
                    },
                },

            ];

        }

        /*
        LOCATION
        */

        if (location) {

            query.location = {
                $regex: location,
                $options: "i",
            };

        }

        /*
        EMPLOYMENT TYPE
        */

        if (employmentType) {

            query.employmentType = employmentType;

        }

        /*
        REMOTE
        */

        if (remote !== undefined) {

            query.remote = remote === "true";

        }

        /*
        SORTING
        */

        let sortOption = {
            createdAt: -1,
        };

        switch (sort) {

            case "salaryAsc":
                sortOption = {
                    "salary.min": 1,
                };
                break;

            case "salaryDesc":
                sortOption = {
                    "salary.max": -1,
                };
                break;

            case "oldest":
                sortOption = {
                    createdAt: 1,
                };
                break;

            default:
                sortOption = {
                    createdAt: -1,
                };

        }

        /*
        PAGINATION
        */

        const skip = (page - 1) * limit;

        const jobs = await Job.find(query)
            .populate("recruiter", "name email")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const totalJobs = await Job.countDocuments(query);

        res.status(200).json({

            success: true,

            totalJobs,

            currentPage: Number(page),

            totalPages: Math.ceil(
                totalJobs / limit
            ),

            jobs,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch jobs",

        });

    }

};

/**
 * GET /api/jobs/:id
 */
exports.getJobById = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)
            .populate("recruiter", "name email");

        if (!job) {

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });

        }

        res.json({
            success: true,
            job,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

/**
 * PUT /api/jobs/:id
 */
exports.updateJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });

        }

        if (job.recruiter.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });

        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update job",
        });

    }

};

/**
 * DELETE /api/jobs/:id
 */
exports.deleteJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });

        }

        if (job.recruiter.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });

        }

        await job.deleteOne();

        res.json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete job",
        });

    }

};