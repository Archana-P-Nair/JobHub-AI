exports.validateJob = (req, res, next) => {

    const {
        title,
        company,
        location,
        description,
    } = req.body;

    if (
        !title ||
        !company ||
        !location ||
        !description
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Title, Company, Location and Description are required.",
        });
    }

    next();
};