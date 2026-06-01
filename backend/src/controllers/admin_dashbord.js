const { admin_dashboardGet, updateReferralAmount } = require("../services/admin_dashbord")

exports.admin_dashboardGet = async (req, res) => {
    try {
      const data = await admin_dashboardGet(req, res);
      if (data.success) {
        res.status(200).json(data);
      }
      else{
          res.status(403).json(data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

exports.updateReferralAmount = async (req, res) => {
    try {
      const data = await updateReferralAmount(req, res);
      if (data.success) {
        res.status(200).json(data);
      }
      else{
          res.status(403).json(data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };