const express = require("express");
const router = express.Router();


const {
admin_dashboardGet
} = require("../../controllers/refferel/refferelDashboard");

const refferl_auth = require("../../../middleware/refferl_auth");
router.get("/referrer_admin_dashboardGet", refferl_auth, admin_dashboardGet);


module.exports = router;