const { admin_dashboardGet } = require("../../services/refferel/refferelDashboard");

exports.admin_dashboardGet  = async (req, res) => {
  try {
    const data = await admin_dashboardGet (req, res);
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