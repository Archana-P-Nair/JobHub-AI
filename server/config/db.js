const mongoose = require("mongoose");

const connectDB = async () => {
    if (mongoose.connections[0] && mongoose.connections[0].readyState) {
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;