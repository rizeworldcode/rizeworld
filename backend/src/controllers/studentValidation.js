const {student_login,student_logout } = require("../services/studentValidation")

exports.student_login = async (req, res) => {
    try {
      const data = await student_login(req, res);
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

    exports.student_logout = async (req, res) => {
      try {
        const data = await student_logout(req, res);
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