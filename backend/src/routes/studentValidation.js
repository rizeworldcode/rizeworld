const express = require("express");
const router = express.Router();


const {
student_login
} = require("../controllers/studentValidation");

router.post("/student_login", student_login);


module.exports = router;