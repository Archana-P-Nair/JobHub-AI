const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();


// Middleware FIRST
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin, or specific origins
        return callback(null, true);
    },
    credentials: true,
}));

app.use(express.json());


// Static files
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);


// Routes AFTER middleware

const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const candidateRoutes = require("./routes/candidateRoutes");


app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/candidate", candidateRoutes);



app.get(["/", "/api"], (req, res) => {
    res.json({
        success: true,
        message: "JobHub API is running smoothly!",
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Healthy",
    });
});


module.exports = app;