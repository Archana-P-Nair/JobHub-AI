require("dotenv").config();
const connectDB = require("../config/db");

// Connect to database optimally for serverless functions
connectDB();

const app = require("../app");
module.exports = app;
