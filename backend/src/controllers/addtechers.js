const { add_teacher,allTeachers } = require("../services/addtechers");

exports.add_teacher = async (req, res) => {
    try {
        const data = await add_teacher(req, res);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.allTeachers = async (req, res) => {
    try {
        const data = await allTeachers(req, res);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
