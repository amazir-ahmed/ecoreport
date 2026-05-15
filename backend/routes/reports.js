const express = require("express");
const router = express.Router();
const {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

// /api/reports
router.route("/").get(getAllReports).post(createReport);

// /api/reports/:id
router.route("/:id").get(getReportById).put(updateReport).delete(deleteReport);

module.exports = router;
