const express = require("express");
const router = express.Router();


const {
student_login,student_logout
} = require("../controllers/studentValidation");
const user_auth = require("../../middleware/student_auth");

router.post("/student_login", student_login);
router.post("/student_logout",user_auth, student_logout);


module.exports = router;