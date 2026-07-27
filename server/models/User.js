const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        bio: {
    type: String,
    default: "",
},
headline: {
    type: String,
    default: "",
},
skills: [{
    type: String,
}],

linkedin: {
    type: String,
    default: "",
},

github: {
    type: String,
    default: "",
},

resume: {
    type: String,
    default: "",
},

savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
}],
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["candidate", "recruiter"],
            default: "candidate",
        },

        avatar: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);