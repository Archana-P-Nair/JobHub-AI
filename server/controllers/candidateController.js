const User = require("../models/User");

exports.getProfile = async (req, res) => {

    const user = await User.findById(req.user.id);

    res.json({
        success: true,
        user,
    });

};

exports.updateProfile = async (req, res) => {

    const user = await User.findById(req.user.id);

    user.name = req.body.name;
    user.headline = req.body.headline;
    user.skills = req.body.skills;

    if (req.file) {

        user.resume = `/uploads/resumes/${req.file.filename}`;

    }

    await user.save();

    res.json({
        success: true,
        user,
    });

};

exports.toggleSaveJob = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const jobId = req.params.jobId;

        const isSaved = user.savedJobs.includes(jobId);
        if (isSaved) {
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        } else {
            user.savedJobs.push(jobId);
        }
        await user.save();

        res.json({
            success: true,
            isSaved: !isSaved,
            savedJobs: user.savedJobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getSavedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("savedJobs");
        res.json({
            success: true,
            savedJobs: user.savedJobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};