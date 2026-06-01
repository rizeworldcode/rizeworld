const express = require("express");
const router = express.Router();

const multer_photo = require("../../middleware/multer");

const {
    add_student, certificate_view, updateStudentdetails
} = require("../controllers/addStudent");

router.post(
    "/add_student",
    add_student
);
router.get(
    "/certificate_view/:student_ID", certificate_view
);

router.post(
    "/updateStudentdetails/:student_iD",
    multer_photo.fields([
        { name: "certificate_photo", maxCount: 1 }
    ]),
    updateStudentdetails
);

module.exports = router;