const express = require("express");
const router = express.Router();

const multer_photo = require("../../middleware/multer");

const {
    certificateData
} = require("../controllers/certificate");

const user_auth = require("../../middleware/student_auth");

router.post(
    "/certificateData",
    user_auth,
    certificateData
);

module.exports = router;