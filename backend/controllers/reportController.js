const Report = require("../models/Report");

// @desc    Get all reports
// @route   GET /api/reports
const getAllReports = async (req, res) => {
  try {
    const { status, category, severity } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (severity) filter.severity = severity;

    const reports = await Report.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single report by ID
// @route   GET /api/reports/:id
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new report
// @route   POST /api/reports
const createReport = async (req, res) => {
  try {
    const { title, description, category, location, severity, reportedBy, imageUrl } =
      req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, category, and location",
      });
    }

    const report = await Report.create({
      title,
      description,
      category,
      location,
      severity,
      reportedBy,
      imageUrl,
    });

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a report
// @route   PUT /api/reports/:id
const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a report
// @route   DELETE /api/reports/:id
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
