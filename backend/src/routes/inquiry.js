const express = require("express");
const router = express.Router();
const { addInquiry, getAllInquiries, markInquiryRead } = require("../controllers/inquiry");
const user_auth = require("../../middleware/user_auth");

router.post("/addInquiry", addInquiry);
router.get("/getAllInquiries", user_auth, getAllInquiries);
router.patch("/markInquiryRead/:id", user_auth, markInquiryRead);

module.exports = router;
