const { addInquiry, getAllInquiries, markInquiryRead } = require("../services/inquiry");

exports.addInquiry = async (req, res) => {
    try {
        const data = await addInquiry(req, res);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.getAllInquiries = async (req, res) => {
    try {
        const data = await getAllInquiries(req, res);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.markInquiryRead = async (req, res) => {
    try {
        const data = await markInquiryRead(req, res);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(403).json(data);
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
