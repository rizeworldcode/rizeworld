const express = require("express");
const router = express.Router();

const {
    add_teacher,allTeachers
} = require("../controllers/addtechers");

router.post("/add_teacher", add_teacher);
router.get("/allTeachers", allTeachers);

module.exports = router;
