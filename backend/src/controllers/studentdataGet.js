const studentDataService = require("../services/studentdataGet.js");

exports.totalEarningsDetails = async (req, res) => {
    try {
      const data = await studentDataService.totalEarningsDetails(req, res);
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

exports.updateReferrerPayment = async (req, res) => {
    try {
      const data = await studentDataService.updateReferrerPayment(req, res);
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

exports.getAllReferrers = async (req, res) => {
    try {
      const data = await studentDataService.getAllReferrers(req, res);
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

exports.referredStudentsData = async (req, res) => {
    try {
      const data = await studentDataService.referredStudentsData(req, res);
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

exports.allStudents = async (req, res) => {
    try {
      const data = await studentDataService.allStudents(req, res);
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
exports.certificateissuedStudentsData = async (req, res) => {
    try {
      const data = await studentDataService.certificateissuedStudentsData(req, res);
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
exports.certificateunissuedStudentsData = async (req, res) => {
    try {
      const data = await studentDataService.certificateunissuedStudentsData(req, res);
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
exports.pandingfeeStudentsData = async (req, res) => {
    try {
      const data = await studentDataService.pandingfeeStudentsData(req, res);
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
exports.clearfeeStudentsData = async (req, res) => {
    try {
      const data = await studentDataService.clearfeeStudentsData(req, res);
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
exports.particularStudentData = async (req, res) => {
    try {
      const data = await studentDataService.particularStudentData(req, res);
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

  