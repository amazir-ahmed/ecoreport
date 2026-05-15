const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// /api/categories
router.route("/").get(getAllCategories).post(createCategory);

// /api/categories/:id
router.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

module.exports = router;
