const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },

        recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        resume: {
            type: String,
            default: "",
        },

        coverLetter: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Under Review",
                "Interview",
                "Rejected",
                "Hired",
            ],
            default: "Applied",
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate applications
applicationSchema.index(
    { candidate: 1, job: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "Application",
    applicationSchema
);