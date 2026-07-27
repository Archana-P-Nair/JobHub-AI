const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        salary: {
            min: Number,
            max: Number,
            currency: {
                type: String,
                default: "INR",
            },
        },

        experience: {
            type: Number,
            default: 0,
        },

        employmentType: {
            type: String,
            enum: [
                "Full-Time",
                "Part-Time",
                "Internship",
                "Contract",
            ],
            default: "Full-Time",
        },

        skills: [
            {
                type: String,
            },
        ],

        remote: {
            type: Boolean,
            default: false,
        },

        applicationDeadline: {
            type: Date,
        },

        recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Job", jobSchema);