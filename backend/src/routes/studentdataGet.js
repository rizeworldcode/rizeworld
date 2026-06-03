const express = require("express");
const router = express.Router();


const {
allStudents,certificateissuedStudentsData,certificateunissuedStudentsData,pandingfeeStudentsData,clearfeeStudentsData,particularStudentData, totalEarningsDetails, referredStudentsData, getAllReferrers, updateReferrerPayment, getReferrerStudents
} = require("../controllers/studentdataGet");

const user_auth = require("../../middleware/user_auth");
router.post("/allStudents", allStudents);
router.post("/certificateissuedStudentsData", certificateissuedStudentsData);
router.post("/certificateunissuedStudentsData", certificateunissuedStudentsData);
router.post("/pandingfeeStudentsData", pandingfeeStudentsData);
router.post("/clearfeeStudentsData", clearfeeStudentsData);
router.post("/particularStudentData", particularStudentData);
router.post("/totalEarningsDetails", totalEarningsDetails);
router.post("/referredStudentsData", referredStudentsData);
router.post("/getAllReferrers", getAllReferrers);
router.post("/updateReferrerPayment", updateReferrerPayment);
router.post("/getReferrerStudents/:id", getReferrerStudents);

module.exports = router;