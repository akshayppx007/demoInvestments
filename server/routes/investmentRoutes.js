const express = require("express");
const { createInvestment, withdrawInterest, getAllInvestments, getUserInvestment } = require("../controllers/investmentController");
const { isAuthenticatedUser, veryfyAdmin } = require("../middlewares/auth");
const router = express.Router();


router.route("/invest").post(isAuthenticatedUser, createInvestment);
router.route("/withdraw/:id/interest").put(isAuthenticatedUser, withdrawInterest);
router.route("/investment").get(isAuthenticatedUser, getUserInvestment);


// admin routes
router.route("/admin/investments").get(isAuthenticatedUser, veryfyAdmin, getAllInvestments);


module.exports = router;